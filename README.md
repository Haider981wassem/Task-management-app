# 📑 Task Management App (MERN Stack)

> Organize your tasks, stay focused, and build discipline.

A full-stack task management web application built with the MERN stack. Users can sign up, log in, and manage their personal tasks organized by categories like Work, Personal, and Learning. Each user has their own private task list with complete CRUD operations, favorite marking, and profile image upload — all secured with JWT authentication.

---

## 🚀 Features

- 🔐 **User Authentication** — Secure Signup/Login with JWT
- 📝 **Task Management** — Create, Edit, Delete Tasks
- ⭐ **Favorites** — Mark tasks as favorite
- 🗂️ **Categories** — Work, Personal, Learning
- 🖼️ **Profile Image Upload** — Multer based file upload
- 👤 **Profile Page** — View user info
- 🔒 **Protected Routes** — Only logged-in users can access tasks
- 💾 **Persistent Login** — Stay logged in after page refresh
- 📱 **Responsive Design** — Built with React Bootstrap

---

## 🛠️ Tech Stack

| Frontend | Backend |
|----------|---------|
| React.js (Vite) | Node.js |
| Redux Toolkit | Express.js |
| React Bootstrap | MongoDB |
| React Router DOM | Mongoose |
| Axios | JWT Authentication |
| FontAwesome Icons | Bcrypt (Password Hashing) |
| | Multer (Image Upload) |

---

## 📂 Project Structure

```
task-management-app/
│
├── Frontend/                    # React Frontend (Vite)
│   └── src/
│       ├── components/
│       │   ├── Auth/            # LoginModal, SignupModal
│       │   ├── Navbar/          # PublicNavbar, PrivateNavbar
│       │   └── Task/            # TaskCard, AddTaskModal, EditTaskModal
│       │                        # DeleteConfirm, LogoutConfirm
│       ├── layouts/             # PublicLayout, PrivateLayout
│       ├── pages/               # LandingPage, AllTaskPage, FavoritePage
│       │                        # WorkPage, PersonalPage, LearningPage
│       │                        # ProfilePage, NotFound
│       ├── redux/               # authSlice, taskSlice, store
│       ├── services/            # api.js (axios instance + interceptor)
│       ├── App.jsx              # Routes
│       └── main.jsx             # Entry point
│
├── Backend/                     # Node/Express Backend
│   ├── Config/                  # db.js, upload.js
│   ├── Controllers/             # User, Task, Categories, Status
│   ├── Middleware/              # authMiddleware.js (JWT)
│   ├── Models/                  # User, Task, Categories, Status
│   ├── Routes/                  # User, Task, Categories, Status
│   ├── uploads/                 # Uploaded profile images
│   └── server.js                # Main server file
│
└── README.md
```

---

## ⚙️ Environment Variables

Create a `.env` file inside the `Backend/` folder and add:

```
DB_URL=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=4150
```

---

## ▶️ Run Locally

### 1️⃣ Clone the repository
```bash
git clone https://github.com/Haider981wassem/Task-management-app.git
```

### 2️⃣ Install dependencies

📂 Backend
```bash
cd Backend
npm install
```

📂 Frontend
```bash
cd Frontend
npm install
```

### 3️⃣ Start the app

📂 Backend
```bash
npm run dev
```

📂 Frontend
```bash
npm run dev
```

---

## 🎯 Key Highlights

- Clean and modular architecture
- Reusable components (TaskCard used across all pages)
- RESTful API design
- Secure JWT authentication
- User-specific tasks (each user sees only their own data)
- Persistent login via localStorage + Redux Toolkit
- Image upload with Multer

---

## 👨‍💻 Author

**Muhammad Haider Waseem**  
GitHub: [@Haider981wassem](https://github.com/Haider981wassem)

---

## ⭐ Support

If you like this project, give it a star ⭐ on GitHub!
