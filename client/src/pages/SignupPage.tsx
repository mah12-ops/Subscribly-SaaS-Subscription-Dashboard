// src/pages/SignupPage.tsx
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import FormInput from "../components/FormInput";

const signupSchema = z
  .object({
    name: z.string().min(2, "Name is required"),
    email: z.string().email("Invalid email"),
    password: z.string().min(6, "Password must be at least 6 chars"),
    confirmPassword: z.string().min(6, "Confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type SignupForm = z.infer<typeof signupSchema>;

export default function SignupPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupForm>({
    resolver: zodResolver(signupSchema),
  });

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const onSubmit = async (formData: SignupForm) => {
    try {
      setLoading(true);
      setErrorMsg("");

      const res = await axios.post(
        "http://localhost:8080/api/auth/signup",
        formData,
        { withCredentials: true }
      );

      console.log("✅ Signup success:", res.data);
      navigate("/dashboard"); // go to dashboard
    } catch (err: any) {
      console.error("❌ Signup error:", err.response?.data || err.message);
      setErrorMsg(err.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-h-full w-full  flex justify-center items-center bg-gradient-to-br from-primary-dark to-dark overflow-hidden ">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white/10 backdrop-blur-md p-6 md:p-8 rounded-2xl shadow-2xl w-full max-w-md border border-white/20"
      >
        {/* Greeting */}
        <h2 className="text-3xl font-extrabold mb-2 text-center bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          Create your account
        </h2>
        <p className="text-gray-300 text-center mb-6">
          Start managing subscriptions smarter
        </p>

        {/* Error */}
        {errorMsg && (
          <p className="text-red-400 text-sm text-center mb-3">{errorMsg}</p>
        )}

        {/* Inputs */}
        <FormInput
          label="Name"
          name="name"
          register={register}
          errors={errors}
          type="text"
          placeholder="Your Name"
        />

        <FormInput
          label="Email"
          name="email"
          register={register}
          errors={errors}
          type="email"
          placeholder="you@example.com"
        />

        <FormInput
          label="Password"
          name="password"
          register={register}
          errors={errors}
          type="password"
          placeholder="••••••••"
        />

        <FormInput
          label="Confirm Password"
          name="confirmPassword"
          register={register}
          errors={errors}
          type="password"
          placeholder="••••••••"
        />

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full mt-6 px-4 py-3 rounded-xl bg-primary hover:bg-primary-dark text-white font-semibold transition disabled:opacity-50"
        >
          {loading ? "Signing up..." : "Sign Up"}
        </button>

        {/* Social Signup */}
        <div className="mt-5 flex flex-col gap-3">
          <button
            type="button"
            className="w-full px-4 py-3 rounded-xl bg-white/10 text-white hover:bg-white/20 transition flex items-center justify-center gap-2"
          >
            <img
              src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg"
              alt="Google"
              className="w-5 h-5"
            />
            Sign up with Google
          </button>

          <button
            type="button"
            className="w-full px-4 py-3 rounded-xl bg-white/10 text-white hover:bg-white/20 transition flex items-center justify-center gap-2"
          >
            <img
              src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg"
              alt="GitHub"
              className="w-5 h-5"
            />
            Sign up with GitHub
          </button>
        </div>

        {/* Link to login */}
        <p className="mt-5 text-center text-gray-400 text-sm">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-indigo-400 hover:underline hover:text-indigo-300"
          >
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
