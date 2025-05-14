import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage";
import MapPage from "./pages/MapPage";
import EditorPage from "./pages/EditorPage";
import CatalogPage from "./pages/CatalogPage";
import CompanyPage from "./pages/CompanyPage";
import LoginPage from "./pages/LoginPage";
import CreateUserPage from "./pages/CreateUserPage";

import Header from "./components/Common/Header/Header";

import { CookiesProvider } from 'react-cookie';


function App() {
    return (
        <CookiesProvider defaultSetOptions={{ path: '/' }}>
        <BrowserRouter >
         
                <Header />
                {/*PAGES Content*/}
                <div >
                    <Routes >
                        <Route path="/" element={<MainPage />} />
                        <Route path="/map" element={<MapPage />} />
                        <Route path="/catalog" element={<CatalogPage />} />
                        <Route path="/editor" element={<EditorPage />} />
                        <Route path="/company" element={<CompanyPage />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/user/create" element={<CreateUserPage />} />
                    </Routes>
                </div>
          
        </BrowserRouter>
        </CookiesProvider >
    );
}

export default App;