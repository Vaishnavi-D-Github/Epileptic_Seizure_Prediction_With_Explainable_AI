import { useNavigate } from "react-router-dom";
import { ParticleBackground } from "@/components/ParticleBackground";

const articles = [
  {
    title: "Overview of Deep Learning Models",
    description: "Stanford CS231n notes cover convolutional architectures, training strategies, and recent advances.",
    url: "https://cs231n.github.io/convolutional-networks/",
  },
  {
    title: "Attention Is All You Need (Transformer Paper)",
    description: "The seminal paper introducing transformer models that power modern large language models.",
    url: "https://arxiv.org/abs/1706.03762",
  },
  {
    title: "Explainable AI for Medical Imaging",
    description: "Survey of interpretability techniques applied to deep models in healthcare diagnostics.",
    url: "https://arxiv.org/abs/2011.08819",
  },
  {
    title: "SeizureNet: A Lightweight Deep Neural Network",
    description: "Research paper proposing a compact CNN architecture for epileptic seizure detection on edge devices.",
    url: "https://ieeexplore.ieee.org/document/9154962",
  },
  {
    title: "AutoML for Neural Architecture Search",
    description: "Research on using reinforcement learning to automate model design.",
    url: "https://arxiv.org/abs/1611.01578",
  },
];

const AdvancedAI = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#020617] text-white">
      <ParticleBackground />

      <div className="relative z-10 min-h-screen px-6 md:px-20 py-24 flex flex-col gap-12 items-center text-center">
        <div className="space-y-4 max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold text-purple-300 drop-shadow-[0_0_25px_rgba(128,90,213,0.5)]">
            Advanced AI Resources
          </h1>
          <p className="text-lg text-gray-300">
            Dive deeper into cutting-edge artificial intelligence research, model architectures, and open-source projects powering real-time seizure detection.
          </p>
        </div>

        <section className="w-full max-w-4xl bg-white/5 border border-purple-400/25 rounded-3xl px-8 py-10 backdrop-blur-lg shadow-[0_0_35px_rgba(128,90,213,0.25)] text-left space-y-6">
          <h2 className="text-2xl font-semibold text-purple-200">
            Why Advanced AI Models Matter
          </h2>
          <p className="text-base md:text-lg text-gray-200 leading-relaxed">
            Modern AI architectures—convolutional networks, transformers, and hybrid deep learning systems—excel at uncovering subtle patterns hidden inside EEG signals.
            By continuously learning from large datasets, these models improve detection accuracy and stay resilient across patient populations.
          </p>
          <p className="text-base md:text-lg text-gray-200 leading-relaxed">
            Automating seizure identification reduces cognitive load for clinicians, minimizes manual review time, and helps avoid lapses in attention during long monitoring sessions.
            When paired with explainability tools, AI-driven workflows deliver timely alerts while keeping specialists in the loop, ultimately lowering the chance of human error in critical diagnostics.
          </p>
        </section>

        <section className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-6">
          {articles.map((article) => (
            <a
              key={article.url}
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/5 border border-purple-400/30 rounded-3xl px-6 py-6 backdrop-blur-md shadow-[0_0_30px_rgba(128,90,213,0.25)] text-left hover:scale-[1.02] transition-transform"
            >
              <h2 className="text-xl font-semibold text-purple-200 mb-2">{article.title}</h2>
              <p className="text-sm text-gray-200 leading-relaxed">{article.description}</p>
            </a>
          ))}
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

export default AdvancedAI;

