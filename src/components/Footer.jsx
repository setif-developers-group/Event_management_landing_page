import sdg from "../assets/logo/sdg.png"
import { Facebook, Instagram, Linkedin } from "lucide-react";


function Footer() {
    return (
        <footer className="bg-brand-dark px-5 md:px-10 lg:px-60 py-10 grid grid-cols-1 md:grid-cols-2" >
            <div className="flex flex-col items-center md:items-start mb-6 md:mb-0">
                <div className="flex flex-row items-center mb-2 md:mb-0">
                    <img src={sdg} alt="SDG logo" className="h-12 mr-2" /> <h1 className="text-white text-2xl">Setif Developers Group</h1>
                </div>
                <div className="text-white pt-3 text-center md:text-left">
                    <p>SDG is a student scientific club at Sciences Faculty from University Farhat Abbas Setif 1 created in 2018, with 70 members across 6 departments, lead by Mihoubi Brahim. We focus on computer science education, IT challenges and Enterpreneurship stuff.</p>
                </div>
            </div>
            <div className="text-center">
                <h2 className="text-white text-xl mb-2">Contact Us:</h2>
                <p className="text-white">Email: algeria.data@gmail.com</p>
                <p className="text-white">Phone: +213670242636</p>
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