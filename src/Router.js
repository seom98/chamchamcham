import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";

const WelcomePage = React.lazy(() => import("./pages/WelcomePage"));
const TestPage = React.lazy(() => import("./pages/TestPage"));

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
