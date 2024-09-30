import { Outlet } from "react-router-dom";
import Container from "./components/templates/Container";
import { GlobalStyle } from "./GlobalStyle";

export default function App() {
    return (
        <Container>
            <GlobalStyle />
            <Outlet />
        </Container>
    );
}
