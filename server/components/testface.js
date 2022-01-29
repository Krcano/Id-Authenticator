import { useEffect, useRef } from "react";
import * as faceapi from "face-api.js";
// import { Router } from "express";

function testface() {
  const imgRef = useRef();
  const cancasRef = useRef();
  const hanldeImage = (async) => {
    const detect = await faceapi
      .detectAllFaces(imagRef.current, new faceapi.TinyFaceDetectorOptions())
      .withFaceLandmarks()
      .withFaceExpressions();

    console.log(detect);
  };

  useEffect(() => {
    const loadModels = () => {
      Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri("/models"),
        faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
        faceapi.nets.faceRecognitionNet.loadFromUri("/models"),
        faceapi.nets.faceExpressionNet.loadFromUri("/models"),
      ]).then(hanldeImage);
      console.log("its done");
    };

    imgRef.current && loadModels;
  });
}
export default testface;
