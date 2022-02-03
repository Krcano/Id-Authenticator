import { useEffect, useRef } from "react";
import * as faceapi from "face-api.js";

const facePost = (image) => {
  // const videoRef = useRef();
  const imgRef = useRef();
  const canvasRef = useRef();
  const hanldeImage = async () => {
    const detections = await faceapi
      .detectAllFaces(imgRef.current, new faceapi.TinyFaceDetectorOptions())
      //.detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions())
      .withFaceLandmarks()
      .withFaceExpressions();
    console.log(detections);

    canvasRef.current.innerHtml = faceapi.createCanvasFromMedia(imgRef.current);
    faceapi.matchDimensions(canvasRef.current, {
      width: 350,
      height: 350,
    });
    const resized = faceapi.resizeResults(detections, {
      width: 350,
      height: 350,
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
  }, []);

  return (
    <div>
      <img src={image.url} alt="" />
    </div>
  );
};

export default facePost;
