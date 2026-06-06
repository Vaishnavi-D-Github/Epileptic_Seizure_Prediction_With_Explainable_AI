import { ParticleBackground } from "@/components/ParticleBackground";

const Hospitals = () => {
 
  const hospitals = [
    {
      name: "Apollo Hospitals",
      location: "Chennai, India",
      rating: "⭐️⭐️⭐️⭐️⭐️",
      desc: "Renowned for its neurology department and EEG-based epilepsy care.",
      mapsUrl: "https://www.google.com/maps/search/?api=1&query=Apollo+Hospitals+Chennai+India",
    },
    {
      name: "AIIMS",
      location: "New Delhi, India",
      rating: "⭐️⭐️⭐️⭐️",
      desc: "Leading government institute specializing in advanced neuro research.",
      mapsUrl: "https://www.google.com/maps/search/?api=1&query=AIIMS+New+Delhi+India",
    },
    {
      name: "NIMHANS",
      location: "Bengaluru, India",
      rating: "⭐️⭐️⭐️⭐️⭐️",
      desc: "Top national center for neuroscience and mental health studies.",
      mapsUrl: "https://www.google.com/maps/search/?api=1&query=NIMHANS+Bengaluru+India",
    },
    {
      name: "Fortis Hospital",
      location: "Mumbai, India",
      rating: "⭐️⭐️⭐️⭐️",
      desc: "Provides state-of-the-art epilepsy diagnosis and treatment services.",
      mapsUrl: "https://www.google.com/maps/search/?api=1&query=Fortis+Hospital+Mumbai+India",
    },
    {
      name: "Christian Medical College",
      location: "Vellore, India",
      rating: "⭐️⭐️⭐️⭐️",
      desc: "Offers expert neurological consultation and EEG facilities.",
      mapsUrl: "https://www.google.com/maps/search/?api=1&query=Christian+Medical+College+Vellore+India",
    },
  ];

  return (

    <div className="relative min-h-screen overflow-hidden bg-pink text-white">
      <ParticleBackground />
    <div className="relative min-h-screen bg-mint blue text-white flex flex-col items-center px-6 pb-12">
      {/* HEADER */}
      <header className="absolute top-[10%] left-1/2 transform -translate-x-1/2 text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-4 text-purple-300  drop-shadow-[0_0_20px_rgba(0,255,255,0.5)]">
          Popular Hospitals
        </h1>
        <p className="text-lg md:text-xl text-white-400 max-w-2xl mx-auto">
          Leading institutions for epilepsy diagnosis and treatment across India.
        </p>
      </header>

      {/* GRID OF HOSPITAL CARDS */}
      <div className="mt-48 md:mt-56 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl">
        {hospitals.map((hospital, index) => (
          <div
            key={index}
            className="bg-white/5 backdrop-blur-md border border-gray-700 rounded-2xl p-6 hover:scale-105 hover:shadow-[0_0_20px_#00ffff50] transition-all duration-300"
          >
            <h3 className="text-2xl font-bold text-cyan-400 mb-2">
              {hospital.name}
            </h3>
            <p className="text-gray-400 mb-1">{hospital.location}</p>
            <p className="text-yellow-400 mb-3">{hospital.rating}</p>
            <p className="text-gray-300 text-sm leading-relaxed mb-4">
              {hospital.desc}
            </p>
            <a
              href={hospital.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-300"
            >
              View on Google Maps
            </a>
          </div>
        ))}
      </div>

      {/* FOOTER */}
      <footer className="absolute bottom-6 text-center">
        <a
          href="/home"
          className="text-gray-400 hover:text-cyan-400 transition-colors text-sm"
        >
          ⬅ Back to Home
        </a>
      </footer>
    </div>
    </div>
  );
};

export default Hospitals;
