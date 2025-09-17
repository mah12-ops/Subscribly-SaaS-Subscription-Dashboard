// src/components/FAQSection.jsx
import { motion } from "framer-motion";

export default function FAQ() {
  const faqs = [
    {
      q: "Is there a free trial?",
      a: "Yes! Get started with a 14-day free trial, no credit card required.",
    },
    {
      q: "Can I upgrade anytime?",
      a: "Absolutely. You can upgrade or downgrade plans whenever you like.",
    },
    {
      q: "Do you support integrations?",
      a: "Yes, we support popular tools like Stripe, Slack, and Zapier.",
    },
  ];

  return (
    <section id="faq" className="py-20 px-8 bg-gray-500">
      <h3 className="text-3xl font-bold text-center mb-12">
        Frequently Asked Questions
      </h3>
      <div className="max-w-3xl mx-auto space-y-6">
        {faqs.map((item, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.02 }}
            className="p-6 bg-white rounded-2xl shadow"
          >
            <h4 className="font-semibold mb-2">{item.q}</h4>
            <p className="text-gray-600">{item.a}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
