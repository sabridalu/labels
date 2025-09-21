import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Dashboard() {
  const { user, logout } = useAuth();

  if (!user) return <p>Devi fare login per accedere alla dashboard.</p>;

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Ciao {user.nome || user.email} 👋</h1>
      <p>Seleziona una sezione:</p>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "10px", marginTop: "20px" }}>
        <Link to="/profile"><button>Profilo</button></Link>
        <Link to="/create-label"><button>Crea Etichetta</button></Link>
        <Link to="/normativa"><button>Normative</button></Link>
      </div>
      <div style={{ marginTop: "20px" }}>
        <button onClick={logout}>Logout</button>
      </div>
    </div>
  );
}

export default Dashboard;
