from flask import Flask, render_template, request, jsonify
from werkzeug import secure_filename
import cv2
import os
import io
import numpy as np
import style_change

app = Flask(__name__, static_folder="./src",template_folder="./templates")

app.config["DEBUG"] = True

UPLOAD_FOLDER = './src/save_images'

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/post", methods=["GET","POST"])
def post():
    if request.method == "POST":
        if not request.files["file-submit"].filename == "":
            dic = {}
            img_file = request.files["file-submit"]
            f = img_file.stream.read()
            bin_data = io.BytesIO(f)
            file_bytes = np.asarray(bytearray(bin_data.read()), dtype=np.uint8)
            img = cv2.imdecode(file_bytes, cv2.IMREAD_COLOR)

            raw_img_url = os.path.join(UPLOAD_FOLDER, "raw_" + secure_filename(img_file.filename))
            cv2.imwrite(raw_img_url, img)
            dic["img_url"] = raw_img_url
        else:
            pass
    else:
        pass

    return jsonify(dic)


@app.route("/change_style", methods=["GET"])
def change_style():
    output_dic = {}

    style_url = request.args.get("style_url")
    uploaded_url = request.args.get("uploaded_url")

    style_url_list = style_url.split("/")
    style_url_list[0] = "."
    style_url = "/".join(style_url_list)

    uploaded_url_list = uploaded_url.split("/")
    uploaded_url_list[0] = "."
    uploaded_url = "/".join(uploaded_url_list)

    changed_file_path = style_change.style_change(uploaded_url, style_url)
    output_dic["changed_file_path"] = changed_file_path

    return jsonify(output_dic)

if __name__=="__main__":
    app.run()
