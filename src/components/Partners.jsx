import { useState, useEffect } from 'react'
import { SERVER_URL } from '../apis';
const fetchPartners = async (setPartners) => {
    try {
        const response = await fetch(`${SERVER_URL}/api/partners/`);
        if (response.ok) {
            const data = await response.json();
            setPartners(data);
        } else {
            console.error('Failed to load partners');
        }
    } catch (err) {
        
        console.error('Error:', err);
    }
};

function Partners() {
    const [partners, setPartners] = useState([]);

    useEffect(() => {
        fetchPartners(setPartners);
    }, []);

    return (
        <div id="partners" className="bg-gray-100  py-10 px-5 md:px-10 lg:px-60">
            <h2 className="text-3xl font-bold mb-6 mt-10 text-brand-dark">Our Partners:</h2>
            <div className="overflow-x-scroll scrollbar-hide py-5 flex space-x-16 md:space-x-52 mb-8">
                {partners.map((partner, index) => (
                  console.log(partner),
                    <div key={index} className="flex flex-col items-center ">
                        <img src={partner.logo} alt={partner.name} className="w-24 h-24 mb-2" />
                        <a href={partner.website} target="_blank">{partner.name}</a>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Partners