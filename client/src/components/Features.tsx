// src/components/Features.jsx
const features = [
  { title: "Track Subscriptions", desc: "Keep every plan in one sleek dashboard." },
  { title: "Automated Billing", desc: "Send invoices & reminders automatically." },
  { title: "Insights & Analytics", desc: "Understand customer trends instantly." },
];

export default function Features() {
  return (
    <section className="py-24 px-6 bg-dark text-center">
      <h2 className="text-4xl font-bold bg-gradient-to-r from-teal-400 via-indigo-400 to-pink-400 bg-clip-text text-transparent mb-12">
        Powerful Features
      </h2>
      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {features.map((f, i) => (
          <div key={i} className="p-6 rounded-xl bg-white/5 border border-white/10 shadow-lg hover:shadow-indigo-500/30 transition">
            <h3 className="text-xl font-semibold mb-3 text-white">{f.title}</h3>
            <p className="text-gray-400">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
