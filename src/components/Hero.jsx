import '../css/hero.css'
import {Link } from "react-router-dom";
import robot_hand from '../assets/bg_imgs/robot_hand.png'
function Hero() {
    return (
        <div className="hero py-52 text-white px-5 md:px-10 lg:px-60 grid grid-cols-1 md:grid-cols-2" id="hero">
            
            <div className='z-10'>
            <p>"Starts in: 05 Days 12:34:56"</p>
            <h2 className='text-5xl my-6'>Learn. Build. Impact.</h2>
            <p>Empowering students and innovators in IT & Entrepreneurship.Join us to gain knowledge, build skills, and connect with a 
            thriving community.</p>
            <Link to="/register">
            <button className="bg-brand text-white py-2 px-4 rounded-md mt-7">Register Now</button>
            </Link>
            </div>
            <div>
                <img src={robot_hand} alt="" srcset="" className='hidden md:block absolute w-2/3  top-0 right-0'/>
            </div>
        </div>
    )
}


export default Hero