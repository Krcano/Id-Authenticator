import React from "react";
import { useEffect, useRef, useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_SEARCH_INQUIRY } from "../utils/mutations";
import * as faceapi from "face-api.js";
// import placeHolder from '../img/placeholder.jpg'
import woldo from '../img/woldo.gif'
import foundWoldo from '../img/woldo-found.jpg'

// ---------------------------------------------------------------
// -------------------Form Submit Code----------------------------
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
// ------------Setting Images to Display--------------------------
  const [referenceImage, setReferenceImage] = useState({ preview: woldo, data: '' });
  const [searchImage, setSearchImage] = useState({ preview: foundWoldo, data: '' });

  const onChange = (e) => {
    const img = {
      preview: URL.createObjectURL(e.target.files[0]),
      data: e.target.files[0]
    }
    setReferenceImage(img)
    console.log(referenceImage.data);
  }

  const onChange2 = (e) => {
    const img = {
      preview: URL.createObjectURL(e.target.files[0]),
      data: e.target.files[0]
    }
    setSearchImage(img)
    console.log(searchImage.data);
  }

// -----Function to Save Uploads on Backend (Not Working)---------
  // const sendImage = async (e) => {
  //   e.preventDefault();

  //   let imageData = new ImageData()

  //   imageData.append("avatar", referenceImage.data);

  //   console.log(imageData);

  //   fetch("http://localhost:3001/uploadFile", {
  //   method: "post",
  //   body: imageData,
  // })
  //   .then((res) => res.text())
  //   .then((resBody) => {
  //     console.log(resBody);
  //   });
  // };

// ---------------------------------------------------------------
// ------------Using Images to Run FaceAPI------------------------
  const imgRef = useRef();
  const imgRef2 = useRef();

  const start = async () => {
    const label = `${FormData.firstName} ${FormData.lastName}`;
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

    //  if (canvas) {
    //   document.getElementById("canvas").removeChild(canvas);
    // }   
    
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
        .then()
        .catch((e) => console.log(e));
      console.log("its done");
    };

    imgRef.current && loadModels();
    // imgRef2.current && loadModels();
  }, []);

// ---------------------------------------------------------------
// -------------------------JSX Code------------------------------
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
            <form action="/uploadFile" method="post" encType="multipart/form-data" >
              <input type="file" name="avatar" id="imageUpload" onChange={onChange}></input>
              <input type="file" name="avatar" id="imageUpload2" onChange={onChange2}></input>
              <button className="button" type="submit" >Submit</button>
            </form>
          </div>
          <div className="reference-detail-container">
            {/* <form className="reference-form">
              <button className="button" >Next</button>
            </form> */}
            <form className="reference-form" onSubmit={handleFormSubmit} >
              <div className="first-last-container">
                <div>
                  <input  type="text"
                    name="firstName"
                    placeholder="firstName"
                    onChange={handleInputChange}>
                  </input>
                </div>
                <div>
                  <input type="text" name="lastName" placeholder="last name" onChange={handleInputChange}></input>
                </div>
              </div>
              <div>
                <input type="date"
                  name="dateOfBirth"
                  placeholder="MM/DD/YYYY"
                  onChange={handleInputChange}>
                </input>
              </div>
              <button className="button" type="submit" onClick={start} >Start</button>
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
              <img ref={imgRef2} id="ref2" src={referenceImage.preview} />
            </div>
            <div className="search-frame" id="canvas">
              <img ref={imgRef} id="ref1" src={searchImage.preview} />
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
              <button className="button"  >New Search</button>
            </div>
          </div>
        </div>
      </div>
    </body>
  );
};

export default Compare;
