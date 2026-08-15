import { Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import HomePage from "./pages/main/HomePage";
import MapPage from "./pages/main/MapPage";
import PassportPage from "./pages/main/PassportPage";
import SavedPage from "./pages/main/SavedPage";
import LandingPage from "./pages/onboarding/LandingPage";
import ResultPage from "./pages/onboarding/ResultPage";
import TestPage from "./pages/onboarding/TestPage";
import { SavedProvider } from "./context/SavedContext";
import MissionListPage from "./pages/mission/MissionListPage";
import MissionDetailPage from "./pages/mission/MissionDetailPage";

export default function App() {
  return (
    <SavedProvider>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/test" element={<TestPage />} />
        <Route path="/result" element={<ResultPage />} />
        <Route path="/mission" element={<MissionListPage />} />
        <Route path="/mission/:house" element={<MissionDetailPage />} />

        <Route element={<MainLayout />}>
          <Route path="/home" element={<HomePage />} />
          <Route path="/map" element={<MapPage />} />
          <Route path="/saved" element={<SavedPage />} />
          <Route path="/passport" element={<PassportPage />} />
        </Route>
      </Routes>
    </SavedProvider>
  );
}
