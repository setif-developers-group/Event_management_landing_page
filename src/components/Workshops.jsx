
import WorkshopCard from './WorkshopCard'
import { useState } from 'react'

const workshops = [
  {
    title: "Artificial Intelligence",
    date: "29 Sept 2025",
    duration: "1 Day",
    speakers: ["Berrimi Mohammed", "Skander Hamdi"],
    partner: "SDG Member"
  },
  {
    title: "C++ and How to Think as a CS Student",
    date: "1 Oct 2025",
    duration: "4 Days",
    speakers: ["Chenani Akram", "Taki Torki"],
    partner: "SDG Member"
  },
  {
    title: "Embedded Systems",
    date: "6 Oct 2025",
    duration: "4 Days",
    speakers: ["Taki Torki"],
    partner: null
  },
  {
    title: "DevFest",
    date: "11 Oct 2025",
    duration: "1 Day",
    speakers: ["GDG Speakers"],
    partner: "GDG Setif"
  },
  {
    title: "Design Thinking",
    date: "12 Oct 2025",
    duration: "1 Day",
    speakers: ["Safie Zeqtouf"],
    partner: "SDG Member"
  },
  {
    title: "UI/UX Basics",
    date: "13 Oct 2025",
    duration: "2 Days",
    speakers: ["Ghaithe Sofian"],
    partner: "IntellectSoft dz"
  },
  {
    title: "Web Basics + Django",
    date: "15 Oct 2025",
    duration: "6 Days",
    speakers: ["IntellectSoft dz Speakers"],
    partner: "IntellectSoft dz"
  },
  {
    title: "MERN Stack Development",
    date: "23 Oct 2025",
    duration: "6 Days",
    speakers: ["Moataz Chaaban"],
    partner: null
  },
  {
    title: "Mobile Development (Flutter)",
    date: "30 Oct 2025",
    duration: "6 Days",
    speakers: ["Malek Lamara", "Brahim Mihoubi"],
    partner: "SDG Member"
  },
  {
    title: "Nesda Workshop",
    date: "6 Nov 2025",
    duration: "3 Days",
    speakers: ["Nesda Speakers"],
    partner: "Nesda"
  },
  {
    title: "Closing Event",
    date: "9 Nov 2025",
    duration: "3 Days",
    speakers: ["Matoukki Mohammed"],
    partner: null
  },
  {
    title: "Networking",
    date: "13 Nov 2025",
    duration: "3 Days",
    speakers: ["Yacine Seha"],
    partner: "Algérie Telecom"
  },
  {
    title: "Cyber Security",
    date: "16 Nov 2025",
    duration: "3 Days",
    speakers: ["Taki Torki"],
    partner: null
  },
  {
    title: "Project Management",
    date: "20 Nov 2025",
    duration: "1 Day",
    speakers: ["IntellectSoft dz Speakers"],
    partner: null
  },
  {
    title: "E-commerce",
    date: "22 Nov 2025",
    duration: "3 Days",
    speakers: ["Lamiri Yaakoub"],
    partner: "SDG Member"
  }
];


function Workshops() {
    const [viewAll, setViewAll] = useState(false);
    return (
        <div className='px-5 md:px-10 lg:px-60' id="workshops">
            <h1 className='text-3xl font-bold mb-6 mt-10 text-brand-dark'>Upcoming Workshops & Sessions:</h1>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                {workshops.slice(0, viewAll ? workshops.length : 6).map((workshop, index) => (
                    <WorkshopCard key={index} Workshop={workshop} />
                ))}
            </div>
            <div className='flex justify-center mt-4'>
            {!viewAll && workshops.length > 6 && (
                <button className="bg-brand text-white py-2 px-4 mb-5 rounded-md" onClick={() => setViewAll(true)}>View All</button>
            )}
            {viewAll && (
                <button className="bg-brand text-white py-2 px-4 mb-5 rounded-md" onClick={() => setViewAll(false)}>View Less</button>
            )}
            </div>
        </div>
    )
    
}


export default Workshops