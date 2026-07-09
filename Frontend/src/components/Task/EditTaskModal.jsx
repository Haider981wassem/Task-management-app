import { useState, useEffect } from "react";
import { toast } from 'react-toastify';
import { useDispatch } from "react-redux"
import { Modal, Form, Button, Nav, Row, Col } from "react-bootstrap"
import api from "../../services/api"
import { setTasks } from "../../redux/taskSlice"

export default function EditTaskModal({ show, onClose, taskData }) {
    const dispatch = useDispatch()
    const [activeTab, setActiveTab] = useState('basic')
    const [categories, setCategories] = useState([])
    const [statuses, setStatuses] = useState([])
    const [formData, setFormData] = useState({
        Title: taskData?.Title || '',
        DueDate: taskData?.DueDate || '',
        DueTime: taskData?.DueTime || '',
        categoryId: taskData?.categoryId?._id || '',
        statusId: taskData?.statusId?._id || '',
        Progress: taskData?.Progress || 0,
        Description: taskData?.Description || ''
    })
    const [errors, setErrors] = useState({})

    useEffect(() => {
        async function fetchDropdowns() {
            const catRes = await api.get('/categories')
            setCategories(catRes.data)
            const statRes = await api.get('/status')
            setStatuses(statRes.data)
        }
        fetchDropdowns()
    }, [])

    useEffect(() => {
        setActiveTab('basic')
    }, [show])

    useEffect(() => {
        if (taskData) {
            setFormData({
                Title: taskData?.Title || '',
                DueDate: taskData?.DueDate || '',
                DueTime: taskData?.DueTime || '',
                categoryId: taskData?.categoryId?._id || '',
                statusId: taskData?.statusId?._id || '',
                Progress: taskData?.Progress || 0,
                Description: taskData?.Description || ''
            })
        }
    }, [taskData])

    function handleChange(e) {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    function validate() {
        const newError = {}
        if (!formData.Title) newError.Title = "Title is required"
        setErrors(newError)
        if (newError.Title) return false
        return true
    }

    async function handleSubmit(e) {
        e.preventDefault()
        if (!validate()) return
        try {
            await api.put(`/tasks/${taskData._id}`, formData)
            const res = await api.get('/tasks')
            dispatch(setTasks({ tasks: res.data }))
            toast.success("Edit successful!")
            onClose()
        } catch (err) {
            setErrors({ api: "Failed to update task" })
        }
    }

    return (
        <Modal show={show} onHide={onClose}>
            <Modal.Header className="bg-primary text-white">
                <Modal.Title>Edit Task</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Nav variant="tabs" className="mb-3">
                    <Nav.Item>
                        <Nav.Link active={activeTab === 'basic'} onClick={() => setActiveTab('basic')}>BASIC</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link active={activeTab === 'more'} onClick={() => setActiveTab('more')}>MORE</Nav.Link>
                    </Nav.Item>
                </Nav>
                <Form onSubmit={handleSubmit}>
                    {errors.api && <div className="alert alert-danger">{errors.api}</div>}
                    {activeTab === 'basic' && (
                        <>
                            <Form.Group className="mb-3">
                                <Form.Control type="text" name="Title" placeholder="Title" value={formData.Title} onChange={handleChange} />
                                {errors.Title && <Form.Text className="text-danger">{errors.Title}</Form.Text>}
                            </Form.Group>
                            <Row className="mb-3">
                                <Col>
                                    <Form.Control type="date" name="DueDate" value={formData.DueDate} onChange={handleChange} />
                                </Col>
                                <Col>
                                    <Form.Control type="time" name="DueTime" value={formData.DueTime} onChange={handleChange} />
                                </Col>
                            </Row>
                            <Row className="mb-3">
                                <Col>
                                    <Form.Select name="categoryId" value={formData.categoryId} onChange={handleChange}>
                                        <option value="">Category</option>
                                        {categories.map(cat => (
                                            <option key={cat._id} value={cat._id}>{cat.Name}</option>
                                        ))}
                                    </Form.Select>
                                </Col>
                                <Col>
                                    <Form.Select name="statusId" value={formData.statusId} onChange={handleChange}>
                                        <option value="">Status</option>
                                        {statuses.map(st => (
                                            <option key={st._id} value={st._id}>{st.Name}</option>
                                        ))}
                                    </Form.Select>
                                </Col>
                            </Row>
                            <div className="d-flex justify-content-end gap-2">
                                <Button variant="link" onClick={onClose}>CANCEL</Button>
                                <Button variant="primary" onClick={() => setActiveTab('more')}>NEXT</Button>
                            </div>
                        </>
                    )}
                    {activeTab === 'more' && (
                        <>
                            <Form.Group className="mb-3">
                                <Form.Label>Progress</Form.Label>
                                <Form.Select name="Progress" value={formData.Progress} onChange={handleChange}>
                                    <option value="0">0</option>
                                    <option value="25">25</option>
                                    <option value="50">50</option>
                                    <option value="75">75</option>
                                    <option value="100">100</option>
                                </Form.Select>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Control as="textarea" rows={4} name="Description" placeholder="Description" value={formData.Description} onChange={handleChange} />
                            </Form.Group>
                            <div className="d-flex justify-content-end gap-2">
                                <Button variant="link" onClick={onClose}>CANCEL</Button>
                                <Button variant="primary" type="submit">SAVE</Button>
                            </div>
                        </>
                    )}
                </Form>
            </Modal.Body>
        </Modal>
    )
}