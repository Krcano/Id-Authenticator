import React from "react";
// import {
//   ApolloClient,
//   InMemoryCache,
//   ApolloProvider,
//   createHttpLink,
// } from '@apollo/client';
// import { setContext } from '@apollo/client/link/context';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Landing from "./pages/Landing";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Footer from "./components/Footer";
import { useEffect, useRef } from "react";
import * as faceapi from "face-api.js";

function App() {
  const imgRef = useRef();
  const canvasRef = useRef();
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
  return (
    <Router>
      <>
        <Header />
        <Routes>
          <Route path="/" element={<Landing />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/signup" element={<SignUp />}></Route>
        </Routes>
        <Footer />
      </>
      <canvas ref={canvasRef} />
    </Router>
  );
}

export default App;
