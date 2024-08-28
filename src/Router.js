import React, { Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Loading from "./components/Loading";
import App from "./App";

const WelcomePage = React.lazy(() => import("./pages/WelcomePage"));
const TestPage = React.lazy(() => import("./pages/TestPage"));

export default function Router() {
    return (
        <BrowserRouter>
            <Suspense fallback={<Loading />}>
                <Routes>
                    <Route path="/" element={<App />}>
                        <Route index element={<WelcomePage />} />
                        <Route path="/move" element={<TestPage />} />
                    </Route>
                </Routes>
            </Suspense>
        </BrowserRouter>
    );
}
