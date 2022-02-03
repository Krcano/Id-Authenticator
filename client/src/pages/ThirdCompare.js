import React from "react";
import { useEffect, useRef } from "react";
import * as faceapi from "face-api.js";
import img from "../img/download.jpg";
import img2 from "../img/download.2.jpg";
const Compare = () => {
  // const videoRef = useRef();
  const imgRef = useRef();
  const imgRef2 = useRef();
  const canvasRef = useRef();
  const hanldeImage = async () => {
    const detections = await faceapi
      .detectAllFaces(imgRef.current, new faceapi.TinyFaceDetectorOptions())
      //.detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions())
      .withFaceLandmarks()
      .withFaceExpressions();
    console.log(detections);
    const detections2 = await faceapi.detectAllFaces(
      imgRef2.current,
      new faceapi.TinyFaceDetectorOptions()
    );
    console.log(detections2);

    canvasRef.current.innerHtml = faceapi.createCanvasFromMedia(imgRef.current);
    faceapi.matchDimensions(canvasRef.current, {
      width: 292,
      height: 173,
    });
    const resized = faceapi.resizeResults(detections, {
      width: 292,
      height: 173,
    });
    faceapi.draw.drawDetections(canvasRef.current, resized);
  };
  console.log("this");
  useEffect(() => {
    const loadModels = () => {
      Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri("/models"),
        faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
        faceapi.nets.faceRecognitionNet.loadFromUri("/models"),
        faceapi.nets.faceExpressionNet.loadFromUri("/models"),
      ])
        .then(hanldeImage)
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
          <h1>Compare</h1>
        </div>
        <div className="">
          <div className="imgRef">
            <img ref={imgRef} src={img} />
          </div>
          <div>
            <img ref={imgRef2} src={img2} />
          </div>
        </div>
      </div>
    </body>
  );
};

export default Compare;
