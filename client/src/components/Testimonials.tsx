// src/components/Testimonials.tsx
export default function Testimonials() {
  const testimonials = [
    {
      name: "Sarah M.",
      role: "CTO, StartupX",
      text: "Subscribely transformed how we handle billing. Setup took minutes, not weeks!",
    },
    {
      name: "James T.",
      role: "Founder, ScaleUp",
      text: "The dashboard is slick and intuitive. Our churn dropped by 25% after switching.",
    },
    {
      name: "Lena R.",
      role: "Product Manager, SaaSly",
      text: "Finally a subscription tool that just works. The team loves it.",
    },
  ];

  return (
    <section className="py-20 bg-dark text-white">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold mb-12 bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">
          Loved by SaaS Teams Everywhere
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="bg-gray-900 rounded-2xl p-8 shadow-md hover:shadow-xl transition"
            >
              <p className="text-lg italic mb-4">“{t.text}”</p>
              <h4 className="font-semibold">{t.name}</h4>
              <p className="text-sm text-gray-400">{t.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
