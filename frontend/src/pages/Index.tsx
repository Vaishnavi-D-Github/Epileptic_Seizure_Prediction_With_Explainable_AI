import { ParticleBackground } from "@/components/ParticleBackground";
import { BrainVisualization } from "@/components/BrainVisualization";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();
  return (
    <div className="relative min-h-screen overflow-hidden bg-pink text-white">
      <ParticleBackground />

      {/* === MAIN LAYOUT === */}
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between min-h-screen px-8 md:px-20 pt-24 md:pt-0">
        
        {/* LEFT SIDE — Centered Title + Description + Boxes */}
        <div className="flex flex-col justify-center items-center md:items-start w-full md:w-1/2 space-y-10 mt-24 md:mt-0">
          
          {/* Centered Title + Description */}
          <div className="absolute top-[10%] left-1/2 transform -translate-x-1/2 flex flex-col items-center text-center z-10 space-y-6">
            <h1 className="text-5xl md:text-6xl font-bold text-purple-300 drop-shadow-[0_0_20px_rgba(0,255,255,0.5)] text-center">
              NeuroXplain
            </h1>
            <p className="text-xl md:text-2xl text-white/90 text-center" style={{ animationDelay: "0.2s" }}>
              EEG-Based Epilepsy Detection System
            </p>
          </div>

          {/* Feature Boxes */}
          <div
            className="flex flex-col space-y-3 w-full max-w-xs animate-fade-in"
            style={{ animationDelay: "0.4s" }}
          >
            <button
              onClick={() => navigate("/real-time-detection")}
              className="text-left bg-zinc-950/60 border border-cyan-400/25 rounded-xl px-5 py-4 backdrop-blur-sm hover:scale-105 hover:shadow-[0_0_20px_rgba(0,255,255,0.25)] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
            >
              <div className="text-xl mb-2">⚡</div>
              <h3 className="text-lg font-semibold mb-1 text-cyan-300 underline-offset-4 hover:underline">
                Real-time Detection
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Instant prediction of epilepsy with high accuracy.
              </p>
            </button>

            <button
              onClick={() => navigate("/advanced-ai")}
              className="text-left bg-zinc-950/60 border border-cyan-400/25 rounded-xl px-5 py-4 backdrop-blur-sm hover:scale-105 hover:shadow-[0_0_20px_rgba(0,255,255,0.25)] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
            >
              <div className="text-xl mb-2">🔬</div>
              <h3 className="text-lg font-semibold mb-1 text-cyan-300 underline-offset-4 hover:underline">
                Advanced AI
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Machine learning models trained on extensive datasets.
              </p>
            </button>

            <button
              onClick={() => navigate("/detailed-reports")}
              className="text-left bg-zinc-950/60 border border-cyan-400/25 rounded-xl px-5 py-4 backdrop-blur-sm hover:scale-105 hover:shadow-[0_0_20px_rgba(0,255,255,0.25)] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
            >
              <div className="text-xl mb-2">📊</div>
              <h3 className="text-lg font-semibold mb-1 text-cyan-300 underline-offset-4 hover:underline">
                Detailed Reports
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Comprehensive analysis and visualization of results.
              </p>
            </button>
          </div>

        </div>

        {/* Get Started Button */}
<div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 z-20">
  <button
    onClick={() => window.location.href = '/home'}
    className="px-8 py-4 bg-white/5 border border-gray-700 rounded-xl text-white font-semibold text-lg hover:scale-105 hover:shadow-[0_0_20px_#00ffff60] transition-all duration-300"
  >
    Get Started →
  </button>
</div>


{/* RIGHT SIDE — Large 3D Brain with Glow Aura */}
 <div className="relative w-full md:w-1/2 h-[700px] flex items-center justify-center md:justify-end">
  {/* Glowing Background Aura */}
  <div className="absolute inset-0 flex items-center justify-center">
    <div className="w-[600px] h-[600px] rounded-full bg-cyan-500/30 blur-[120px] opacity-70 animate-pulse" />
  </div>

  {/* 3D Brain Model */}
  <div className="relative w-[120%] md:w-[150%] h-full translate-x-[10%] md:translate-x-[20%]">
    <BrainVisualization />
  </div>
</div>

      </div>
    </div>
  );
};

export default Index;


