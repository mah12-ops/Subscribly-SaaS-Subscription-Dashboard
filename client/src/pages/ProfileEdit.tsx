"use client";
import { useQuery } from "@apollo/client/react";
import { GET_ME, type Me } from "../lib/api";
 // use the correct client file

export default function Profile() {
  const { data, loading, error } = useQuery<{ me: Me | null }>(GET_ME);

  if (loading) return <p className="text-gray-400 p-6">Loading profile...</p>;
  if (error)
    return (
      <p className="text-red-500 p-6">
        Error fetching profile: {error.message}
      </p>
    );
  if (!data?.me) return <p className="text-gray-400 p-6">Not authenticated</p>;

  const me = data.me;

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-pulse">
        Your Profile
      </h1>

      <div className="bg-gray-900 p-6 rounded-xl shadow text-white flex flex-col gap-4 max-w-md">
        <img
          src={me.avatar || "/default-avatar.png"}
          alt="Avatar"
          className="w-24 h-24 rounded-full"
        />
        <p>
          <span className="font-semibold">Name:</span> {me.name}
        </p>
        <p>
          <span className="font-semibold">Email:</span> {me.email}
        </p>
        <p>
          <span className="font-semibold">Role:</span> {me.role}
        </p>
        <button className="mt-4 px-4 py-2 bg-emerald-600 rounded hover:bg-emerald-700 transition">
          Edit Profile
        </button>
      </div>
    </div>
  );
}
