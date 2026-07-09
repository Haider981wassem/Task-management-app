import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Row, Col } from "react-bootstrap"
import api from "../services/api"
import { setTasks } from "../redux/taskSlice"
import TaskCard from "../components/Task/TaskCard"

export default function LearningPage() {
    const dispatch = useDispatch()
    const tasks = useSelector(state => state.task.tasks)
    const learningTasks = tasks.filter(t => t.categoryId?.Name === "Learning")

    useEffect(() => {
        async function fetchTasks() {
            const res = await api.get('/tasks')
            dispatch(setTasks({ tasks: res.data }))
        }
        fetchTasks()
    }, [])

    return (
        <>
            <div className="border-bottom p-3">
                <FontAwesomeIcon icon="fa-solid fa-graduation-cap" className="me-2 text-primary" />
                <span className="fw-semibold text-primary">LEARNING</span>
            </div>
            {learningTasks.length === 0 ? (
                <div className="d-flex flex-column justify-content-center align-items-center" style={{ minHeight: "80vh" }}>
                    <FontAwesomeIcon icon="fa-solid fa-graduation-cap" size="3x" className="text-muted mb-3" />
                    <h5>No learning tasks yet</h5>
                </div>
            ) : (
                <Row className="p-3">
                    {learningTasks.map(task => (
                        <Col md={4} key={task._id} className="mb-3">
                            <TaskCard task={task} />
                        </Col>
                    ))}
                </Row>
            )}
        </>
    )
}