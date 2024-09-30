import React, { Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoadingPopup from "./components/ui/organisms/LoadingPopup";
import App from "./App";
import ScrollToTop from "./components/templates/ScrollToTop";
import DarkModeCheck from "./components/templates/DarkModeCheck";

// 로그인전
const WelcomePage = React.lazy(() => import("./pages/WelcomePage"));
const SignupPage = React.lazy(() => import("./pages/SignupPage"));
const LoginPage = React.lazy(() => import("./pages/LoginPage"));

// 홈페이지
const HomePage = React.lazy(() => import("./pages/HomePage"));

// 목표페이지
const PlanPage = React.lazy(() => import("./pages/PlanPage"));
const PlanCreatePage = React.lazy(() => import("./pages/PlanCreatePage"));

// 달력페이지
const CalendarPage = React.lazy(() => import("./pages/CalendarPage"));
const DatePage = React.lazy(() => import("./pages/DatePage"));

// 설정페이지
const SettingPage = React.lazy(() => import("./pages/SettingPage"));

export default function Router() {
    return (
        <BrowserRouter>
            <DarkModeCheck />
            <ScrollToTop />
            <Suspense
                fallback={
                    <LoadingPopup>소비습관을 길러주는 참참참!</LoadingPopup>
                }
            >
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
                        <Route path="calendar">
                            <Route index element={<CalendarPage />} />
                            <Route path=":date" element={<DatePage />} />
                        </Route>
                        <Route path="setting" element={<SettingPage />} />
                    </Route>
                </Routes>
            </Suspense>
        </BrowserRouter>
    );
}
