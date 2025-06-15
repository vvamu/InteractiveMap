import { useEffect, useState } from "react";
import React, { createContext, useContext } from 'react';
import { CookiesProvider } from 'react-cookie';
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";

import authService from "./services/authService";


import Header from "./components/Common/Header/Header";
import Footer from "./components/common/Footer/Footer";

import MainPage from "./pages/MainPage";
import MapPage from "./pages/MapPage";
import CompanyEditorPage from "./pages/CompanyEditorPage";
import CompaniesPage from "./pages/CompaniesPage";
import CompanyPage from "./pages/CompanyPage";
import LoginPage from "./pages/LoginPage";
import UserEditorPage from "./pages/UserEditorPage";
import UserPage from "./pages/UserPage";
import UsersPage from "./pages/UsersPage";
import GamesPage from "./pages/GamesPage";
import MemoPage from "./pages/MemoPage"
import PuzzlePage from "./pages/PuzzlePage";
import UserContext from "./context/UserContext";


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
                <UserContext.Provider value={{ user: currentUser}}>
                
                   
                    
                    <Header changeUser={changeUser} currentUser={currentUser}  />

                    <div style={{ minHeight:"100%" }}>
                        <Routes >

                        
                        <Route path="/" element={<MainPage />} />

                            <Route path="/games" element={<GamesPage />} />

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
                    <Footer/>

                </UserContext.Provider>
            </BrowserRouter>
        </CookiesProvider >
    );
}

export default App;



//const LoadingContext = createContext();

//const LoadingProvider = ({ children }) => {
//    const [loading, setLoading] = useState(false);
//    const [delayedLoading, setDelayedLoading] = useState(false);

//    const startDelayedLoading = () => {
//        setDelayedLoading(true);
//        setTimeout(() => {
//            setLoading(true);
//            setDelayedLoading(false);
//        }, 1000); // 1 second delay
//    };

//    return (
//        <LoadingContext.Provider value={{ loading, delayedLoading, startDelayedLoading, setLoading }}>
//            {children}
//        </LoadingContext.Provider>
//    );
//};
//const useLoading = () => useContext(LoadingContext);


//const Loader = () => {
//    const { loading, delayedLoading } = useLoading();

//    if (!loading && !delayedLoading) return null;

//    return (
//        <div className="loader-overlay">
//            <div className="loader"></div>
//        </div>
//    );
//};


//const Loader = () => {

//    const { loading, delayedLoading } = useLoading();

//    if (!loading && !delayedLoading) return null;


//    const overlayStyle = {
//        position: 'fixed',
//        top: 0,
//        left: 0,
//        height: '100vh',
//        width: '100vw',
//        backgroundColor: 'rgba(255, 255, 255, 0.8)',
//        display: 'flex',
//        justifyContent: 'center',
//        alignItems: 'center',
//        zIndex: 9999,
//    };

//    const spinnerStyle = {
//        width: '60px',
//        height: '60px',
//        border: '8px solid #ccc',
//        borderTop: '8px solid #007bff',
//        borderRadius: '50%',
//        animation: 'spin 1s linear infinite',
//    };

//    const spinnerKeyframes = `
//    @keyframes spin {
//      0% { transform: rotate(0deg); }
//      100% { transform: rotate(360deg); }
//    }
//  `;

//    return (
//        <>
//            <style>{spinnerKeyframes}</style>
//            <div style={overlayStyle}>
//                <div style={spinnerStyle}></div>
//            </div>
//        </>
//    );
//};