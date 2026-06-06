import { useNavigate } from "react-router-dom";
import { ParticleBackground } from "@/components/ParticleBackground";

const RealTimeDetection = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#020617] text-white">
      <ParticleBackground />

      <div className="relative z-10 min-h-screen px-6 md:px-20 py-24 flex flex-col gap-12 items-center text-center">
        <div className="space-y-4 max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold text-cyan-300 drop-shadow-[0_0_25px_rgba(0,255,255,0.45)]">
            Real-time Detection Systems
          </h1>
          <p className="text-lg text-gray-300">
            Understand how continuous monitoring and instant inference enable faster decision-making in medical diagnostics and beyond.
          </p>
        </div>

        <section className="w-full max-w-4xl bg-white/5 border border-cyan-400/30 rounded-3xl px-8 py-10 backdrop-blur-lg shadow-[0_0_35px_rgba(0,255,255,0.2)] space-y-6">
          <h2 className="text-2xl font-semibold text-blue-300">What is a real-time detection system?</h2>
          <p className="text-base md:text-lg text-gray-200 leading-relaxed">
            A real-time detection system continuously processes incoming data streams and delivers immediate insights or alerts. In healthcare, it means analyzing signals—such as EEG scans—on the fly so clinicians can respond without delay.
          </p>
          <a
            href="https://www.google.com/search?q=what+is+a+real-time+detection+system"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-cyan-500/20 border border-cyan-400 text-cyan-200 font-semibold hover:bg-cyan-500/30 transition-colors"
          >
            Explore Google Search Results
          </a>
        </section>

        <section className="w-full max-w-4xl bg-white/5 border border-cyan-400/30 rounded-3xl px-8 py-10 backdrop-blur-lg shadow-[0_0_35px_rgba(0,255,255,0.2)] space-y-6">
          <h2 className="text-2xl font-semibold text-blue-300">Why is real-time detection useful?</h2>
          <p className="text-base md:text-lg text-gray-200 leading-relaxed">
            Real-time capabilities reduce response latency, automate monitoring, and provide actionable intelligence as events unfold. For epilepsy analysis, rapid detection of seizure patterns can improve patient safety, enable timely intervention, and support continuous remote care.
          </p>
        </section>

        <button
          onClick={() => navigate("/")}
          className="px-8 py-3 rounded-xl border border-gray-600 bg-white/5 hover:bg-white/10 text-gray-100 font-semibold transition-colors"
        >
          ← Back to Landing
        </button>
      </div>
    </div>
  );
};

export default RealTimeDetection;

