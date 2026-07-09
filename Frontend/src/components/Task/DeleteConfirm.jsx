import { Modal, Button } from "react-bootstrap"

export default function DeleteConfirm({ show, onClose, onConfirm }) {
    return (
        <Modal show={show} onHide={onClose}>
            <Modal.Header>
                <Modal.Title>Confirm Delete</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                "Are you sure you want to permanently delete this task from Tasker?"
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>CANCEL</Button>
                <Button variant="primary" onClick={onConfirm}>DELETE</Button>
            </Modal.Footer>
        </Modal>
    )
}