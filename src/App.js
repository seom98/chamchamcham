import "./App.css";
import { Outlet } from "react-router-dom";

export default function App() {
    return (
        <>
            <div id="main_content">
                <Outlet />
            </div>
        </>
    );
}
