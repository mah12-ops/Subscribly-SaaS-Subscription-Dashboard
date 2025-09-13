// src/pages/LoginPage.jsx
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import FormInput from "../components/FormInput";

const loginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 chars"),
});

export default function LoginPage() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data:any) => {
    console.log("Login data", data);
    // axios.post("/api/auth/login", data)
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-dark px-6">
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white/10 p-8 rounded-xl shadow-lg w-full max-w-md border border-white/20">
        <h2 className="text-2xl font-bold mb-6 text-center bg-gradient-to-r from-indigo-400 to-pink-400 bg-clip-text text-transparent">Login</h2>
        <FormInput label="Email" name="email" register={register} errors={errors} type="email" placeholder="you@example.com" />
        <FormInput label="Password" name="password" register={register} errors={errors} type="password" placeholder="••••••••" />
        <button className="w-full mt-4 px-4 py-2 rounded-lg bg-indigo-500 hover:bg-indigo-600 text-white font-semibold transition">Login</button>
      </form>
    </div>
  );
}
