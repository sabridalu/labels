import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { supabase } from "../services/supabase";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const schema = z.object({
  email: z.string().email("Email non valida"),
  password: z.string().min(6, "Password obbligatoria"),
});

type FormData = z.infer<typeof schema>;

function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });
  const [message, setMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  const onSubmit = async (data: FormData) => {
    const { error } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    });

    if (error) setMessage(error.message);
    else {
    setMessage("Login effettuato!");
    navigate("/dashboard"); // dopo login vai alla dashboard
    }
  };

  return (
 <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh" }}>
  <form onSubmit={handleSubmit(onSubmit)}>
    <h1>Login</h1>
    <input placeholder="Email" {...register("email")} />
    {errors.email && <p>{errors.email.message}</p>}

    <input type="password" placeholder="Password" {...register("password")} />
    {errors.password && <p>{errors.password.message}</p>}

    <button type="submit">Accedi</button>
    {message && <p>{message}</p>}
  </form>
</div>
  );
}

export default Login;
