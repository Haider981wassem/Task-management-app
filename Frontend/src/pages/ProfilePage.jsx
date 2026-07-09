import { useSelector } from 'react-redux'

export default function ProfilePage() {
    const user = useSelector(state => state.auth.user)

    return (
        <div className="container py-5">
            <h2 className="text-center fw-bold mb-5">Profile</h2>
            <div className="d-flex justify-content-center align-items-center gap-5">
                <img
                    src={`http://localhost:4150/uploads/${user?.Image}`}
                    alt={user?.FullName}
                    style={{ width: "250px", height: "300px", objectFit: "cover", borderRadius: "8px" }}
                />
                <div>
                    <p><strong>Name:</strong></p>
                    <p>{user?.FullName}</p>
                    <p><strong>Email:</strong></p>
                    <p>{user?.Email}</p>
                    <p><strong>Contact:</strong></p>
                    <p>{user?.Contact}</p>
                </div>
            </div>
        </div>
    )
}