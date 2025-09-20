// // src/pages/LoginPage.jsx
// import { useForm } from "react-hook-form";
// import { z } from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";
// import axios from "axios";
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import FormInput from "../components/FormInput";

// const loginSchema = z.object({
//   email: z.string().email("Invalid email"),
//   password: z.string().min(6, "Password must be at least 6 chars"),
// });

// export default function LoginPage() {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm({
//     resolver: zodResolver(loginSchema),
//   });

//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(false);
//   const [errorMsg, setErrorMsg] = useState("");

//   const onSubmit = async (formData:any) => {
//     try {
//       setLoading(true);
//       setErrorMsg("");

//       const res = await axios.post(
//         "http://localhost:8080/api/auth/login",
//         formData,
//         { withCredentials: true }
//       );

//       console.log("✅ Login success:", res.data);

//       // Navigate after success
//       navigate("/dashboard");
//     } catch (err:any) {
//       console.error("❌ Login error:", err.response?.data || err.message);
//       setErrorMsg(err.response?.data?.message || "Invalid email or password");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-primary-dark to-dark px-6">
//       <form
//         onSubmit={handleSubmit(onSubmit)}
//         className="bg-white/10 backdrop-blur-md p-8 rounded-2xl shadow-2xl w-full max-w-md border border-white/20"
//       >
//         <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
//           Welcome Back
//         </h2>

//         {errorMsg && (
//           <p className="text-red-400 text-sm text-center mb-3">{errorMsg}</p>
//         )}

//         <FormInput
//           label="Email"
//           name="email"
//           register={register}
//           errors={errors}
//           type="email"
//           placeholder="you@example.com"
//         />

//         <FormInput
//           label="Password"
//           name="password"
//           register={register}
//           errors={errors}
//           type="password"
//           placeholder="••••••••"
//         />

//         <button
//           type="submit"
//           disabled={loading}
//           className="w-full mt-6 px-4 py-3 rounded-xl bg-primary hover:bg-primary-dark text-white font-semibold transition disabled:opacity-50"
//         >
//           {loading ? "Logging in..." : "Login"}
//         </button>
//       </form>
//     </div>
//   );
// }
