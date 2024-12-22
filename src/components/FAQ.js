

import React, { useState } from "react";
import { FaQuestionCircle, FaChevronDown, FaChevronUp } from "react-icons/fa"; 

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqData = [
    {
      question: "What is PECResolve?",
      answer:
        "PECResolve is a digital platform that helps students, faculty, and staff raise and resolve grievances in a timely and transparent manner.",
    },
    {
      question: "How can I report a grievance?",
      answer:
        "You can report a grievance by logging into your account and submitting the details of the issue through the complaint form available on the platform.",
    },
    {
      question: "Is my identity confidential while submitting complaints?",
      answer:
        "Yes, your identity will be kept confidential throughout the process. We ensure that the process is anonymous to protect your privacy.",
    },
    {
      question: "Who can raise a complaint?",
      answer:
        "Any student, faculty member, or staff of PEC can raise a grievance regarding any issues they are facing. The platform is available to all members of the PEC community.",
    },
    {
      question: "How do I track the status of my complaint?",
      answer:
        "Once your complaint is submitted, you can log into the platform to track its progress and view updates about the resolution process.",
    },
    {
      question: "Can I attach files or documents with my complaint?",
      answer:
        "Yes, you can attach relevant files or documents that may help in addressing your complaint, such as images, PDFs, or other types of evidence.",
    },
    {
      question: "How long does it take to resolve a grievance?",
      answer:
        "The resolution time depends on the complexity of the grievance. However, the platform ensures that all issues are addressed as quickly as possible, and you will be notified of any progress.",
    },
    {
      question: "Can I submit anonymous complaints?",
      answer:
        "Yes, you can submit complaints anonymously. However, providing your contact information may help speed up the resolution process.",
    },
    {
      question: "What happens if my complaint is not resolved satisfactorily?",
      answer:
        "If you are unsatisfied with the resolution, you can escalate your complaint to a higher authority or request a review through the platform.",
    },
  ];

  return (
    <div className="bg-gradient-to-r from-gray-800 via-gray-900 to-black text-white py-16">
      <div className="container mx-auto text-center space-y-8">
        <h2 className="text-4xl font-semibold">Frequently Asked Questions</h2>
        <p className="text-lg font-light max-w-3xl mx-auto">
          Here are the answers to the most common questions we receive. If you have any further queries, feel free to contact us.
        </p>

        <div className="mt-10 space-y-6">
          {faqData.map((item, index) => (
            <div
              key={index}
              className="bg-white bg-opacity-40 text-deepBlue rounded-lg shadow-lg"
            >
              <div
                className="flex items-center justify-between p-5 cursor-pointer"
                onClick={() => toggleAccordion(index)}
              >
                <div className="flex items-center space-x-3">
                  <FaQuestionCircle className="text-2xl" />
                  <h3 className="font-semibold text-xl">{item.question}</h3>
                </div>
                <div>
                  {activeIndex === index ? (
                    <FaChevronUp className="text-2xl" />
                  ) : (
                    <FaChevronDown className="text-2xl" />
                  )}
                </div>
              </div>

              {activeIndex === index && (
                <div className="p-5 text-base font-light bg-gray-100 bg-opacity-60">
                  {item.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQ;
