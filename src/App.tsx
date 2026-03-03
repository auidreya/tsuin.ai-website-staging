import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/lib/theme";
import Home from "@/pages/Home";
import PricingPage from "@/pages/PricingPage";
import EnterprisePage from "@/pages/EnterprisePage";
import DocsPage from "@/pages/DocsPage";
import ManifestoPage from "@/pages/ManifestoPage";
import BlogPage from "@/pages/BlogPage";
import CareersPage from "@/pages/CareersPage";

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/enterprise" element={<EnterprisePage />} />
          <Route path="/docs" element={<DocsPage />} />
          <Route path="/manifesto" element={<ManifestoPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/careers" element={<CareersPage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}
