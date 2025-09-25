import sdg from "../assets/logo/sdg.png"
import { Facebook, Instagram, Linkedin } from "lucide-react";


function Footer() {
    return (
        <footer className="bg-brand-dark px-5 md:px-10 lg:px-60 py-10 grid grid-cols-1 md:grid-cols-2" >
            <div>
                <div className="flex flex-row items-center mb-4 md:mb-0">
                    <img src={sdg} alt="SDG logo" className="h-12 mr-2" /> <h1 className="text-white text-2xl">setif developer group</h1>
                </div>
                <div className="text-white pt-3">
                    <p>SDG is a student scientific and development group at the University of Setif with 63 members across 4 departments, led by Mihoubi Ibrahim. We focus on education, IT training, and cultural promotion.</p>
                </div>
            </div>
            <div className="text-center">
                <h2 className="text-white text-xl mb-2">Contact Us:</h2>
                <p className="text-white">Email: contact@sdg.com</p>
                <p className="text-white">Phone: +123 456 7890</p>
                <span className="flex justify-center mt-4">
                    <a href="https://www.facebook.com/SetifDevelopersGroup/" target="_blank" className="text-white mx-2"><Facebook /></a> |
                    <a href="https://www.instagram.com/setif_developers_group/" target="_blank" className="text-white mx-2"><Instagram /></a> |
                    <a href="https://www.linkedin.com/company/setif-developers-group-sdg/" target="_blank" className="text-white mx-2"><Linkedin /></a>
                </span>
            </div>
            
        </footer>
    );
}


export default Footer