import { Outlet } from "react-router-dom";
import PrivateNavbar from "../components/Navbar/PrivateNavbar";

export default function PrivateLayout() {
    return (
        <>
            <PrivateNavbar />
            <Outlet />
            <footer className="text-center py-3 border-top">
                <span>© 2026 Haider Task Management App</span>
            </footer>
        </>
    )
};