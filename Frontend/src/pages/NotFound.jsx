import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

export default function NotFound() {
    const navigate = useNavigate()
    return (
        <div className="d-flex flex-column justify-content-center align-items-center" style={{height: "100vh"}}>
            <h1>404</h1>
            <h4>Page Not Found</h4>
            <Button variant="primary" onClick={() => navigate('/')}>Go Home</Button>
        </div>
    )
}