import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { supabase } from "../services/supabase";

type UserProfile = {
  id: string;
  nome: string;
  cognome: string;
  data_nascita: string;
  citta: string;
  regione: string;
  stato: string;
  telefono: string;
  email: string;
};

type AuthContextType = {
  user: UserProfile | null;
  loading: boolean;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Controlla la sessione attiva
    const fetchUser = async () => {
      setLoading(true);
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session?.user) {
        await loadUserProfile(session.user.id, session.user.email ?? "");
      } else {
        setUser(null);
      }
      setLoading(false);
    };

    fetchUser();

    // Listener per login/logout
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        loadUserProfile(session.user.id, session.user.email ?? "");
      } else {
        setUser(null);
      }
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  const loadUserProfile = async (id: string, email: string) => {
    const { data, error } = await supabase.from("profiles").select("*").eq("id", id).single();

    if (!error && data) {
      setUser({ ...data, email });
    } else {
      // fallback con solo dati base
      setUser({ id, email, nome: "", cognome: "", data_nascita: "", citta: "", regione: "", stato: "", telefono: "" });
    }
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve essere usato dentro AuthProvider");
  }
  return context;
}
