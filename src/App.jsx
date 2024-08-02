import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import HomePage from "./components/HomePage";
import MyInfoPage from "./components/MyInfoPage";
import NewPage from "./components/NewPage";
import DetailsPage from "./components/elements/Details";
import LoginPage from "./components/LoginPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to={"/login"} />} />
        <Route path="/register" element={<Navigate to={"/login"} />} />

        <Route path="/home" element={<HomePage />} />

        <Route path="/new" element={<NewPage />} />

        <Route path="/my-info" element={<MyInfoPage />} />

        <Route path="/login" element={<LoginPage />} />

        <Route path="/home/details" element={<DetailsPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
