// src/components/FAQSection.jsx
import { useState } from "react";

const faqs = [
  {
    question: "What is Subscribely?",
    answer:
      "Subscribely is a modern SaaS subscription dashboard that helps you manage plans, users, and payments in one place.",
  },
  {
    question: "Can I change my plan later?",
    answer:
      "Yes, you can upgrade or downgrade your subscription anytime from your account settings. Changes take effect immediately.",
  },
  {
    question: "Is there a free trial?",
    answer:
      "Absolutely! We offer a 14-day free trial with no credit card required so you can explore the platform before committing.",
  },
  {
    question: "How secure is my data?",
    answer:
      "We use industry-standard encryption, rate limiting, and role-based access control to ensure your data stays safe and private.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index:any) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="relative py-24 bg-gray-950 text-white">
      {/* background glow */}
      <div className="absolute -z-10 top-20 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-gradient-radial from-indigo-500/30 via-purple-500/20 to-transparent rounded-full blur-3xl animate-pulse" />

      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
          Frequently Asked Questions
        </h2>
        <p className="mt-4 text-lg text-gray-300">
          Everything you need to know about Subscribely, all in one place.
        </p>
      </div>

      <div className="mt-14 max-w-3xl mx-auto px-6 space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border border-indigo-500/40 rounded-2xl shadow-lg bg-gray-900/60 backdrop-blur-sm overflow-hidden transition"
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full flex justify-between items-center px-6 py-5 text-left text-lg font-semibold text-indigo-300 hover:text-pink-300 transition"
            >
              {faq.question}
              <span className="ml-4 text-indigo-400 text-2xl font-bold">
                {openIndex === index ? "−" : "+"}
              </span>
            </button>
            {openIndex === index && (
              <div className="px-6 pb-5 text-gray-300 border-t border-indigo-500/30">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
