import { Routes, Route, Link } from 'react-router-dom';
import CreateLabel from './pages/CreateLabel';
import Login from './pages/Login';
import Normativa from './pages/Nomrativa';
import Register from './pages/Register';


function App() {
  return (
    <div>
      <nav style={{ padding: '10px', background: '#f4f4f4' }}>
        <Link to="/">Login</Link> |{" "}
        <Link to="/register">Register</Link> |{" "}
        <Link to="/create-label">Crea Etichetta</Link> |{" "}
        <Link to="/normativa">Normativa</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/create-label" element={<CreateLabel />} />
        <Route path="/normativa" element={<Normativa />} />
      </Routes>
    </div>
  );
}

export default App;
