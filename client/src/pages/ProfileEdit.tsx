import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client/react";
import { GET_ME, UPDATE_PROFILE, type Me } from "../lib/api";

export default function ProfileEdit() {
  const { data, loading, error, refetch } = useQuery<{ me: Me | null }>(GET_ME);
  const [updateProfile, { loading: updating }] = useMutation(UPDATE_PROFILE);
  
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    avatar: "",
  });
  const [message, setMessage] = useState("");

  React.useEffect(() => {
    if (data?.me) {
      setFormData({
        name: data.me.name,
        avatar: data.me.avatar || "",
      });
    }
  }, [data]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    
    try {
      await updateProfile({
        variables: {
          name: formData.name !== data?.me?.name ? formData.name : undefined,
          avatar: formData.avatar !== (data?.me?.avatar || "") ? formData.avatar : undefined,
        },
      });
      
      setMessage("Profile updated successfully!");
      setIsEditing(false);
      refetch();
    } catch (err: any) {
      setMessage(`Error: ${err.message}`);
    }
  };

  const handleCancel = () => {
    if (data?.me) {
      setFormData({
        name: data.me.name,
        avatar: data.me.avatar || "",
      });
    }
    setIsEditing(false);
    setMessage("");
  };

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
        {isEditing ? "Edit Profile" : "Your Profile"}
      </h1>

      {message && (
        <div className={`p-4 rounded-lg ${
          message.includes("Error") 
            ? "bg-red-900/50 text-red-300 border border-red-700" 
            : "bg-green-900/50 text-green-300 border border-green-700"
        }`}>
          {message}
        </div>
      )}

      <div className="bg-gray-900 p-6 rounded-xl shadow text-white max-w-md">
        {!isEditing ? (
          // Display Mode
          <div className="flex flex-col gap-4">
            <img
              src={me.avatar || "/default-avatar.png"}
              alt="Avatar"
              className="w-24 h-24 rounded-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "/default-avatar.png";
              }}
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
            <button 
              onClick={() => setIsEditing(true)}
              className="mt-4 px-4 py-2 bg-indigo-600 rounded hover:bg-indigo-700 transition"
            >
              Edit Profile
            </button>
          </div>
        ) : (
          // Edit Mode
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col items-center gap-4">
              <img
                src={formData.avatar || "/default-avatar.png"}
                alt="Avatar Preview"
                className="w-24 h-24 rounded-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "/default-avatar.png";
                }}
              />
              <div className="w-full">
                <label className="block text-sm font-medium mb-2">Avatar URL:</label>
                <input
                  type="url"
                  name="avatar"
                  value={formData.avatar}
                  onChange={handleInputChange}
                  placeholder="https://example.com/avatar.jpg"
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Name:</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Email:</label>
              <input
                type="email"
                value={me.email}
                disabled
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-gray-400 cursor-not-allowed"
              />
              <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Role:</label>
              <input
                type="text"
                value={me.role}
                disabled
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-gray-400 cursor-not-allowed"
              />
            </div>

            <div className="flex gap-2 mt-4">
              <button
                type="submit"
                disabled={updating}
                className="flex-1 px-4 py-2 bg-emerald-600 rounded hover:bg-emerald-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {updating ? "Saving..." : "Save Changes"}
              </button>
              <button
                type="button"
                onClick={handleCancel}
                disabled={updating}
                className="flex-1 px-4 py-2 bg-gray-600 rounded hover:bg-gray-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Subscription Info */}
      {me.subscriptions && me.subscriptions.length > 0 && (
        <div className="bg-gray-900 p-6 rounded-xl shadow text-white max-w-md">
          <h2 className="text-xl font-semibold mb-4">Active Subscriptions</h2>
          {me.subscriptions.map((sub) => (
            <div key={sub.id} className="border-b border-gray-700 pb-2 mb-2 last:border-b-0 last:mb-0">
              <p><span className="font-medium">Plan:</span> {sub.plan?.name}</p>
              <p><span className="font-medium">Status:</span> 
                <span className={`ml-2 ${
                  sub.status === "ACTIVE" ? "text-green-400" : "text-red-400"
                }`}>
                  {sub.status}
                </span>
              </p>
              {sub.plan?.price && (
                <p><span className="font-medium">Price:</span> ${sub.plan.price}/{sub.plan.interval?.toLowerCase()}</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
