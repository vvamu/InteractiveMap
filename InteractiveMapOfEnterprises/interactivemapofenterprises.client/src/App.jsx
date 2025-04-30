import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage";
import MapPage from "./pages/MapPage";
import EditorPage from "./pages/EditorPage";
import CatalogPage from "./pages/CatalogPage";
import CompanyPage from "./pages/CompanyPage";

function App() {
  return (
    <div id="heta">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/map" element={<MapPage />} />
          <Route path="/catalog" element={<CatalogPage />} />
          <Route path="/editor" element={<EditorPage />} />
          <Route path="/company" element={<CompanyPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
