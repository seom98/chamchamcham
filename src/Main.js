import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import WelcomePage from "./pages/WelcomePage";

function Main() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />}>
                    <Route index element={<WelcomePage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default Main;
