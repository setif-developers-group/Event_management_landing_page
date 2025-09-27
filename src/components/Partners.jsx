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
        // Asynchronously fetch and set the partners data.
        fetchPartners(setPartners);
    }, []);

    return (
        <div id="partners" className="bg-gray-100 py-16 px-5 md:px-10 lg:px-20">
            <h2 className="text-4xl font-bold mb-12 text-center text-brand-dark">Our Partners</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 justify-items-center">
                {partners.map((partner) => (
                    <div key={partner.name} className="group flex flex-col items-center transform transition-transform hover:scale-105 bg-gray-200 rounded-xl shadow-lg p-8 w-full max-w-sm">
                        <div className="h-48 flex items-center justify-center mb-6">
                            <img 
                                src={partner.logo} 
                                alt={partner.name} 
                                className="max-h-full w-auto object-contain"
                            />
                        </div>
                        <a 
                            href={partner.website} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-lg font-semibold text-brand-dark hover:text-brand-primary transition-colors"
                        >
                            {partner.name}
                        </a>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Partners