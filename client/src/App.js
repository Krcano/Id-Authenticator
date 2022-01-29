import React from "react";
// import {
//   ApolloClient,
//   InMemoryCache,
//   ApolloProvider,
//   createHttpLink,
// } from '@apollo/client';
// import { setContext } from '@apollo/client/link/context';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from "./components/Header";
import Login from "./components/Login";
import Hero from "./components/Hero";
import SignUp from "./components/SignUp";

function App() {
  return (
    <Router>
      <div>
        <Header />
        <Hero />
        <Routes>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/signup" element={<SignUp/>}></Route>
      </Routes>
      </div>
    </Router>
  );
}

export default App;
