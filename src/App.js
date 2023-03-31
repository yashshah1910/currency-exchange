import React from "react";
import { Routes, Route } from "react-router-dom";
import Converter from "./components/Converter";
import Exchange from "./components/Exchange";
import Navbar from "./components/Navbar";
import ErrorPage from "./ErrorPage";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Converter />} />
        <Route path="exchange" element={<Exchange />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </>
  );
}

export default App;
