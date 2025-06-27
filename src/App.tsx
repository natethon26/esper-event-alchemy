
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import Dashboard from "./pages/Dashboard";
import PlanEvent from "./pages/PlanEvent";
import CaptureLead from "./pages/CaptureLead";
import VoiceNotes from "./pages/VoiceNotes";
import SalesforceSync from "./pages/SalesforceSync";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="pb-16 lg:pb-0">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/plan-event" element={<PlanEvent />} />
            <Route path="/capture-lead" element={<CaptureLead />} />
            <Route path="/voice-notes" element={<VoiceNotes />} />
            <Route path="/salesforce-sync" element={<SalesforceSync />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
        <Navigation />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
