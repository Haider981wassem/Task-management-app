import { Outlet } from "react-router-dom";
import PublicNavbar from "../components/Navbar/PublicNavbar";

export default function PublicLayout(){
    return(
        <>
        <PublicNavbar/>
        <Outlet/>
        <footer className="text-center py-3 border-top">
            <span>© 2026 Haider Task Managemnet App</span>
        </footer>
        </>
    )
};