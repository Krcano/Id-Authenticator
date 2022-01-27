import React from "react";
import { BrowserRouter as Router } from 'react-router-dom';
import Header from "./components/Header";
import Hero from "./components/Hero";

function App() {
  return (
    <Router>
      <div>
        <Header />
        <Hero />
      </div>
    </Router>
  );
}

export default App;
