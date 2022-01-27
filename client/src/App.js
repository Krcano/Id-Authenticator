import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from "./components/Header";
import Login from "./components/Login";
import Hero from "./components/Hero";

function App() {
  return (
    <Router>
      <div>
        <Header />
        <Hero />
        <Routes>
        <Route path="/login" element={<Login/>}></Route>
      </Routes>
      </div>
    </Router>
  );
}

export default App;
