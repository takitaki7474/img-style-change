from flask import Flask, render_template, request
from werkzeug import secure_filename
import cv2
import os
import io
import numpy as np

app = Flask(__name__)

app.config["DEBUG"] = True

UPLOAD_FOLDER = './static/images'

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/post", methods=["POST"])
def post():
    if request.method == "POST":
        if not request.files["file-submit"].filename == "":
            img_file = request.files["file-submit"]
            f = img_file.stream.read()
            bin_data = io.BytesIO(f)
            file_bytes = np.asarray(bytearray(bin_data.read()), dtype=np.uint8)
            img = cv2.imdecode(file_bytes, cv2.IMREAD_COLOR)

            raw_img_url = os.path.join(UPLOAD_FOLDER, "raw_" + secure_filename(img_file.filename))
            cv2.imwrite(raw_img_url, img)
        else:
            pass
    else:
        pass

    return render_template("img_changed.html", sample_img=raw_img_url)



if __name__=="__main__":
    app.run()
