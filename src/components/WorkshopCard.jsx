


function WorkshopCard({Workshop: workshop}) {
    return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200">

      <div className="bg-brand text-white px-4 py-2 w-full rounded text-center font-medium ">
        {workshop.title}
      </div>
      
    <div className="p-4">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-orange-500">📅</span>
        <span className="text-gray-700 text-sm">{workshop.date}</span>
      </div>
      

      <div className="flex items-center gap-2 mb-2">
        <span className="text-orange-500">⏰</span>
        <span className="text-gray-700 text-sm">{workshop.duration}</span>
      </div>
      

      <div className="flex items-start gap-2 mb-3">
        <span className="text-orange-500">🎤</span>
        <div className="text-gray-700 text-sm">
          {workshop.speakers.map((speaker, index) => (
            <div key={index}>{speaker.name}</div>
          ))}
        </div>
        </div>
      
      

      <div className="flex items-center gap-2">
        <span className="text-yellow-500">🤝</span>
        <span className="text-gray-700 text-sm">Partner: {workshop.partner ? workshop.partner.name : 'N/A'}</span>
      </div>
    </div>
    </div>
  );
};

export default WorkshopCard