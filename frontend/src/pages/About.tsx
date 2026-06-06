import { ParticleBackground } from "@/components/ParticleBackground";
const About = () => {
  return (

    <div className="relative min-h-screen overflow-hidden bg-pink text-white">
      <ParticleBackground />
    <div className="relative min-h-screen bg-black text-white flex flex-col items-center justify-center px-6">
      {/* HEADER */}
      <header className="absolute top-[12%] left-1/2 transform -translate-x-1/2 text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-4 text-purple-300  drop-shadow-[0_0_20px_rgba(0,255,255,0.5)]">
          About Epilepsy
        </h1>
        <p className="text-lg md:text-xl text-gray-400 max-w-2.5xl mx-auto">
          Understanding epilepsy and how technology can help predict and manage it.
        </p>
      </header>

      {/* CONTENT CARD */}
      <div className="bg-white/5 backdrop-blur-md border border-gray-700 rounded-2xl p-8 mt-48 md:mt-56 max-w-4xl text-center shadow-[0_0_25px_#00ffff30]">
        <p className="text-gray-300 leading-relaxed mb-6 text-lg">
          Epilepsy is a neurological disorder characterized by recurrent seizures. 
          Seizures are episodes of disrupted brain activity that can cause changes 
          in behavior, movements, feelings, or levels of consciousness. 
        </p>
        <p className="text-gray-300 leading-relaxed mb-6 text-lg">
          It affects millions worldwide and can be managed with medication, 
          lifestyle changes, or surgery. Early detection via EEG analysis can 
          significantly aid in diagnosis and treatment, improving the patient’s 
          quality of life.
        </p>
        <p className="text-gray-300 leading-relaxed text-lg">
          Our AI-based system leverages machine learning models trained on EEG data 
          to provide accurate, real-time seizure detection and prediction.
        </p>
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

export default About;
