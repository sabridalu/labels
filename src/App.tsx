import { Routes, Route } from "react-router-dom";
import CreateLabel from "./pages/CreateLabel";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Normativa from "./pages/Nomrativa";
import Profile from "./pages/Profile";
import Register from "./pages/Register";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/create-label" element={<CreateLabel />} />
      <Route path="/normativa" element={<Normativa />} />
    </Routes>
  );
}

export default App;
