import { useMemo, useState } from "react";
import axios from "axios";
import { ParticleBackground } from "@/components/ParticleBackground";

type PredictionResponse = {
  image_results?: Array<{
    filename: string;
    label: string;
    confidence: string;
    plot_url: string;
  }>;
  errors?: string[];
};

const Predict = () => {
  const [files, setFiles] = useState<FileList | null>(null);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<PredictionResponse | null>(null);
  const [errors, setErrors] = useState<string[]>([]);

  const apiBaseUrl = useMemo(() => {
    const base = import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, "") ?? "";
    return `${base}`;
  }, []);

  const interpretPrediction = (label: string, confidence: string) => {
    const value = parseFloat(confidence.replace("%", "").trim());
    if (Number.isNaN(value)) {
      return "The model could not determine how confident it is. Please review manually.";
    }

    const isSeizure = label.toLowerCase().includes("seizure") && !label.toLowerCase().includes("non");

    if (isSeizure) {
      if (value >= 90) {
        return "Very strong seizure evidence. Escalate for immediate medical attention.";
      }
      if (value >= 70) {
        return "High likelihood of seizure patterns. Recommend prompt clinical review.";
      }
      if (value >= 50) {
        return "Seizure indicators detected but borderline. Cross-check with additional EEGs or symptoms.";
      }
      return "Confidence is low despite the seizure label. Treat as uncertain and acquire more data.";
    }

    if (value >= 90) {
      return "The EEG looks normal with very high certainty. Continue regular monitoring.";
    }
    if (value >= 70) {
      return "Model leans toward a non-seizure reading. Keep observing and verify with patient history.";
    }
    if (value >= 50) {
      return "Non-seizure classification with moderate confidence. Consider follow-up testing to confirm.";
    }
    return "Low confidence in the non-seizure result. Re-run analysis or consult a specialist.";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!files) return;

    setErrors([]);
    setResults(null);

    const formData = new FormData();
    Array.from(files).forEach((file) => formData.append("files", file));

    try {
      setLoading(true);
      const response = await axios.post<PredictionResponse>(`${apiBaseUrl}/api/predict`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      const data = response.data;
      setResults(data.image_results?.length ? data : null);
      setErrors(data.errors ?? []);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const data = err.response?.data as PredictionResponse & { error?: string } | undefined;
        if (data) {
          setResults(data.image_results?.length ? data : null);
          const errorMessages = data.errors ?? (data.error ? [data.error] : []);
          if (errorMessages.length) {
            setErrors(errorMessages);
          } else {
            setErrors(["Prediction failed. Please try again."]);
          }
        } else {
          setErrors(["Prediction failed. Please try again."]);
        }
      } else {
        setErrors(["Unexpected error occurred."]);
      }
    } finally {
      setLoading(false);
    }
  };

  return (

    <div className="relative min-h-screen overflow-hidden bg-pink text-white">
      <ParticleBackground />
    <div className="relative min-h-screen bg-black text-white flex flex-col items-center px-6 pb-12">
      {/* HEADER */}
      <header className="absolute top-[10%] left-1/2 transform -translate-x-1/2 text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-4 text-purple-300  drop-shadow-[0_0_20px_rgba(0,255,255,0.5)]">
          Predict Seizure from EEG
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Upload EEG images and get real-time AI predictions.
        </p>
      </header>

      {/* UPLOAD FORM */}
      <form
        onSubmit={handleSubmit}
        className="mt-48 md:mt-56 flex flex-col items-center w-full max-w-2xl bg-white/5 backdrop-blur-md border border-gray-700 rounded-2xl p-8 space-y-4 shadow-[0_0_25px_#00ffff30]"
      >
        <input
          type="file"
          multiple
          accept=".png,.jpg,.jpeg"
          onChange={(e) => setFiles(e.target.files)}
          className="file-input file-input-bordered file-input-info w-full"
        />
        <button
          type="submit"
          disabled={loading}
          className="px-8 py-3 bg-cyan-500/20 border border-cyan-400 rounded-xl hover:bg-cyan-500/40 transition-all duration-300 text-white font-semibold"
        >
          {loading ? "Predicting..." : "Predict"}
        </button>
      </form>

      {errors.length > 0 && (
        <div className="mt-8 max-w-2xl w-full bg-red-500/10 border border-red-500/40 text-red-200 rounded-2xl p-4 space-y-2">
          <h3 className="text-lg font-semibold">Upload Issues</h3>
          <ul className="list-disc list-inside space-y-1 text-sm md:text-base">
            {errors.map((error, idx) => (
              <li key={idx}>{error}</li>
            ))}
          </ul>
        </div>
      )}

      {/* RESULTS */}
      {results?.image_results && (
        <div className="mt-12 max-w-3xl w-full flex flex-col space-y-8">
          <section className="bg-white/5 border border-cyan-500/40 rounded-2xl px-6 py-5 text-center shadow-[0_0_20px_#00ffff25] space-y-2">
            <h3 className="text-xl font-bold text-cyan-200">How to read confidence levels</h3>
            <p className="font-semibold text-blue-200">
              ≥ 90%: very strong evidence — act immediately if the label indicates seizure.
            </p>
            <p className="font-semibold text-blue-200">
              70% – 89%: high confidence — prioritise follow-up reviews and clinical verification.
            </p>
            <p className="font-semibold text-blue-200">
              50% – 69%: moderate certainty — combine with symptoms or repeat scans.
            </p>
          </section>

          {results.image_results?.map((result, index) => (
            <div
              key={index}
              className="bg-white/5 backdrop-blur-md border border-gray-700 rounded-2xl p-6 shadow-[0_0_20px_#00ffff30] space-y-6"
            >
              <div className="text-center space-y-2">
                <h4 className="text-2xl font-extrabold text-cyan-300">{result.filename}</h4>
                <p className="text-xl font-bold text-blue-300">
                  {result.label} • Confidence: {result.confidence}
                </p>
                <p className="text-sm text-gray-200 leading-relaxed italic">
                  {interpretPrediction(result.label, result.confidence)}
                </p>
              </div>
              <div className="w-full flex justify-center">
                <img
                  src={result.plot_url}
                  alt={result.filename}
                  className="w-full max-w-lg rounded-xl border border-cyan-500/40 shadow-[0_0_25px_#00ffff20]"
                />
              </div>
              <p className="text-sm text-blue-200 text-center leading-relaxed">
                Red regions highlight waveform segments that increased the seizure prediction, while blue areas reduced it. Darker intensity means stronger influence.
              </p>
            </div>
          ))}
        </div>
      )}

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

export default Predict;
