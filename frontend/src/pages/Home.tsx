import { useNavigate } from "react-router-dom";
import { ParticleBackground } from "@/components/ParticleBackground";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#020617] text-white">
      {/* Animated Background */}
      <ParticleBackground />

      {/* TOP NAVIGATION */}
      <nav className="absolute top-6 right-10 flex gap-6 z-20">
        <button
          onClick={() => navigate("/")}
          className="px-6 py-2 bg-white/10 border border-gray-700 rounded-lg hover:scale-105 hover:shadow-[0_0_10px_#00ffff60] transition-all duration-300 text-sm font-semibold"
        >
          Back to Home
        </button>
        <button
          onClick={() => navigate("/about")}
          className="px-6 py-2 bg-white/10 border border-gray-700 rounded-lg hover:scale-105 hover:shadow-[0_0_10px_#00ffff60] transition-all duration-300 text-sm font-semibold"
        >
          About
        </button>
       
        <button
          onClick={() => navigate("/hospitals")}
          className="px-6 py-2 bg-white/10 border border-gray-700 rounded-lg hover:scale-105 hover:shadow-[0_0_10px_#00ffff60] transition-all duration-300 text-sm font-semibold"
        >
          Hospitals
        </button>
      </nav>

      {/* MAIN CONTENT */}
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-center min-h-screen px-10 md:px-20">
        
        {/* LEFT SECTION: Heading */}
        <div className="text-center md:text-left md:w-1/2 space-y-6">
          <h1 className="text-3xl md:text-6xl font-bold text-purple-300  drop-shadow-[0_0_20px_rgba(0,255,255,0.5)]">
            Welcome to NeuroXplain
          </h1>
          <p className="text-lg md:text-xl text-gray-200">
            EEG-Based Epilepsy Detection System
          </p>
        </div>

        {/* RIGHT SECTION: Description */}
        <div className="mt-10 md:mt-0 md:w-1/2 text-center md:text-left space-y-6">
          <h2 className="text-3xl font-semibold text-cyan-300">
            Detect Epilepsy Early with NeuroXplain
          </h2>
          <p className="text-gray-300 text-lg leading-relaxed">
            An AI-powered EEG image analysis system that predicts epilepsy using deep learning — helping neurologists and patients achieve faster, more accurate diagnosis. With Epivision, you can upload EEG data, get quick predictions, and view clear, easy-to-understand reports.
          </p>
          <button
            onClick={() => navigate("/predict")}
            className="mt-4 px-8 py-3 bg-blue-500 hover:bg-violet-600 rounded-xl text-white font-semibold text-lg transition-all duration-300 shadow-[0_0_20px_#00ffff40]"
          >
            Get Started →
          </button>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="absolute bottom-4 w-full text-center text-gray-500 text-sm">
        <p>© 2025 NeuroXplain</p>
      </footer>
    </div>
  );
};

export default Home;
