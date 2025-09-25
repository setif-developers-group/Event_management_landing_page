import { useState } from 'react'
import './App.css'
import Home from './pages/Home';
import Register from './pages/Register';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Navbar from './components/Navbar';
import Footer from './components/Footer';
function App() {

  return (
    <>
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<Home />} />
      </Routes>
      <Footer />
    </BrowserRouter>

    </>
  )
}

export default App
