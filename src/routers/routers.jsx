import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from "../pages/MainPage";
import SignUpPage from "../pages/SignUpPage";
import LoginSuccess from "../pages/LoginSuccess";

function RouterApp() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/sign-up" element={<SignUpPage />} />
                <Route path="/login-success" element={<LoginSuccess />} />
            </Routes>
        </BrowserRouter>
    );
}

export default RouterApp;
