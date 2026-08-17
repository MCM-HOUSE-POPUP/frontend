import { Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import HomePage from "./pages/HomePage";
import MapPage from "./pages/MapPage";
import PassportPage from "./pages/ProductDetailPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import ProductInquiryPage from "./pages/ProductInquiryPage";
import SavedPage from "./pages/SavedPage";
import LandingPage from "./pages/LandingPage";
import ResultPage from "./pages/ResultPage";
import TestPage from "./pages/TestPage";
import { SavedProvider } from "./context/SavedContext";
import MissionListPage from "./pages/mission/MissionListPage";
import MissionDetailPage from "./pages/mission/MissionDetailPage";
import MissionCameraPage from "./pages/mission/MissionCameraPage";
import MissionPassportSavedPage from "./pages/mission/MissionPassportSavedPage";
import MissionResultPage from "./pages/mission/MissionResultPage";

export default function App() {
  return (
    <SavedProvider>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/test" element={<TestPage />} />
        <Route path="/result" element={<ResultPage />} />
        <Route path="/mission" element={<MissionListPage />} />
        <Route path="/mission/:house" element={<MissionDetailPage />} />
        <Route path="/mission/:house/camera" element={<MissionCameraPage />} />
        <Route
          path="/mission/passport-saved"
          element={<MissionPassportSavedPage />}
        />
        <Route path="/mission/:house/result" element={<MissionResultPage />} />

        <Route element={<MainLayout />}>
          <Route path="/home" element={<HomePage />} />
          <Route path="/map" element={<MapPage />} />
          <Route path="/saved" element={<SavedPage />} />
          <Route path="/passport" element={<ProductDetailPage />} />
        </Route>

        <Route path="/products/:productId" element={<ProductDetailPage />} />
        <Route
          path="/products/:productId/inquiry"
          element={<ProductInquiryPage />}
        />
      </Routes>
    </SavedProvider>
  );
}
