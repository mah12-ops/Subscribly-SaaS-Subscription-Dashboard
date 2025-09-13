// src/components/Footer.jsx
export default function Footer() {
  return (
    <footer className="bg-dark py-8 text-center border-t border-white/10">
      <p className="text-gray-500">© {new Date().getFullYear()} Subscribly — All Rights Reserved.</p>
    </footer>
  );
}
