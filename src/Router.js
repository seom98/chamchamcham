import { BrowserRouter, Routes, Route } from "react-router-dom";
import WelcomePage from "./pages/WelcomePage";
import TestPage from "./pages/TestPage";
import App from "./App";

export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />}>
                    <Route index element={<WelcomePage />} />
                    <Route path="/move" element={<TestPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}
