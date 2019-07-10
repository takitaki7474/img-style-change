import chainer
import chainer.functions as F
import chainer.links as L
from chainer import training, datasets, iterators, optimizers
from chainer.training import extensions
import numpy as np
import os
import sys
import math
from numpy import random
from PIL import Image
import datetime

uses_device = -1			# GPU#0を使用
figure_rate = 0.02		# 画像形状の割合
figure_layers = ["conv3_3", "conv4_3"]	# 7層目、10層目を画像形状抽出用に使う
style_layers = ["conv1_2", "conv2_2", "conv3_3", "conv4_3"]	# 2層目〜10層目をスタイル抽出用に使う

# vgg_model = L.VGG16Layers()	# VGG16のモデル
vgg_model = L.VGG16Layers('vgg16-model.npz')	# ダウンロード出来ない時はこちら

# GPU使用時とCPU使用時でデータ形式が変わる
if uses_device >= 0:
	import cupy as cp
	import chainer.cuda
	# GPU用データ形式に変換
	vgg_model.to_gpu()
else:
	cp = np

# 生成する画像データを保持するLink
class Generate_L(chainer.Link):

	def __init__(self, img_origin, img_style):
		super(Generate_L, self).__init__()
		# 元画像から画像形状を取得
		vgg1 = vgg_model.extract([img_origin], layers=figure_layers, size=img_origin.size)
		self.origin_figure = [vgg1[i] for i in figure_layers]
		# スタイル画像からスタイル行列を取得
		vgg2 = vgg_model.extract([img_style], layers=style_layers, size=img_style.size)
		self.style_matrix = self.get_matrix(vgg2)

		# 画像データとなるパラメーターを作成
		w = chainer.initializers.Normal()
		with self.init_scope():
			self.W = chainer.Parameter(w, (1,3,img_origin.size[0],img_origin.size[1]))

	# スタイル行列を取得する関数
	def get_matrix(self, vgg):
		result = []
		for i in style_layers:
			ch = vgg[i].data.shape[1]
			wd = vgg[i].data.shape[2]
			y = F.reshape(vgg[i], (ch,wd**2))
			result.append(F.matmul(y, y, transb=True) / (ch*wd**2))
		return result

	def __call__(self):
		# 画像形状とスタイル行列を取得
		vgg = vgg_model(self.W, layers=style_layers)
		gen_figure = [vgg[i] for i in figure_layers]
		gen_matrix = self.get_matrix(vgg)
		# 損失を計算
		loss = 0
		# VGG16のスタイル抽出用レイヤーから、画像形状の差を取得
		for i in range(len(gen_figure)):
			loss += figure_rate * F.mean_squared_error(gen_figure[i], self.origin_figure[i])
		# VGG16のスタイル抽出用レイヤーから、スタイル行列の差を取得
		for i in range(len(gen_matrix)):
			loss += F.mean_squared_error(gen_matrix[i], self.style_matrix[i])
		return loss

# カスタムUpdaterのクラス
class ANAASUpdater(training.StandardUpdater):

	def __init__(self, optimizer, device):
		super(ANAASUpdater, self).__init__(
			None,
			optimizer,
			device=device
		)

	# イテレーターがNoneなのでエラーが出ないようにオーバライドする
	@property
	def epoch(self):
		return 0

	@property
	def epoch_detail(self):
		return 0.0

	@property
	def previous_epoch_detail(self):
		return 0.0

	@property
	def is_new_epoch(self):
		return False

	def finalize(self):
		pass

	def update_core(self):
		# Optimizerを取得
		optimizer = self.get_optimizer('main')
		# イテレーターからのデータ無しでupdateするだけ
		optimizer.update(optimizer.target)

# 入力ファイル
"""
original_file = 'original.png'
if len(sys.argv) >= 2:
	original_file = str(sys.argv[1])
style_file = 'style.png'
if len(sys.argv) >= 3:
	style_file = str(sys.argv[2])
# 出力ファイル
output_file = 'result.png'
if len(sys.argv) >= 4:
	output_file = str(sys.argv[3])
"""

def style_change(original_file, style_file):
	# 入力画像を開く
	original_img = Image.open(original_file).convert('RGB')
	# スタイル画像を開く
	style_img = Image.open(style_file).convert('RGB').resize(original_img.size)

	dt_now = datetime.datetime.now().strftime('%m%d%H%M%S')

	output_file = os.path.join("./src/changed_images","changed_img_" + dt_now + ".png")

	# モデルの作成
	model = Generate_L(original_img, style_img)

	# Optimizerの作成
	optimizer = optimizers.Adam(alpha=5.0, beta1=0.9)
	optimizer.setup(model)

	# デバイスを選択してTrainerを作成する
	updater = ANAASUpdater(optimizer, device=uses_device)
	trainer = training.Trainer(updater, (5000, 'iteration'), out="result")
	# ログを出力
	trainer.extend(extensions.LogReport())
	# 学習の進展を表示するようにする
	trainer.extend(extensions.ProgressBar(update_interval=1))

	# 機械学習を実行する
	trainer.run()

	# 学習結果を保存する
	data = np.zeros((original_img.size[0], original_img.size[1], 3), dtype=np.uint8)
	dst = model.W.data[0]  # BGRの画素データ
	if uses_device >= 0:
		dst = chainer.cuda.to_cpu(dst)
	data[:,:,0] = (dst[2] + 103.939).clip(0,255)
	data[:,:,1] = (dst[1] + 116.779).clip(0,255)
	data[:,:,2] = (dst[0] + 123.68).clip(0,255)
	himg = Image.fromarray(data, 'RGB')
	himg.save(output_file)

	return output_file
