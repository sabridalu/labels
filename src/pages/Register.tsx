import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { supabase } from "../services/supabase";
import { useState } from "react";

const schema = z.object({
  nome: z.string().min(2, "Inserisci il nome"),
  cognome: z.string().min(2, "Inserisci il cognome"),
  data_nascita: z.string().date("Inserisci una data valida"),
  citta: z.string().min(2, "Inserisci la città"),
  regione: z.string().min(2, "Inserisci la regione"),
  stato: z.string().min(2, "Inserisci lo stato"),
  telefono: z.string().min(6, "Inserisci un telefono valido"),
  email: z.string().email("Email non valida"),
  password: z.string().min(6, "La password deve avere almeno 6 caratteri"),
});

type FormData = z.infer<typeof schema>;

function Register() {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });
  const [message, setMessage] = useState<string | null>(null);

  const onSubmit = async (data: FormData) => {
    // 1. Crea l'utente in Supabase Auth
    const { data: authData, error: signUpError } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
    });

    if (signUpError) {
      setMessage(signUpError.message);
      return;
    }

    // 2. Inserisci i dati extra nella tabella profiles
    if (authData.user) {
      const { error: profileError } = await supabase.from("profiles").insert({
        id: authData.user.id,
        nome: data.nome,
        cognome: data.cognome,
        data_nascita: data.data_nascita,
        citta: data.citta,
        regione: data.regione,
        stato: data.stato,
        telefono: data.telefono,
      });

      if (profileError) {
        setMessage("Utente registrato ma errore nel salvataggio del profilo.");
        return;
      }
    }

    setMessage("Registrazione completata! Controlla la tua email per confermare l'account.");
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh" }}>
      <h1>Registrazione</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input placeholder="Nome" {...register("nome")} />
        {errors.nome && <p>{errors.nome.message}</p>}

        <input placeholder="Cognome" {...register("cognome")} />
        {errors.cognome && <p>{errors.cognome.message}</p>}

        <input type="date" placeholder="Data di nascita" {...register("data_nascita")} />
        {errors.data_nascita && <p>{errors.data_nascita.message}</p>}

        <input placeholder="Città" {...register("citta")} />
        {errors.citta && <p>{errors.citta.message}</p>}

        <input placeholder="Regione" {...register("regione")} />
        {errors.regione && <p>{errors.regione.message}</p>}

        <input placeholder="Stato" {...register("stato")} />
        {errors.stato && <p>{errors.stato.message}</p>}

        <input placeholder="Telefono" {...register("telefono")} />
        {errors.telefono && <p>{errors.telefono.message}</p>}

        <input placeholder="Email" {...register("email")} />
        {errors.email && <p>{errors.email.message}</p>}

        <input type="password" placeholder="Password" {...register("password")} />
        {errors.password && <p>{errors.password.message}</p>}

        <button type="submit">Registrati</button>
      </form>
      {message && <p>{message}</p>}
    </div>
    
  );
}

export default Register;
