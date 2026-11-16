import { Navigate, Route, Routes } from "react-router-dom";
import AdminRoute from "./components/AdminRoute";
import AppShell from "./components/AppShell";
import ProtectedRoute from "./components/ProtectedRoute";
import TestRunner from "./components/TestRunner";
import AdminPanel from "./pages/AdminPanel";
import CodingList from "./pages/CodingList";
import CodingProblem from "./pages/CodingProblem";
import Contact from "./pages/Contact";
import Dashboard from "./pages/Dashboard";
import Feedback from "./pages/Feedback";
import ForgotPassword from "./pages/ForgotPassword";
import History from "./pages/History";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import MockTests from "./pages/MockTests";
import Practice from "./pages/Practice";
import Profile from "./pages/Profile";
import ResetPassword from "./pages/ResetPassword";
import ResumeUpload from "./pages/ResumeUpload";
import Signup from "./pages/Signup";
import Workflow from "./pages/Workflow";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/workflow" element={<Workflow />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/assessment" element={<TestRunner assessment />} />
        <Route path="/app" element={<AppShell />}>
          <Route index element={<Navigate to="/app/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="resume" element={<ResumeUpload />} />
          <Route path="practice" element={<Practice />} />
          <Route path="mock-tests" element={<MockTests />} />
          <Route path="coding" element={<CodingList />} />
          <Route path="coding/:id" element={<CodingProblem />} />
          <Route path="feedback" element={<Feedback />} />
          <Route path="history" element={<History />} />
          <Route path="profile" element={<Profile />} />
          <Route element={<AdminRoute />}>
            <Route path="admin" element={<AdminPanel />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}
