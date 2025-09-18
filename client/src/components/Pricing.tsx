// src/components/Pricing.tsx
export default function Pricing() {
  const plans = [
    {
      name: "Starter",
      price: "Free",
      desc: "Perfect for testing things out.",
      features: ["1 Project", "Basic Support", "Community Access"],
    },
    {
      name: "Pro",
      price: "$29/mo",
      desc: "For growing teams and businesses.",
      features: ["Unlimited Projects", "Priority Support", "Team Collaboration"],
    },
    {
      name: "Enterprise",
      price: "Custom",
      desc: "Tailored solutions for large orgs.",
      features: ["Dedicated Manager", "Custom Integrations", "24/7 Support"],
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-dark to-black text-white">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold bg-gradient-to-r from-teal-400 via-indigo-400 to-pink-400 bg-clip-text text-transparent mb-12">
          Simple, Transparent Pricing
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, idx) => (
            <div
              key={idx}
              className="rounded-2xl bg-gray-900 p-8 shadow-lg hover:scale-105 transform transition"
            >
              <h3 className="text-2xl font-semibold">{plan.name}</h3>
              <p className="text-4xl font-bold mt-2">{plan.price}</p>
              <p className="text-gray-400 mt-2">{plan.desc}</p>
              <ul className="mt-6 space-y-2 text-left">
                {plan.features.map((f, i) => (
                  <li key={i} className="flex items-center gap-3">
                    .  <span>{f}</span>
                  </li>
                ))}
              </ul>
              <button className="mt-6 w-full py-3 text-white bg-indigo-400  hover:bg-indigo-600  rounded-xl font-medium">
                Choose Plan
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
