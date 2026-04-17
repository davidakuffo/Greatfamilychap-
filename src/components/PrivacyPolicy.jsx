export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-white dark:bg-black transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-6 py-12 text-gray-800 dark:text-gray-200">
        <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
          Privacy Policy
        </h1>
        <p className="mb-4 text-gray-500 dark:text-gray-400">
          Effective Date: June 1, 2025
        </p>
        <p className="mb-6 text-gray-700 dark:text-gray-300">
          Great Family Chapel is committed to protecting your privacy. This
          policy explains how we collect and use your data.
        </p>

        <h2 className="text-xl font-semibold mt-8 text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-2">
          1. Information We Collect
        </h2>
        <ul className="list-disc ml-6 mt-3 space-y-1 text-gray-700 dark:text-gray-300">
          <li>Name, email, phone number</li>
          <li>Account login details</li>
          <li>Donation/payment information</li>
          <li>Usage data (IP, browser, pages visited)</li>
        </ul>

        <h2 className="text-xl font-semibold mt-8 text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-2">
          2. How We Use Your Information
        </h2>
        <p className="mt-3 text-gray-700 dark:text-gray-300">
          We use your data to manage accounts, run digital groups, send
          updates, and improve the platform.
        </p>

        <h2 className="text-xl font-semibold mt-8 text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-2">
          3. Data Security
        </h2>
        <p className="mt-3 text-gray-700 dark:text-gray-300">
          Your data is securely stored using platforms like Supabase with
          appropriate protection measures.
        </p>

        <h2 className="text-xl font-semibold mt-8 text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-2">
          4. Sharing of Information
        </h2>
        <p className="mt-3 text-gray-700 dark:text-gray-300">
          We do not sell your data. We only share with trusted services (e.g.,
          payment providers) when necessary.
        </p>

        <h2 className="text-xl font-semibold mt-8 text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-2">
          5. Your Rights
        </h2>
        <p className="mt-3 text-gray-700 dark:text-gray-300">
          You can request access, correction, or deletion of your personal data
          anytime by contacting us.
        </p>

        <h2 className="text-xl font-semibold mt-8 text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-2">
          6. Contact
        </h2>
        <p className="mt-3 text-gray-700 dark:text-gray-300">
          If you have any questions about this Privacy Policy, please contact us at{" "}
          <a
            href="mailto:info@greatfamilychapel.org"
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            info@greatfamilychapel.org
          </a>
        </p>
      </div>
    </div>
  );
}