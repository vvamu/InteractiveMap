import { useEffect, useState } from "react";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage";
import MapPage from "./pages/MapPage";
import CompanyEditorPage from "./pages/CompanyEditorPage";
import CompaniesPage from "./pages/CompaniesPage";
import CompanyPage from "./pages/CompanyPage";
import LoginPage from "./pages/LoginPage";
import UserEditorPage from "./pages/UserEditorPage";
import UserPage from "./pages/UserPage";
import UsersPage from "./pages/UsersPage";

import Header from "./components/Common/Header/Header";

import authService from "./services/authService";
import { CookiesProvider } from 'react-cookie';
import GamePage from "./pages/GamePage";
import MemoPage from "./pages/MemoPage"
import PuzzlePage from "./pages/PuzzlePage";

function App() {
    const [currentUser, setCurrentUser] = useState(null);
    const [isChangeUser, changeUser] = useState(null);

    useEffect(() => {
        async function getCurUser() {
            try {
                var res = await authService.getCurrentUser();
                setCurrentUser(res);
            }
            catch (ex) {
                console.log(ex)
            }
        }
        getCurUser();
    }, [isChangeUser])

    return (
        <CookiesProvider defaultSetOptions={{ path: '/' }}>
        <BrowserRouter >
         
                <Header changeUser={changeUser} currentUser={currentUser}  />
                {/*PAGES Content*/}
                <div >
                    <Routes >
                        <Route path="/" element={<MainPage />} />

                        <Route path="/games/memo" element={<MemoPage />} />
                        <Route path="/games/puzzle" element={<PuzzlePage />} />

                        <Route path="/map" element={<MapPage />} />
                        <Route path="/login" element={<LoginPage changeUser={changeUser} />} />

                        <Route path="/companies" element={<CompaniesPage />} />
                        <Route path="/companies/:id" element={<CompanyPage />} />
                        <Route path="/companies/edit/" element={<CompanyEditorPage />} />
                        <Route path="/companies/edit/:id" element={<CompanyEditorPage />} />
                        
                        <Route path="/users" element={<UsersPage />} currentUser={currentUser} />
                        <Route path="/users/:id" element={<UserPage currentUser={currentUser} />} />
                        <Route path="/users/edit/" element={<UserEditorPage />} />
                        <Route path="/users/edit/:id" element={<UserEditorPage />} />

                    </Routes>
                </div>
          
        </BrowserRouter>
        </CookiesProvider >
    );
}

export default App;