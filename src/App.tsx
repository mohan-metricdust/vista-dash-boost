
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Outlet, useLocation } from "react-router-dom";
import HomePage from "./pages/HomePage";
import NotFound from "./pages/NotFound";
import Services from "./pages/Services";
import About from "./pages/About";
import News from "./pages/News";
import Contact from "./pages/Contact";
import MetricTalks4thWebinarInvitaion from "./pages/news/MetricTalks4thWebinarInvitation";
import AIRevolutionizeTech from "./pages/news/AIRevolutionizeTech";
import MetricTalks3rdWebinar from "./pages/news/MetricTalks3rdWebinar";
import MetricTalks3rdWebinarInvitation from "./pages/news/MetricTalks3rdWebinarInvitation";
import MicroFrontendPerfectSaas from "./pages/news/MicroFrontendPerfectSaas";
import AIMLDeepFake from "./pages/news/AIMLDeepFake";
import MetricTalks2ndWebinar from "./pages/news/MetricTalks2ndWebinar";
import SampadaMagazineFeature from "./pages/news/SampadaMagzineFeature";
import RiseQuantumComputing from "./pages/news/RiseQuantamComputing";
import MetricTalks1stWebinarInvite from "./pages/news/MetricTalks1stWebinarInvite";
import MetricTalks1stWebinar from "./pages/news/MetricTalks1stWebinar";
import AIautomation from "./pages/news/AIautomation";
import TalkToAI from "./pages/TalkToAI";
import UnifiedInterviewPage from "./Hireko/UnifiedInterviewPage";
import { useEffect } from "react";

const queryClient = new QueryClient();

const App = () => (

  <QueryClientProvider client={queryClient}>
    
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="interview/definedUser" element={<TalkToAI />} />
          <Route path='services' element={<Services />} />
          <Route path="about" element={<About />} />
          <Route path="reflect" element={<News />} />
          <Route path="reflect/MetricTalks_4th_Webinar_invitation" element={<MetricTalks4thWebinarInvitaion />} />
          <Route path="reflect/AI_revolutionize_agritech" element={<AIRevolutionizeTech />} />
          <Route path="reflect/MetricTalks_3rd_Webinar" element={<MetricTalks3rdWebinar />} />
          <Route path="reflect/MetricTalks_3rd_Webinar_Invitation" element={<MetricTalks3rdWebinarInvitation />} />
          <Route path="reflect/microfrontend_perfect_for_saas" element={<MicroFrontendPerfectSaas />} />
          <Route path="reflect/AI_ML_Deepfake_attacks" element={<AIMLDeepFake />} />
          <Route path="reflect/Metrictalks_2nd_webinar" element={<MetricTalks2ndWebinar />} />
          <Route path="reflect/Sampada_magazine_feture" element={<SampadaMagazineFeature />} />
          <Route path="reflect/rise_quantam_computing" element={<RiseQuantumComputing />} />
          <Route path="reflect/metrictalks_1st_webinar_invite" element={<MetricTalks1stWebinarInvite />} />
          <Route path="reflect/metrictalks_1st_webinar" element={<MetricTalks1stWebinar />} />
          <Route path="reflect/ai-automation" element={<AIautomation />} />
          <Route path="contact" element={<Contact />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
  </QueryClientProvider>
);

export default App;
