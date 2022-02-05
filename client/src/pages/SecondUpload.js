import React from "react";
import { useState } from "react";
import { BsFillCloudUploadFill } from "react-icons/bs";
import { Upload, message } from "antd";
import "antd/dist/antd.css";
import { Link } from "react-router-dom";
// import { useReferenceImage, useReferenceImageUpdate } from "../utils/ImageContext";


const SecondUpload = () => {
  // const { Dragger } = Upload;
  // const props = {
  //   name: "file",
  //   multiple: false,
  //   listType: "picture",
  //   action: '/upload.do',
  //   style: { padding: 50, fontFamily: "'Share Tech Mono', monospace" },
  //   onChange(info) {
  //     const { status } = info.file;
  //     if (status !== "uploading") {
  //       console.log(info.file, info.fileList);
  //       console.log(info);
  //     }
  //     if (status === "done") {
  //       message.success(`${info.file.name} file uploaded successfully.`);
  //     } else if (status === "error") {
  //       message.error(`${info.file.name} file upload failed.`);
  //     }
  //   },
  //   onChange(info) {
  //     console.log("Dropped files", info);
  //   },
  // };

  // const [searchImage, setSearchImage] = useState([]);

  const imageUpload = document.getElementById('imageUpload')

  const props = {
    name: "file",
    multiple: false,
    onChange() {
      setSearchImage(imageUpload)
    }
  }

  return (
    <body className="profile-body">
      <div className="upload-container">
        <div className="container-header">
          <h1>Upload Search Image</h1>
        </div>
        <div className="form-container">
          <div className="drop-box-container">
            {/* <Dragger {...props}>
              <BsFillCloudUploadFill className="react-icons" />
              <p className="ant-upload-text">
                Click or drag file to this area to upload
              </p>
            </Dragger> */}
            <input type='file' id='imageUpload' {...props} ></input>
          </div>
          <div className="reference-detail-container">
            <form className="reference-form">
              <Link className="link" to="/compare" searchImage={searchImage} >
              <button className="button" >Next</button>
              </Link>
            </form>
          </div>
        </div>
      </div>
    </body>
  );
};

export default SecondUpload;
