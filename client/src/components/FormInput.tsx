// src/components/FormInput.jsx
export default function FormInput({ label, register, name, errors, type="text", placeholder }:any) {
  return (
    <div className="mb-4 text-left">
      <label className="block mb-1 text-gray-300">{label}</label>
      <input
        {...register(name)}
        type={type}
        placeholder={placeholder}
        className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
      {errors[name] && <p className="text-red-400 text-sm mt-1">{errors[name].message}</p>}
    </div>
  );
}
