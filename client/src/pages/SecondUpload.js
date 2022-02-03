import React from "react";
import { BsFillCloudUploadFill } from "react-icons/bs";
import { Upload, message } from "antd";
import "antd/dist/antd.css";

const FirstUpload = () => {
  const { Dragger } = Upload;

  const props = {
    name: "file",
    multiple: false,
    action: "http://localhost:3000/",
    listType: "picture",
    style: { padding: 50, fontFamily: "'Share Tech Mono', monospace" },
    onChange(info) {
      const { status } = info.file;
      if (status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (status === "done") {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };

  return (
    <body className="profile-body">
      <div className="upload-container">
        <div className="container-header">
          <h1>Upload Image Reference</h1>
        </div>
        <div className="form-container">
          <div className="drop-box-container">
            <Dragger {...props}>
              <BsFillCloudUploadFill className="react-icons" />
              <p className="ant-upload-text">
                Click or drag file to this area to upload
              </p>
            </Dragger>
          </div>
          <div className="reference-detail-container">
            <form className="reference-form">
              <div className="first-last-container">
                <div>
                  <input
                    type="text"
                    name="first name"
                    placeholder="first name"
                  />
                </div>
                <div>
                  <input type="text" name="last name" placeholder="last name" />
                </div>
              </div>
              <div>
                <input
                  type="date"
                  name="date of birth"
                  placeholder="MM/DD/YYYY"
                />
              </div>
              <button className="button">Next</button>
            </form>
          </div>
        </div>
      </div>
    </body>
  );
};

export default FirstUpload;
