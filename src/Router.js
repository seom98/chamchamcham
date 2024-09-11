import React, { Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Loading from "./components/Loading";
import App from "./App";
import ScrollToTop from "./components/templates/ScrollToTop";
import DarkModeCheck from "./components/templates/DarkModeCheck";

const WelcomePage = React.lazy(() => import("./pages/WelcomePage"));
const SignupPage = React.lazy(() => import("./pages/SignupPage"));
const LoginPage = React.lazy(() => import("./pages/LoginPage"));

const HomePage = React.lazy(() => import("./pages/HomePage"));

const PlanPage = React.lazy(() => import("./pages/PlanPage"));
const PlanCreatePage = React.lazy(() => import("./pages/PlanCreatePage"));

const CalendarPage = React.lazy(() => import("./pages/CalendarPage"));

const SettingPage = React.lazy(() => import("./pages/SettingPage"));

export default function Router() {
    return (
        <BrowserRouter>
            <DarkModeCheck />
            <ScrollToTop />
            <Suspense fallback={<Loading>소비습관을 길러주는 참참참!</Loading>}>
                <Routes>
                    <Route path="/" element={<App />}>
                        <Route index element={<WelcomePage />} />
                        <Route path="signup" element={<SignupPage />} />
                        <Route path="login" element={<LoginPage />} />

                        <Route path="home" element={<HomePage />} />

                        <Route path="plan">
                            <Route index element={<PlanPage />} />
                            <Route path="create" element={<PlanCreatePage />} />
                        </Route>

                        <Route path="setting" element={<SettingPage />} />
                        <Route path="calendar" element={<CalendarPage />} />
                    </Route>
                </Routes>
            </Suspense>
        </BrowserRouter>
    );
}
