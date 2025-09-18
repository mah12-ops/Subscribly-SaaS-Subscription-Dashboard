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
    <section className="py-20 bg-white dark:bg-gray-950">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
          Frequently Asked Questions
        </h2>
        <p className="mt-3 text-gray-600 dark:text-gray-400">
          Everything you need to know about using our subscription platform.
        </p>
      </div>

      <div className="mt-12 max-w-3xl mx-auto px-6 space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm"
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full flex justify-between items-center px-5 py-4 text-left text-lg font-semibold text-gray-900 dark:text-white"
            >
              {faq.question}
              <span className="ml-4 text-emerald-600 dark:text-teal-400">
                {openIndex === index ? "−" : "+"}
              </span>
            </button>
            {openIndex === index && (
              <div className="px-5 pb-4 text-gray-600 dark:text-gray-400">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
