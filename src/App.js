import "./App.css";
import { Outlet } from "react-router-dom";
import Container from "./components/Container";
import { useEffect } from "react";

export default function App() {
    useEffect(() => {
        const bgMode = window.localStorage.getItem("bgMode");
        if (bgMode === "dark") {
            document.getElementsByTagName("html")[0].classList.add("dark");
        }
    }, []);
    return (
        <Container>
            <Outlet />
        </Container>
    );
}
