from flask import Flask, render_template, request, jsonify
from werkzeug import secure_filename
import cv2
import os
import io
import numpy as np
import time

app = Flask(__name__, static_folder="./src",template_folder="./templates")

app.config["DEBUG"] = True

#UPLOAD_FOLDER = './src/images'
UPLOAD_FOLDER = './src/save_images'

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/post", methods=["GET","POST"])
def post():
    if request.method == "POST":
        print("cccc")
        if not request.files["file-submit"].filename == "":
            dic = {}
            img_file = request.files["file-submit"]
            f = img_file.stream.read()
            bin_data = io.BytesIO(f)
            file_bytes = np.asarray(bytearray(bin_data.read()), dtype=np.uint8)
            img = cv2.imdecode(file_bytes, cv2.IMREAD_COLOR)

            raw_img_url = os.path.join(UPLOAD_FOLDER, "raw_" + secure_filename(img_file.filename))
            cv2.imwrite(raw_img_url, img)
            time.sleep(5)
            dic["img_url"] = raw_img_url
            print(raw_img_url)
        else:
            print("aaaa")
    else:
        print("bbbb")

    #return render_template("img_changed.html",sample_img=raw_img_url)
    return jsonify(dic)


if __name__=="__main__":
    app.run()
