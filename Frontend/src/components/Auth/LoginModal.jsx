import { useState } from "react";
import { toast } from 'react-toastify';
import { Modal, Form, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginSuccess } from "../../redux/authSlice";
import api from "../../services/api";

export default function LoginModal({ show, onClose }) {
    const [formData, setFormData] = useState({
        Email: '',
        Password: ''
    })
    const [showPassword, setShowPassword] = useState(false)
    const [errors, setErrors] = useState({});
    const dispatch = useDispatch();
    const navigate = useNavigate();


    function handleChange(e) {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    function validate(){
        const newError = {}
        if(!formData.Email) newError.Email = "Email is required"
        if(!formData.Password) newError.Password = "Password is required"
        setErrors(newError);
        if(newError.Email || newError.Password) return false
        return true
    }

    async function handleSubmit(e) {
        e.preventDefault()
        if (!validate()) return
        try {
            const res = await api.post('/users/login', formData);
            dispatch(loginSuccess({
                user: res.data.data,
                token: res.data.token
            }))
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('user', JSON.stringify(res.data.data));
            toast.success("Login successful!")
            onClose();
            navigate('/tasks');
        } catch (err) {
            setErrors({api: "invalid email or password"})
        }
    }

    return (
        <Modal show={show} onHide={onClose}>
            <Modal.Header className="bg-primary text-white">
                <Modal.Title>Login</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    {errors.api && <div className="alert alert-danger">{errors.api}</div>}
                    <Form.Group className="mb-3">
                        <div className="d-flex align-items-center border rounded px-2">
                            <Form.Control type="email" name="Email" placeholder="Email" onChange={handleChange} className="border-0 shadow-none" />
                        </div>
                        {errors.Email && <Form.Text className="text-danger">{errors.Email}</Form.Text>}
                    </Form.Group>

                    <Form.Group className="mb-3">
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