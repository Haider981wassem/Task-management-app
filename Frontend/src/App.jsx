import { Routes, Route } from "react-router-dom"
import PublicLayout from "./layouts/PublicLayout"
import PrivateLayout from "./layouts/PrivateLayout"
import LandingPage from "./pages/LandingPage"
import AllTasksPage from "./pages/AllTaskPage"
import FavoritePage from "./pages/FavoritePage"
import WorkPage from "./pages/WorkPage"
import PersonalPage from "./pages/PersonalPage"
import LearningPage from "./pages/LearningPage"
import ProfilePage from "./pages/ProfilePage"
import NotFound from "./pages/NotFound"

export default function App() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<LandingPage />} />
      </Route>

      <Route element={<PrivateLayout />}>
        <Route path="/tasks" element={<AllTasksPage />} />
        <Route path="/favorite" element={<FavoritePage />} />
        <Route path="/work" element={<WorkPage />} />
        <Route path="/personal" element={<PersonalPage />} />
        <Route path="/learning" element={<LearningPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}