import React, { useState } from "react";
import { BsFillCloudUploadFill } from "react-icons/bs";
import { Upload, message } from "antd";
import "antd/dist/antd.css";
import { useMutation } from "@apollo/client";
import { ADD_SEARCH_INQUIRY } from "../utils/mutations";
import { Link } from "react-router-dom";


const FirstUpload = () => {
  const [FormData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    image: "",
  });
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...FormData, [name]: value });
  };
  const [addSearchInquiry, { error }] = useMutation(ADD_SEARCH_INQUIRY);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const mutationResponse = await addSearchInquiry({
        variables: {
          firstName: FormData.firstName,
          lastName: FormData.lastName,
          dateOfBirth: FormData.dateOfBirth,
          image: FormData.image,
        },
      });
      console.log(mutationResponse);
    } catch (err) {
      console.error(err);
    }
    setFormData({
      firstName: "",
      lastName: "",
      dateOfBirth: "",
      image: "",
    });
  };

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
            <Dragger {...props} >
              <BsFillCloudUploadFill className="react-icons" />
              <p className="ant-upload-text">
                Click or drag file to this area to upload
              </p>
            </Dragger>
          </div>
          <div className="reference-detail-container">
            <form className="reference-form" onSubmit={handleFormSubmit}>
              <div className="first-last-container">
                <div>
                  <input
                    type="text"
                    name="firstName"
                    placeholder="first name"
                    onChange={handleInputChange}
                  ></input>
                </div>
                <div>
                  <input
                    onChange={handleInputChange}
                    type="text"
                    name="lastName"
                    placeholder="last name"
                  ></input>
                </div>
              </div>
              <div>
                <input
                  type="date"
                  name="dateOfBirth"
                  placeholder="MM/DD/YYYY"
                  onChange={handleInputChange}
                ></input>
              </div>
              {error && <div className="">{error.message}</div>}
              <Link to="/compare"><button className="button" type="submit">
                Next
              </button></Link>
            </form>
          </div>
        </div>
      </div>
    </body>
  );
};

export default FirstUpload;
