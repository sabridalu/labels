import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";

function Home() {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) navigate("/dashboard");
  }, [user, navigate]);

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Shipping Labels</h1>
      <p style={{ marginBottom: "20px" }}>
        Accedi o crea un account per continuare
      </p>
      <div>
        <Link to="/login"><button>Login</button></Link>
        <Link to="/register"><button>Registrati</button></Link>
      </div>
    </div>
  );
}

export default Home;
