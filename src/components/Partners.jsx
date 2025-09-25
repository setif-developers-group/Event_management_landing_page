const partners = [
  {
    name: "University UFAS Setif 1",
    website: "https://www.univ-setif.dz/",
    logo: null
  },
  {
    name: "Faculty of sciences UFAS Setif 1",
    website: "https://fsciences.univ-setif.dz/",
    logo: null
  },
  {
    name: "Redjem Studio",
    website: "https://www.redjemstudio.com/",
    logo: null
  },
  {
    name: "GDG Setif",
    website: "https://gdg.community.dev/gdg-setif/",
    logo: null
  },
  {
    name: "Nesda",
    website: "https://nesda.algeriadisrupt.com/",
    logo: null
  }
];




function Partners() {
    return (
        <div id="partners " className="bg-gray-100  py-10 px-5 md:px-10 lg:px-60">
            <h2 className="text-3xl font-bold mb-6 mt-10 text-brand-dark">Our Partners:</h2>
            <div className="overflow-x-scroll scrollbar-hide py-5 flex space-x-16 md:space-x-52 mb-8">
                {partners.map((partner, index) => (
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