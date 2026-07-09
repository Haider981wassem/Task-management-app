import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Row, Col } from "react-bootstrap"
import api from "../services/api"
import { setTasks } from "../redux/taskSlice"
import TaskCard from "../components/Task/TaskCard"

export default function PersonalPage() {
    const dispatch = useDispatch()
    const tasks = useSelector(state => state.task.tasks)
    const personalTasks = tasks.filter(t => t.categoryId?.Name === "Personal")

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
                <FontAwesomeIcon icon="fa-solid fa-user-plus" className="me-2 text-primary" />
                <span className="fw-semibold text-primary">PERSONAL</span>
            </div>
            {personalTasks.length === 0 ? (
                <div className="d-flex flex-column justify-content-center align-items-center" style={{ minHeight: "80vh" }}>
                    <FontAwesomeIcon icon="fa-solid fa-user-plus" size="3x" className="text-muted mb-3" />
                    <h5>No personal tasks yet</h5>
                </div>
            ) : (
                <Row className="p-3">
                    {personalTasks.map(task => (
                        <Col md={4} key={task._id} className="mb-3">
                            <TaskCard task={task} />
                        </Col>
                    ))}
                </Row>
            )}
        </>
    )
}