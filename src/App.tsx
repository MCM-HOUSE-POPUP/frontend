import { Route, Routes } from "react-router-dom";
import { SavedProvider } from "./context/SavedContext";

import MobileLayout from "./layouts/MobileLayout";
import MainLayout from "./layouts/MainLayout";

import LandingPage from "./pages/LandingPage";
import HomePage from "./pages/HomePage";
import MapPage from "./pages/MapPage";
import PassportPage from "./pages/PassportPage";
import SavedPage from "./pages/SavedPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import ProductInquiryPage from "./pages/ProductInquiryPage";

import TestPage from "./pages/test/TestPage";
import TestAiPage from "./pages/test/TestAiPage";
import TestResultPage from "./pages/test/TestResultPage";

import MissionListPage from "./pages/mission/MissionListPage";
import MissionDetailPage from "./pages/mission/MissionDetailPage";
import MissionCameraPage from "./pages/mission/MissionCameraPage";
import MissionResultPage from "./pages/mission/MissionResultPage";
import MissionPassportSavedPage from "./pages/mission/MissionPassportSavedPage";

export default function App() {
  return (
    <SavedProvider>
      <Routes>
        <Route path="/" element={<LandingPage />} />

        <Route element={<MobileLayout />}>
          <Route path="/test" element={<TestPage />} />
          <Route path="/test/ai/:resultId" element={<TestAiPage />} />
          <Route path="/test/result/:resultId" element={<TestResultPage />} />

          <Route path="/mission" element={<MissionListPage />} />
          <Route path="/mission/:house" element={<MissionDetailPage />} />
          <Route
            path="/mission/:house/camera"
            element={<MissionCameraPage />}
          />
          <Route
            path="/mission/:house/result"
            element={<MissionResultPage />}
          />
          <Route
            path="/mission/passport-saved"
            element={<MissionPassportSavedPage />}
          />

          <Route
            path="/products/:productId"
            element={<ProductDetailPage />}
          />
          <Route
            path="/products/:productId/inquiry"
            element={<ProductInquiryPage />}
          />

          <Route element={<MainLayout />}>
            <Route path="/home" element={<HomePage />} />
            <Route path="/map" element={<MapPage />} />
            <Route path="/saved" element={<SavedPage />} />
            <Route path="/passport" element={<PassportPage />} />
          </Route>
        </Route>
      </Routes>
    </SavedProvider>
  );
}