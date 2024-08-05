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

        <Route path="/login" element={<LoginPage />} />

        <Route path="/home/:mid" element={<HomePage />} />
        <Route path="/home/:mid/details/:id" element={<DetailsPage />} />

        <Route path="/new/:mid" element={<NewPage />} />

        <Route path="/my-info/:mid" element={<MyInfoPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;