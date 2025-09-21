import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Dashboard() {
  const { user, logout } = useAuth();

  if (!user) {
    return <p>Devi fare login per accedere alla dashboard.</p>;
  }

  return (
    <div style={{ textAlign: "center", marginTop: "30px" }}>
      <h1>Ciao {user.nome || user.email} 👋</h1>
      <p>Seleziona una sezione:</p>
      <nav style={{ marginTop: "20px" }}>
        <Link to="/profile"><button style={{ margin: "5px" }}>Profilo</button></Link>
        <Link to="/create-label"><button style={{ margin: "5px" }}>Crea Etichetta</button></Link>
        <Link to="/normativa"><button style={{ margin: "5px" }}>Normative</button></Link>
      </nav>
      <div style={{ marginTop: "20px" }}>
        <button onClick={logout}>Logout</button>
      </div>
    </div>
  );
}

export default Dashboard;
