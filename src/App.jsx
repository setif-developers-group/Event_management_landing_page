import { useState } from 'react'
import './App.css'
import Home from './pages/Home';
import Confirmation from './pages/Confirmation';
import Register from './pages/Register';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ChatBot from './components/Chatbot';
function App() {

  return (
    <>
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/email-confirmation/*" element={<Confirmation />} />
        <Route path="*" element={<Home />} />
      </Routes>
      <Footer />
      <ChatBot />
    </BrowserRouter>

    </>
  )
}

export default App
