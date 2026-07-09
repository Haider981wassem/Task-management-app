import { Modal, Button } from "react-bootstrap"
import { toast } from 'react-toastify';
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { logout } from "../../redux/authSlice"
import { clearTasks } from "../../redux/taskSlice"

export default function LogoutConfirm({ show, onClose }) {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    function handleLogout() {
        dispatch(logout())
        dispatch(clearTasks())
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        toast.success("Logout successful!")
        onClose()
        navigate('/')
    }

    return (
        <Modal show={show} onHide={onClose}>
            <Modal.Header>
                <Modal.Title>Confirm Logout</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Are you sure you want to logout from Tasker?
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>DISAGREE</Button>
                <Button variant="primary" onClick={handleLogout}>AGREE</Button>
            </Modal.Footer>
        </Modal>
    )
}