// src/components/Sidebar.tsx
import { NavLink } from "react-router-dom";

const links = [
  { name: "Dashboard", path: "/dashboard" },
  { name: "Plans", path: "/dashboard/plans" },
  { name: "Subscriptions", path: "/dashboard/subscriptions" },
  { name: "Invoices", path: "/dashboard/invoices" },
  { name: "Admin Panel", path: "/dashboard/admin", adminOnly: true },
  { name: "Profile", path: "/dashboard/profile" },
];

interface SidebarProps {
  role?: string;
}

export default function Sidebar({ role }: SidebarProps) {
  return (
    <div className="w-64 h-screen bg-black text-white flex flex-col p-6 space-y-6">
      <h1 className="text-2xl font-bold text-gradient">Subscribely</h1>
      <nav className="flex flex-col gap-3">
        {links.map((link) => {
          if (link.adminOnly && role !== "ADMIN") return null;
          return (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) =>
                `px-3 py-2 rounded hover:bg-gray-800 ${
                  isActive ? "bg-gray-900 text-emerald-400" : ""
                }`
              }
            >
              {link.name}
            </NavLink>
          );
        })}
      </nav>
    </div>
  );
}
