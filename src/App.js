import "./App.css";
import { Outlet } from "react-router-dom";
import Container from "./components/templates/Container";
import Nav from "./components/ui/organisms/Nav";
import useShowNavBar from "./hooks/useShowNavBar"; // 커스텀 훅 가져오기

export default function App() {
    const showNavBar = useShowNavBar();

    return (
        <Container>
            <Outlet />
            {showNavBar && <Nav />}
        </Container>
    );
}
