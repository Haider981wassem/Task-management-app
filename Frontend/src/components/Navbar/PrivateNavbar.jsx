import { useState } from "react";
import { Navbar, Button, Nav } from "react-bootstrap"
import { NavLink } from "react-router-dom"
import { useSelector } from 'react-redux'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import LogoutConfirm from "../Task/LogoutConfirm"
import AddTaskModal from "../Task/AddTaskModal"

export default function PrivateNavbar() {
    const user = useSelector(state => state.auth.user)
    const [showLogout, setShowLogout] = useState(false)
    const [showAddTask, setShowAddTask] = useState(false)

    return (
        <>
            <Navbar bg="white" className="border-bottom px-4">
                <Navbar.Brand as={NavLink} to="/tasks">
                    <img src="/EVSLogo.png" alt="EVS" height="50" />
                </Navbar.Brand>
                <Nav className="gap-4">
                    <NavLink to="/tasks" className="text-decoration-none text-primary fw-semibold">
                        <FontAwesomeIcon icon="fa-solid fa-list-check" className="me-1" /> ALL TASKS
                    </NavLink>
                    <NavLink to="/favorite" className="text-decoration-none text-primary fw-semibold">
                        <FontAwesomeIcon icon="fa-solid fa-bookmark" className="me-1" /> FAVORITE
                    </NavLink>
                    <NavLink to="/work" className="text-decoration-none text-primary fw-semibold">
                        <FontAwesomeIcon icon="fa-solid fa-briefcase" className="me-1" /> WORK
                    </NavLink>
                    <NavLink to="/personal" className="text-decoration-none text-primary fw-semibold">
                        <FontAwesomeIcon icon="fa-solid fa-user-plus" className="me-1" /> PERSONAL
                    </NavLink>
                    <NavLink to="/learning" className="text-decoration-none text-primary fw-semibold">
                        <FontAwesomeIcon icon="fa-solid fa-graduation-cap" className="me-1" /> LEARNING
                    </NavLink>
                </Nav>
                <div className="ms-auto d-flex flex-column align-items-center">
                    <NavLink to="/profile">
                        <img
                            src={user?.Image ? `http://localhost:4150/uploads/${user?.Image}` : '/avatar.png'}
                            alt={user?.FullName || 'User'}
                            style={{ width: "45px", height: "45px", borderRadius: "50%", objectFit: "cover", cursor: "pointer" }}
                        />
                    </NavLink>
                    <small className="text-muted">{user?.FullName || 'User'}</small>
                </div>
                <Button variant="primary" className="ms-3" onClick={() => setShowAddTask(true)}>
                    <FontAwesomeIcon icon="fa-solid fa-plus" className="me-1" /> ADD TASK
                </Button>
                <Button variant="outline-danger" className="ms-3" onClick={() => setShowLogout(true)}>
                    <FontAwesomeIcon icon="fa-solid fa-right-from-bracket" className="me-1" /> Logout
                </Button>
            </Navbar>

            <LogoutConfirm
                show={showLogout}
                onClose={() => setShowLogout(false)}
            />
            <AddTaskModal
                show={showAddTask}
                onClose={() => setShowAddTask(false)}
            />
        </>
    )
}