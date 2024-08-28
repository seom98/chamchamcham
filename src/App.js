import "./App.css";
import { Outlet } from "react-router-dom";
import Container from "./components/Container";

export default function App() {
    return (
        <Container>
            <Outlet />
        </Container>
    );
}
