
import WorkshopCard from './WorkshopCard'
import { useState, useEffect } from 'react'
import { SERVER_URL } from '../apis';
const fetchWorkshops = async (setWorkshops) => {
    try {
        const response = await fetch(`${SERVER_URL}/api/workshops/all/`);
        if (response.ok) {
            const data = await response.json();
            setWorkshops(data);
        } else {
            console.error('Failed to load workshops');
        }
    } catch (err) {
        
        console.error('Error:', err);
    }
};

function Workshops() {
    const [viewAll, setViewAll] = useState(false);
    const [workshops, setWorkshops] = useState([]);

    useEffect(() => {
        fetchWorkshops(setWorkshops);
    }, [workshops.length]);
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