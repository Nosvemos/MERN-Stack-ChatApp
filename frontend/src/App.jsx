import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import SignupPage from "./pages/SignupPage.jsx";
import SettingsPage from "./pages/SettingsPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import { useAuthStore } from "./store/useAuthStore.js";
import {useEffect} from "react";

function App() {
  const { authUser, checkAuth } = useAuthStore();

  useEffect(() => {
     checkAuth();
  }, [checkAuth]);

  console.log({authUser});
  return (
    <div>
      <Navbar/>

      <Routes>
         <Route path="/" element={<HomePage/>} />
         <Route path="/signup" element={<SignupPage/>} />
         <Route path="/login" element={<LoginPage/>} />
         <Route path="/settings" element={<SettingsPage/>} />
         <Route path="/profile" element={<ProfilePage/>} />
      </Routes>
    </div>
  )
}

export default App
