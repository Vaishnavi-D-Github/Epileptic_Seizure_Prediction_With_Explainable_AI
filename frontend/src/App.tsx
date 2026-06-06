import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// PAGES
import Index from "./pages/Index";
import Home from "./pages/Home";
import About from "./pages/About";
import Hospitals from "./pages/Hospitals";
import Predict from "./pages/Predict";
import NotFound from "./pages/NotFound";
import RealTimeDetection from "./pages/RealTimeDetection";
import AdvancedAI from "./pages/AdvancedAI";
import DetailedReports from "./pages/DetailedReports";
import ExampleReports from "./pages/ExampleReports";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Landing Page */}
          <Route path="/" element={<Index />} />

          {/* Main Pages */}
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/hospitals" element={<Hospitals />} />
          <Route path="/predict" element={<Predict />} />
          <Route path="/real-time-detection" element={<RealTimeDetection />} />
          <Route path="/advanced-ai" element={<AdvancedAI />} />
          <Route path="/detailed-reports" element={<DetailedReports />} />
          <Route path="/example-reports" element={<ExampleReports />} />

          {/* Fallback */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
