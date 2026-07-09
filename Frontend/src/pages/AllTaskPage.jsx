import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Button, Row, Col } from "react-bootstrap"
import api from "../services/api"
import { setTasks, setLoading } from "../redux/taskSlice"
import TaskCard from "../components/Task/TaskCard"
import Loader from "../components/Loaders"
import AddTaskModal from "../components/Task/AddTaskModal"

export default function AllTasksPage() {
    const dispatch = useDispatch()
    const tasks = useSelector(state => state.task.tasks)
    const loading = useSelector(state => state.task.loading)
    const [showAddTask, setShowAddTask] = useState(false)

    useEffect(() => {
        async function fetchTasks() {
            dispatch(setLoading(true))
            const res = await api.get('/tasks')
            dispatch(setTasks({ tasks: res.data }))
            dispatch(setLoading(false))
        }
        fetchTasks()
    }, [])

    if (loading) return <Loader />

    return (
        <>
            <div className="border-bottom p-3">
                <FontAwesomeIcon icon="fa-solid fa-list-check" className="me-2 text-primary" />
                <span className="fw-semibold text-primary">ALL TASK</span>
            </div>

            {tasks.length === 0 ? (
                <div className="d-flex flex-column justify-content-center align-items-center" style={{ minHeight: "80vh" }}>
                    <FontAwesomeIcon icon="fa-solid fa-list" size="3x" className="text-muted mb-3" />
                    <h5>No tasks yet</h5>
                    <p className="text-muted">Get started by creating your first task!</p>
                    <Button variant="primary" onClick={() => setShowAddTask(true)}>
                        <FontAwesomeIcon icon="fa-solid fa-plus" className="me-2" />
                        Create Your First Task
                    </Button>
                </div>
            ) : (
                <Row className="p-3">
                    {tasks.map(task => (
                        <Col md={4} key={task._id} className="mb-3">
                            <TaskCard task={task} />
                        </Col>
                    ))}
                </Row>
            )}

            <AddTaskModal
                show={showAddTask}
                onClose={() => setShowAddTask(false)}
            />
        </>
    )
}