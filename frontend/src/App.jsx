import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Loader } from 'lucide-react';
import { ToastContainer } from 'react-toastify';

import Navbar from "./components/Navbar";

import HomePage from "./pages/HomePage.jsx";
import SignupPage from "./pages/SignupPage.jsx";
import SettingsPage from "./pages/SettingsPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";

import { useAuthStore } from "./store/useAuthStore.js";
import { useThemeStore } from "./store/useThemeStore.js";

function App() {
  const { authUser, checkAuth, isCheckingAuth, onlineUsers } = useAuthStore();
  const { theme } = useThemeStore();

  useEffect(() => {
     checkAuth();
  }, [checkAuth]);

  if(isCheckingAuth && !authUser) return (
     <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
     </div>
  );

  return (
    <div data-theme={theme}>
      <Navbar/>
      <Routes>
         <Route path="/" element={authUser ? <HomePage/> : <Navigate to="/login" />} />
         <Route path="/signup" element={!authUser ? <SignupPage/> : <Navigate to="/" />} />
         <Route path="/login" element={!authUser ? <LoginPage/> : <Navigate to="/" />} />
         <Route path="/settings" element={<SettingsPage/>} />
         <Route path="/profile" element={authUser ? <ProfilePage/>  : <Navigate to="/login" />} />
      </Routes>
      <ToastContainer toastClassName={'!bg-base-100 !shadow-xl !text-base-content/80'} position="top-center" autoClose={3000}/>
    </div>
  )
}

export default App
