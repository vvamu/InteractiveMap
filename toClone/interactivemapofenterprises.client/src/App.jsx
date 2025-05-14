import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage";
import MapPage from "./pages/MapPage";
import EditorPage from "./pages/EditorPage";
import CatalogPage from "./pages/CatalogPage";
import CompanyPage from "./pages/CompanyPage";
import Header from "./components/Common/Header/Header";

function App() {
    return (
        <BrowserRouter>
            <div style={{ padding: "0px 15px" }}>
                <Header />
                <Routes>
                    <Route path="/" element={<MainPage />} />
                    <Route path="/map" element={<MapPage />} />
                    <Route path="/catalog" element={<CatalogPage />} />
                    <Route path="/editor" element={<EditorPage />} />
                    <Route path="/company" element={<CompanyPage />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;