import { useNavigate } from "react-router-dom";
import { ParticleBackground } from "@/components/ParticleBackground";

const confidenceInterpretation = [
  {
    range: "90% – 100%",
    meaning: "Very high certainty",
    description:
      "The model detects seizure patterns with strong confidence. Recommend urgent clinical review and action.",
  },
  {
    range: "70% – 89%",
    meaning: "High confidence",
    description:
      "Likely seizure activity. Correlate with clinical notes or repeat scans to confirm the diagnosis.",
  },
  {
    range: "50% – 69%",
    meaning: "Moderate confidence",
    description:
      "Potential seizure signatures present but not definitive. Suggest follow-up imaging or manual inspection.",
  },
];

const DetailedReports = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#020617] text-white">
      <ParticleBackground />

      <div className="relative z-10 min-h-screen px-6 md:px-20 py-24 flex flex-col gap-12 items-center text-center">
        <div className="space-y-4 max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold text-cyan-300 drop-shadow-[0_0_25px_rgba(0,255,255,0.45)]">
            Interpreting Model Reports
          </h1>
          <p className="text-lg text-gray-300">
            Learn how to read the seizure prediction cards, interpret confidence scores, and investigate SHAP visualizations.
          </p>
        </div>

        <section className="w-full max-w-4xl bg-white/5 border border-cyan-400/30 rounded-3xl px-8 py-10 backdrop-blur-lg shadow-[0_0_35px_rgba(0,255,255,0.2)] text-left space-y-6">
          <h2 className="text-2xl font-semibold text-blue-300">Reading the Prediction Card</h2>
          <ul className="list-disc pl-6 space-y-3 text-gray-200 text-base md:text-lg leading-relaxed">
            <li>
              <span className="text-cyan-200 font-semibold">Label:</span> Indicates whether the uploaded EEG image is classified as seizure or non-seizure.
            </li>
            <li>
              <span className="text-cyan-200 font-semibold">Confidence:</span> Shows how strongly the model supports its prediction. Higher percentages signal stronger evidence.
            </li>
            <li>
              <span className="text-cyan-200 font-semibold">SHAP heatmap:</span> Highlights regions of the EEG that influenced the decision. Warm colors (red) point to areas pushing the prediction toward a seizure classification, while cool colors (blue) indicate regions supporting a non-seizure result.
            </li>
          </ul>
          <div className="space-y-3 text-gray-200 text-base leading-relaxed">
            <p>
              Each prediction also includes a colored SHAP overlay. Bright reds highlight waveform regions nudging the model toward a seizure verdict, while cool blues dampen the score toward a non-seizure result.
            </p>
            <p>
              Darker shades signal stronger influence. When red clusters align with clinically relevant spike-and-wave patterns, the AI is reinforcing clinical intuition; if the highlight drifts over noisy artifacts, take a second look or gather more data before acting.
            </p>
          </div>
        </section>

        <section className="w-full max-w-4xl bg-white/5 border border-cyan-400/30 rounded-3xl px-8 py-10 backdrop-blur-lg shadow-[0_0_35px_rgba(0,255,255,0.2)] text-left space-y-6">
          <h2 className="text-2xl font-semibold text-blue-300">Confidence Score Interpretation</h2>
          <div className="w-full flex flex-wrap justify-center gap-8">
            {confidenceInterpretation.slice(0, 3).map((item) => (
              <div
                key={item.range}
                className="bg-black/30 border border-cyan-500/30 rounded-2xl px-8 py-6 shadow-[0_0_25px_rgba(0,255,255,0.15)] 
                 w-full md:w-[30%] text-center"
              >
                <h3 className="text-2xl font-bold text-cyan-200">{item.range}</h3>
                <p className="text-base text-blue-200 font-semibold mb-3">{item.meaning}</p>
                <p className="text-sm text-gray-200 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
          <button
          onClick={() => navigate("/example-reports")}
            className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-cyan-500/20 border border-cyan-400 text-cyan-200 font-semibold hover:bg-cyan-500/30 transition-colors"
          >
            View sample reports by confidence range
          </button>
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

export default DetailedReports;

