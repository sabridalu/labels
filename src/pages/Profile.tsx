import { useAuth } from "../context/AuthContext";

function Profile() {
  const { user, loading, logout } = useAuth();

  if (loading) return <p>Caricamento...</p>;
  if (!user) return <p>Nessun utente loggato.</p>;

  return (
    <div>
      <h1>Profilo Utente</h1>
      <p><b>Nome:</b> {user.nome}</p>
      <p><b>Cognome:</b> {user.cognome}</p>
      <p><b>Data di nascita:</b> {user.data_nascita}</p>
      <p><b>Città:</b> {user.citta}</p>
      <p><b>Regione:</b> {user.regione}</p>
      <p><b>Stato:</b> {user.stato}</p>
      <p><b>Telefono:</b> {user.telefono}</p>
      <p><b>Email:</b> {user.email}</p>

      <button onClick={logout}>Logout</button>
    </div>
  );
}

export default Profile;
