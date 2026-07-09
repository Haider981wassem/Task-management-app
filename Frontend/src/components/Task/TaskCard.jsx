import { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Card } from "react-bootstrap"
import { useDispatch } from "react-redux"
import api from "../../services/api"
import { setTasks } from "../../redux/taskSlice"
import EditTaskModal from "./EditTaskModal"
import DeleteConfirm from "./DeleteConfirm"

export default function TaskCard({ task }) {
    const dispatch = useDispatch()
    const [showEdit, setShowEdit] = useState(false)
    const [showDelete, setShowDelete] = useState(false)

    const formattedDate = new Date(task.DueDate).toLocaleDateString('en-US', {
        month: 'long', day: 'numeric', year: 'numeric'
    })

    async function handleDelete() {
        await api.delete(`/tasks/${task._id}`)
        const res = await api.get('/tasks')
        dispatch(setTasks({ tasks: res.data }))
        setShowDelete(false)
    }

    async function handleFavorite() {
        await api.put(`/tasks/${task._id}/favorite`)
        const res = await api.get('/tasks')
        dispatch(setTasks({ tasks: res.data }))
    }

    return (
        <>
            <Card style={{ borderLeft: "4px solid orange" }}>
                <Card.Body>
                    <Card.Title>{task.Title}</Card.Title>
                    <div className="text-muted small mb-2">
                        <FontAwesomeIcon icon="fa-regular fa-calendar" className="me-1 text-warning" />
                        {formattedDate}
                        <FontAwesomeIcon icon="fa-regular fa-clock" className="ms-3 me-1 text-warning" />
                        {task.DueTime}
                    </div>
                    <Card.Text className="text-muted small">{task.Description}</Card.Text>
                    <div className="d-flex justify-content-between small mb-2">
                        <span>
                            <FontAwesomeIcon icon="fa-regular fa-circle" className="me-1 text-warning" />
                            Progress: {task.Progress}%
                        </span>
                        <span>
                            <FontAwesomeIcon icon="fa-regular fa-clipboard" className="me-1 text-warning" />
                            Status: {task.statusId?.Name}
                        </span>
                    </div>
                    <div className="d-flex justify-content-between mt-2">
                        <div>
                            <FontAwesomeIcon icon="fa-solid fa-table-cells" className="me-3 text-muted" style={{ cursor: "pointer" }} onClick={() => setShowEdit(true)} />
                            <FontAwesomeIcon icon="fa-solid fa-trash" className="text-danger" style={{ cursor: "pointer" }} onClick={() => setShowDelete(true)} />
                        </div>
                        <FontAwesomeIcon
                            icon={task.isFavourite ? "fa-solid fa-star" : "fa-regular fa-star"}
                            style={{ cursor: "pointer", color: task.isFavourite ? "blue" : "gray" }}
                            onClick={handleFavorite}
                        />
                    </div>
                </Card.Body>
            </Card>

            <EditTaskModal
                show={showEdit}
                onClose={() => setShowEdit(false)}
                taskData={task}
            />
            <DeleteConfirm
                show={showDelete}
                onClose={() => setShowDelete(false)}
                onConfirm={handleDelete}
            />
        </>
    )
}