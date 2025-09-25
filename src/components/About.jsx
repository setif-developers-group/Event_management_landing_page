import '../css/about.css'
import ssc from '../assets/imgs/ssc.jfif'
function About() {
    return (
        <div className=" about px-5 md:px-10 lg:px-60 grid grid-cols-1 md:grid-cols-2 py-16  " id="about">
            <div className='flex flex-col align-middle justify-center'>
            <h1 className='text-3xl font-bold mb-6 mt-6 text-white'>About the Event:</h1>
            <p className='text-white'>The event, held at the Skills Center from 29 September to 22 November 2025 (daily from 13:00 to 17:00), is dedicated to empowering university students and all enthusiasts of IT and Entrepreneurship. With a strong focus on innovation, community building, and sustainable development goals, the event aims to provide valuable knowledge, develop practical skills for real-world challenges, and create meaningful opportunities for networking and collaboration.</p>
            </div>
            <div className="card-shadow">
            
            <div className="flex justify-end pr-3 ">
                {/* Shadow/background shape */}
                <div className="absolute top-14 right-0 w-96 h-64   md:h-96 bg-white bg-opacity-30 rounded-2xl"></div>
                
                {/* Main image */}
                <img src={ssc} 
                    className="relative rounded-2xl w-96  object-cover z-10 h-64  md:h-96 mt-11" 
                    alt="Office" />
                </div>
            </div>
        </div>
        
    )
}


export default About