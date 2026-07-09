import { useState } from "react"
import { Navbar, Button, NavLink } from "react-bootstrap"
import LoginModal from "../Auth/LoginModal"
import SignupModal from "../Auth/SignupModal"

export default function PublicNavbar() {
    const [showLogin, setShowLogin] = useState(false)
    const [showSignup, setShowSignup] = useState(false)

    return (
        <>
            <Navbar bg="white" className="border-bottom px-4">
                <Navbar.Brand as={NavLink} to="/">
                    <img src="/EVSLogo.png" alt="EVS" height="50" />
                </Navbar.Brand>
                <div className="ms-auto d-flex gap-2">
                    <Button variant="outline-primary" onClick={() => setShowLogin(true)}>LOGIN</Button>
                    <Button variant="primary" onClick={() => setShowSignup(true)}>SIGNUP</Button>
                </div>
            </Navbar>

            <LoginModal show={showLogin} onClose={() => setShowLogin(false)} />
            <SignupModal show={showSignup} onClose={() => setShowSignup(false)} />
        </>
    )
}