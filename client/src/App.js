import React, { useState } from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Landing from "./pages/Landing";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Footer from "./components/Footer";
import Profile from "./components/Profile"

// import video from "./img/crowd-of-people-walking-on-nyc-sidewalk.mp4";
// import download from "./img/download.jpg";
import FirstUpload from "./pages/FirstUpload";
import SecondUpload from "./pages/SecondUpload";
import ThirdCompare from "./pages/ThirdCompare";

const httpLink = createHttpLink({
  uri: "/graphql",
});
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem("id_token");
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  // <label htmlFor ="file"> this can be anything this will upload them thoiugh so maybe that button </label>
  // <input onChange={(e) => setFile(e.target.files[0])} id = "file" style = {{display: "none"}}type = "file"/>
  // can use css to change the way it looks though
  // once all in will create a route
  // {image ? (<Face image = {image}/>) : (this was the main page or leace this out )}
  return (
    <ApolloProvider client={client}>
      <Router>
        <>
          {/* <div className="app">
          <img crossOrigin="annonymous" ref={imgRef} src={download}></img>
        </div> */}
          <Header />
          <Routes>
            <Route path="/" element={<Landing />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/signup" element={<SignUp />}></Route>
<<<<<<< HEAD
            <Route path="/profile" element={<FirstUpload />}></Route>
            <Route path="/profile2" element={<SecondUpload />}></Route>
=======
            <Route path="/firstUpload" element={<FirstUpload />}></Route>
>>>>>>> 113d98250910bb816848afb6237e32a308836490
            <Route path="/compare" element={<ThirdCompare />}></Route>
            <Route path="/profile" element={<Profile/>}></Route>
          </Routes>
          <Footer />
        </>
      </Router>
    </ApolloProvider>
  );
}

export default App;
