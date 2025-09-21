import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";

function Home() {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/dashboard"); // se già loggato, vai direttamente alla dashboard
    }
  }, [user, navigate]);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Benvenuto su Shipping Labels</h1>
      <p>Accedi o crea un account per continuare</p>
      <div style={{ marginTop: "20px" }}>
        <Link to="/login">
          <button style={{ marginRight: "10px" }}>Login</button>
        </Link>
        <Link to="/register">
          <button>Registrati</button>
        </Link>
      </div>
    </div>
  );
}

export default Home;
