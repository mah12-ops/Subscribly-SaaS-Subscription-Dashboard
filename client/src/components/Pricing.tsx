// src/components/Pricing.tsx
export default function Pricing() {
  const plans = [
    {
      name: "Starter",
      price: "Free",
      desc: "Perfect for testing things out.",
      features: ["1 Project", "Basic Support", "Community Access"],
      button: "Choose Plan",
    },
    {
      name: "Pro",
      price: "$29/mo",
      desc: "For growing teams and businesses.",
      features: ["Unlimited Projects", "Priority Support", "Team Collaboration"],
      button: "Choose Plan",
    },
    {
      name: "Enterprise",
      price: "Custom",
      desc: "Tailored solutions for large orgs.",
      features: ["Dedicated Manager", "Custom Integrations", "24/7 Support"],
      button: "Contact Us",
    },
  ];

  return (
    <section className="py-20 bg-dark text-white">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-12 ">
          Simple, Transparent Pricing
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, idx) => (
            <div
              key={idx}
              className="rounded-2xl bg-gray-900 p-8 shadow-lg hover:shadow-xl transform hover:scale-105 transition duration-300"
            >
              <h3 className="text-2xl font-semibold">{plan.name}</h3>
              <p className="text-4xl font-bold mt-2">{plan.price}</p>
              <p className="text-gray-400 mt-2">{plan.desc}</p>

              <ul className="mt-6 space-y-2 text-left">
                {plan.features.map((f, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <span className=" font-bold">•</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              <button
                className={`mt-6 w-full py-3 rounded-xl font-medium text-white transition ${
                  plan.name === "Starter"
                    ? "bg-primary hover:bg-primary"
                    : plan.name === "Pro"
                    ? "bg-primary hover:bg-primary-dark"
                    : "bg-primary hover:bg-primary"
                }`}
              >
                {plan.button}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
