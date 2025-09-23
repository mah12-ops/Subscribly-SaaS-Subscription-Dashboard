// src/components/Sidebar.tsx
import { NavLink } from "react-router-dom";
import {
  HomeIcon,
  CreditCardIcon,
  ClipboardDocumentIcon,
  UserIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/solid";

interface LinkItem {
  name: string;
  path: string;
  adminOnly?: boolean;
  icon?: React.ComponentType<{ className?: string }>;
}

const links: LinkItem[] = [
  { name: "Dashboard", path: "/dashboard", icon: HomeIcon },
  { name: "Plans", path: "/dashboard/plans", icon: CreditCardIcon },
  { name: "Subscriptions", path: "/dashboard/subscriptions", icon: ClipboardDocumentIcon },
  { name: "Invoices", path: "/dashboard/invoices", icon: CreditCardIcon },
  { name: "Admin Panel", path: "/dashboard/admin", adminOnly: true, icon: ShieldCheckIcon },
  { name: "Profile", path: "/dashboard/profile", icon: UserIcon },
];

interface SidebarProps {
  role?: string;
}

export default function Sidebar({ role }: SidebarProps) {
  return (
    <aside className="w-64 h-screen bg-black  text-gray-400 flex flex-col p-6">
      <h1 className="text-2xl font-bold mb-10 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-pulse">
        Subscribely
      </h1>

      <nav className="flex flex-col gap-3 flex-1">
        {links.map((link) => {
          if (link.adminOnly && role !== "ADMIN") return null;
          return (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded hover:bg-gray-800 hover:text-white transition ${
                  isActive ? "bg-gray-900 text-purple-400" : ""
                }`
              }
            >
              {link.icon && <link.icon className="w-5 h-5" />}
              <span>{link.name}</span>
            </NavLink>
          );
        })}
      </nav>

      <div className="mt-auto text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} Subscribely
      </div>
    </aside>
  );
}
