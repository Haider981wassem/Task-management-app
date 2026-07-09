import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export default function LandingPage() {
    return (
        <div className="d-flex flex-column justify-content-center align-items-center" style={{ minHeight: "80vh" }}>
            <FontAwesomeIcon icon="fa-solid fa-list-check" size="3x" className="text-primary mb-3" />
            <h1 className="fw-bold text-uppercase">Task Management App</h1>
            <p className="text-muted">Organize your tasks, stay focused, and build discipline.</p>
        </div>
    )
}