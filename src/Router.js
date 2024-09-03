import React, { Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Loading from "./components/Loading";
import App from "./App";

const WelcomePage = React.lazy(() => import("./pages/WelcomePage"));
const TestPage = React.lazy(() => import("./pages/TestPage"));
const LoginPage = React.lazy(() => import("./pages/LoginPage"));
const SignupPage = React.lazy(() => import("./pages/SignupPage"));
const PlanPage = React.lazy(() => import("./pages/PlanPage"));
const SettingPage = React.lazy(() => import("./pages/SettingPage"));
const DiaryPage = React.lazy(() => import("./pages/DiaryPage"));

export default function Router() {
    return (
        <BrowserRouter>
            <Suspense fallback={<Loading>정보를 불러오는중</Loading>}>
                <Routes>
                    <Route path="/" element={<App />}>
                        <Route index element={<WelcomePage />} />
                        <Route path="/move" element={<TestPage />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/signup" element={<SignupPage />} />
                        <Route path="/plan" element={<PlanPage />} />
                        <Route path="/setting" element={<SettingPage />} />
                        <Route path="/diary" element={<DiaryPage />} />
                    </Route>
                </Routes>
            </Suspense>
        </BrowserRouter>
    );
}
