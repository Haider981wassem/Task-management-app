import { useState } from "react";
import { toast } from 'react-toastify';
import { Modal, Form, Button, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import api from "../../services/api";

export default function SignupModal({ show, onClose }) {
    const [formData, setFormData] = useState({
        FullName: '',
        Email: '',
        Password: '',
        Contact: '',
        Image: null
    })
    const [showPassword, setShowPassword] = useState(false)
    const [errors, setErrors] = useState({})

    function handleChange(e) {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    function handleUploads(e) {
        setFormData({ ...formData, Image: e.target.files[0] })
    }

    function validate() {
        const newError = {}
        if (!formData.FullName) newError.FullName = "filled is required"
        if (!formData.Email) newError.Email = "Email is required"
        if (!formData.Password) newError.Password = "Password is required"
        if (!formData.Contact) newError.Contact = "Filled is required"
        setErrors(newError);
        if (newError.FullName || newError.Email || newError.Password || newError.Contact) return false
        return true
    }

    async function handleSubmit(e) {
        e.preventDefault()
        if (!validate()) return
        try {
            const data = new FormData()
            data.append('FullName', formData.FullName)
            data.append('Email', formData.Email)
            data.append('Password', formData.Password)
            data.append('Contact', formData.Contact)
            if (formData.Image) data.append('Image', formData.Image)

            await api.post('/users/signup', data)
            toast.success("Signup successful!")
            onClose()
        } catch (err) {
            setErrors({ api: "Signup failed" })
        }
    }

    return (
        <Modal show={show} onHide={onClose}>
            <Modal.Header className="bg-primary text-white">
                <Modal.Title>Signup</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    {errors.api && <div className="alert alert-danger">{errors.api}</div>}
                    <Form.Group className="mb-3">
                        <Form.Control type="text" name="FullName" placeholder="Full Name" onChange={handleChange} />
                        {errors.FullName && <Form.Text className="text-danger">{errors.FullName}</Form.Text>}
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <div className="d-flex align-items-center border rounded px-2">
                            <Form.Control type="email" name="Email" placeholder="Email" onChange={handleChange} className="border-0 shadow-none" />
                        </div>
                        {errors.Email && <Form.Text className="text-danger">{errors.Email}</Form.Text>}
                    </Form.Group>

                    <Row className="mb-3">
                        <Col>
                            <div className="d-flex align-items-center border rounded px-2">
                                <Form.Control
                                    type={showPassword ? "text" : "password"}
                                    name="Password"
                                    placeholder="Password"
                                    onChange={handleChange}
                                    className="border-0 shadow-none"
                                />
                                <span onClick={() => setShowPassword(!showPassword)} style={{ cursor: "pointer" }}>
                                    <FontAwesomeIcon icon={showPassword ? "fa-solid fa-eye-slash" : "fa-solid fa-eye"} />
                                </span>
                            </div>
                            {errors.Password && <Form.Text className="text-danger">{errors.Password}</Form.Text>}
                        </Col>
                        <Col>
                            <Form.Control type="text" name="Contact" placeholder="Contact" onChange={handleChange} />
                            {errors.Contact && <Form.Text className="text-danger">{errors.Contact}</Form.Text>}
                        </Col>
                    </Row>

                    <Form.Group className="mb-3">
                        <input type="file" id="fileUpload" hidden onChange={handleUploads} />
                        <Button variant="primary" onClick={() => document.getElementById('fileUpload').click()}>
                            <FontAwesomeIcon icon="fa-solid fa-cloud-arrow-up" className="me-2" />
                            UPLOAD FILE
                        </Button>
                    </Form.Group>

                    <div className="d-flex justify-content-end gap-2">
                        <Button variant="link" onClick={onClose}>CANCEL</Button>
                        <Button variant="primary" type="submit">
                            <FontAwesomeIcon icon="fa-solid fa-floppy-disk" className="me-2" />
                            SUBMIT
                        </Button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    )
}