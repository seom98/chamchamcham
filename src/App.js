import { Outlet } from "react-router-dom";
import Container from "./components/templates/Container";
import "./App.css";

export default function App() {
    return (
        <Container>
            <Outlet />
        </Container>
    );
}
