import React from "react";
import { useEffect, useRef } from "react";
import * as faceapi from "face-api.js";
import img from "../img/download.jpg";
import img2 from "../img/download.2.jpg";
import mcLovin from "../img/McLovin.jpg";
import test from "../img/superbad.jpg";
import { FaceDetection, FaceMatch, resizeResults } from "face-api.js";
import FirstUpload from "./FirstUpload";
import { Link } from "react-router-dom";

const Compare = () => {
  // const videoRef = useRef();
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
<<<<<<< HEAD
      const box = resizeDetections[i].detection.box;
      const drawBox = new faceapi.draw.DrawBox(box, {
        label: result.toString(),
      });
      drawBox.draw(canvas);
    });
    console.log(detections);
    console.log(results);
  };
=======
      const box = resizeDetections[i].detection.box
      const drawBox = new faceapi.draw.DrawBox(box, { label: result.toString() })
      drawBox.draw(canvas)
    })
  }
>>>>>>> 113d98250910bb816848afb6237e32a308836490
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
          <h1>Compare</h1>
        </div>
        <div className="form-container">
          <div className="compare-container">
            <div className="reference-frame">
              <img ref={imgRef2} src={img} />
            </div>
            <div className="search-frame" id="canvas">
              <img ref={imgRef} src={img2} />
              {/* <canvas ref={canvasRef} className="canvas" /> */}
            </div>
          </div>
          <div className="results-container">
            <div className="accuracy-container">
              <h2>{FaceMatch._distance} Accurate</h2>
            </div>
            <div className="pass-failed">
              <p>
                <strong>NOT WOLDO</strong>
              </p>
            </div>
            <div>
              <button className="button">
                <Link className="" to="/profile">
                  New Upload
                </Link>
              </button>
            </div>
          </div>
        </div>
      </div>
    </body>
  );
};

export default Compare;
