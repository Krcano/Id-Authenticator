import React from "react";
import { useEffect, useRef, useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_SEARCH_INQUIRY } from "../utils/mutations";
import * as faceapi from "face-api.js";
// import img from "../img/download.jpg";
// import img2 from "../img/download.2.jpg";
import mcLovin from '../img/McLovin.jpg'
import supperBad from '../img/superbad.jpg'

const Compare = () => {
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
// ---------------------------------------------------------------

  const [referenceImage, setReferenceImage] = useState("");
  const [searchImage, setSearchImage] = useState("");
  // const imgInput1 = useRef();
  // const imgInput2 = useRef();

  const onChange = (e) => {
    setReferenceImage(e.target.files[0]);
  };

  const onChange2 = (e) => {
    setSearchImage(e.target.files[0]);
  };

  const imgRef = useRef();
  const imgRef2 = useRef();

  const start = async () => {
    const label = "McLovin";
    const descriptions = [];
    const referenceDetections = await faceapi
      .detectSingleFace(imgRef2.current)
      .withFaceLandmarks()
      .withFaceDescriptor();
    descriptions.push(referenceDetections.descriptor);
    const labeledFaceDescriptors = new faceapi.LabeledFaceDescriptors(
      label,
      descriptions
    );
    const faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors, 0.6);

    // const image = await faceapi.bufferToImage(imgRef.current)
    const canvas = faceapi.createCanvasFromMedia(imgRef.current);
    document.getElementById("canvas").appendChild(canvas);
    const displaySize = {
      width: imgRef.current.width,
      height: imgRef.current.height,
    };
    faceapi.matchDimensions(canvas, displaySize);
    const detections = await faceapi
      .detectAllFaces(imgRef.current)
      .withFaceLandmarks()
      .withFaceDescriptors();
    const resizeDetections = faceapi.resizeResults(detections, displaySize);
    const results = resizeDetections.map((d) =>
      faceMatcher.findBestMatch(d.descriptor)
    );
    results.forEach((result, i) => {
      const box = resizeDetections[i].detection.box;
      const drawBox = new faceapi.draw.DrawBox(box, {
        label: result.toString(),
      });
      drawBox.draw(canvas);
    });
  };

  useEffect(() => {
    const loadModels = () => {
      Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri("/models"),
        faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
        faceapi.nets.faceRecognitionNet.loadFromUri("/models"),
        faceapi.nets.ssdMobilenetv1.loadFromUri("/models"),
      ])
        .then(start)
        .catch((e) => console.log(e));
      console.log("its done");
    };

    imgRef.current && loadModels();
    // imgRef2.current && loadModels();
  }, []);

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
            </Dragger> ref={imgInput1} ref={imgInput2} */}
            <input type="file" id="imageUpload" onChange={onChange}></input>
            <input type="file" id="imageUpload2" onChange={onChange2}></input>
          </div>
          <div className="reference-detail-container">
            {/* <form className="reference-form">
              <button className="button" >Next</button>
            </form> */}
            <form className="reference-form" onSubmit={handleFormSubmit}>
              <div className="first-last-container">
                <div>
                  <input  type="text"
                    name="first name"
                    placeholder="firstName"
                    onChange={handleInputChange}>
                 
                    </input>
                </div>
                <div>
                  <input  type="text" name="lastName" placeholder="last name" onChange={handleInputChange}> </input>
                </div>
              </div>
              <div>
                <input type="date"
                  name="dateOfBirth"
                  placeholder="MM/DD/YYYY"
                  onChange={handleInputChange}>
                  
                  </input>
              </div>
              <button className="button">Start</button>
            </form>
          </div>
        </div>
      </div>

      <div className="flex-container">
        <div className="container-header">
          <h1>Compare</h1>
        </div>
        <div className="form-container">
          <div className="compare-container">
            <div className="reference-frame">
              <img ref={imgRef2} id="ref2" src={mcLovin} />
            </div>
            <div className="search-frame" id="canvas">
              <img ref={imgRef} id="ref1" src={supperBad} />
            </div>
          </div>
          <div className="results-container">
            <div className="accuracy-container">
              <h2>Accurate</h2>
            </div>
            <div className="pass-failed">
              <p>
                <strong>FOUND WOLDO</strong>
              </p>
            </div>
            <div>
              <button className="button">New Search</button>
            </div>
          </div>
        </div>
      </div>
    </body>
  );
};

export default Compare;
