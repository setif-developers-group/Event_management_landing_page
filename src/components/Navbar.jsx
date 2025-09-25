import { useState } from "react";
import { Menu, X } from "lucide-react";
import logo_w from "../assets/logo/logo_w.png";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return(
        <nav className="flex justify-between items-start py-4 absolute top-0 left-0 right-0 px-5 md:px-10 lg:px-60 z-50">
            <img src={logo_w} alt="SDG Skills Lab logo"  className= "h-10 md:h-12"/>
            <div className="flex align-top">
                
                {/* Desktop navigation */}
                <ul className="hidden md:flex md:justify-around w-full space-x-3 lg:space-x-10 text-white">
                    <li><Link to="/#hero">Home</Link></li>
                    <li><Link to="/#workshops">Workshops</Link></li>
                    <li><Link to="/#about">About</Link></li>
                    <li><Link to="/#partners">Partners</Link></li>
                    <li><Link to="/register" className="bg-brand text-white py-2 px-4 rounded-md">Register</Link></li>
                </ul>
                <div className="flex items-center flex-col justify-start algign-start">
                {/* Mobile hamburger button */}
                <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <X className="text-white"/> : <Menu className="text-white" />}
                </button>
                {/* Mobile menu (hidden by default) */}

                {isOpen && <ul className="md:hidden flex flex-col md:justify-around w-full text-white">
                    <li><Link to="/#hero">Home</Link></li>
                    <li><Link to="/#workshops">Workshops</Link></li>
                    <li><Link to="/#about">About</Link></li>
                    <li><Link to="/#partners">Partners</Link></li>
                    <li><Link to="/register">Register</Link></li>
                </ul>}
                </div>
            </div>
        </nav>
    );
}


export default Navbar