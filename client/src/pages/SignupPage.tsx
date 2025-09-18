// src/pages/SignupPage.jsx
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import FormInput from "../components/FormInput";
import axios from "axios";

const signupSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 chars"),
});

export default function SignupPage() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = (data:any) => {
    console.log("Signup data", data);
    axios.post("/api/auth/signup", data)
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-dark px-6">
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white/10 p-8 rounded-xl shadow-lg w-full max-w-md border border-white/20">
        <h2 className="text-2xl font-bold mb-6 text-center bg-gradient-to-r from-indigo-400 to-teal-400 bg-clip-text text-transparent">Sign Up</h2>
        <FormInput label="Name" name="name" register={register} errors={errors} placeholder="John Doe" />
        <FormInput label="Email" name="email" register={register} errors={errors} type="email" placeholder="you@example.com" />
        <FormInput label="Password" name="password" register={register} errors={errors} type="password" placeholder="••••••••" />
        <button className="w-full mt-4 px-4 py-2 rounded-lg bg-teal-500 hover:bg-teal-600 text-white font-semibold transition">Create Account</button>
      </form>
    </div>
  );
}
