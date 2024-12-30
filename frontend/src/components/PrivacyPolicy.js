import React from "react";
import Header from "./Header"

const PrivacyPolicy = () => {
  return (
    <div>
      <Header/>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-green-900 text-white p-8 flex items-center justify-center">
      <div className="max-w-5xl bg-gray-800 bg-opacity-90 rounded-lg shadow-xl p-8 text-center transform hover:scale-105 transition-all duration-500 ease-in-out">
        <h1 className="text-5xl font-bold mb-6 text-green-300 tracking-wider">
          Privacy Policy
        </h1>
        <p className="text-lg text-gray-300 mb-4 leading-relaxed">
          Your privacy is critically important to us. This privacy policy
          outlines how we collect, use, and protect your personal data.
        </p>
        <section className="mb-6">
          <h2 className="text-3xl font-semibold text-green-200 mb-4">
            Information We Collect
          </h2>
          <p className="text-gray-400">
            We collect the following information when you use our services:
          </p>
          <ul className="list-disc list-inside mt-4 text-left text-gray-400 space-y-2">
            <li>Personal data you provide when creating an account.</li>
            <li>Technical data such as your IP address and browser type.</li>
            <li>
              Interaction data, including pages viewed and actions performed.
            </li>
          </ul>
        </section>
        <section className="mb-6">
          <h2 className="text-3xl font-semibold text-green-200 mb-4">
            How We Use Your Information
          </h2>
          <p className="text-gray-400">
            Your information is used to enhance your experience and provide
            better services, such as:
          </p>
          <ul className="list-disc list-inside mt-4 text-left text-gray-400 space-y-2">
            <li>Personalizing your user experience.</li>
            <li>Improving our website and services.</li>
            <li>Ensuring the security of your data.</li>
          </ul>
        </section>
        <section className="mb-6">
          <h2 className="text-3xl font-semibold text-green-200 mb-4">
            Data Protection
          </h2>
          <p className="text-gray-400">
            We take data protection seriously and implement appropriate
            measures, including encryption and regular audits, to ensure the
            safety of your information.
          </p>
        </section>
        <section>
          <h2 className="text-3xl font-semibold text-green-200 mb-4">
            Contact Us
          </h2>
          <p className="text-gray-400">
            If you have any questions about this privacy policy, please contact
            us at{" "}
            <a
              href="mailto:support@example.com"
              className="text-green-400 hover:underline"
            >
              support@pecresolve.com
            </a>
            .
          </p>
        </section>
        <footer className="mt-8 text-gray-500">
          <p>© {new Date().getFullYear()} PECResolve. All rights reserved.</p>
        </footer>
      </div>
    </div>
    </div>
  );
};

export default PrivacyPolicy;
