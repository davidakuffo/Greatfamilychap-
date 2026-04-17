export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 transition-colors duration-300">
      <div className="max-w-3xl mx-auto px-6 py-14">

        <div className="mb-10 pb-8 border-b border-gray-200 dark:border-gray-800">
          <p className="text-xs font-medium uppercase tracking-widest text-indigo-500 dark:text-indigo-400 mb-3">
            Great Family Chapel
          </p>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-3">
            Terms of Service
          </h1>
          <p className="text-sm text-gray-400 dark:text-gray-500">
            Effective Date: June 1, 2025
          </p>
        </div>

        <div className="space-y-8">
          {[
            {
              number: "01",
              title: "Use of Website",
              body: "You agree to use this website lawfully and respectfully. Any misuse or unlawful activity may result in termination of access.",
            },
            {
              number: "02",
              title: "User Accounts",
              body: "You are responsible for your account and must provide accurate information. Keep your credentials secure and notify us of any unauthorized access.",
            },
            {
              number: "03",
              title: "Community Guidelines",
              body: "Respect others. No harassment, abuse, or harmful behavior in groups or chats. Violations may result in removal from the platform.",
            },
            {
              number: "04",
              title: "Live Streaming",
              body: "Streaming is provided as-is. We are not liable for interruptions, delays, or technical issues affecting stream availability.",
            },
            {
              number: "05",
              title: "Donations",
              body: "Donations are voluntary and non-refundable unless stated otherwise. All transactions are processed securely through trusted payment providers.",
            },
            {
              number: "06",
              title: "Liability",
              body: "We are not responsible for damages or misuse of the platform. Use of this website is at your own discretion and risk.",
            },
          ].map(({ number, title, body }) => (
            <div
              key={number}
              className="group flex gap-6 p-6 rounded-2xl bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 hover:border-indigo-200 dark:hover:border-indigo-900 transition-colors duration-200"
            >
              <span className="text-2xl font-bold text-indigo-200 dark:text-indigo-900 select-none shrink-0 leading-tight">
                {number}
              </span>
              <div>
                <h2 className="text-base font-semibold text-gray-900 dark:text-white mb-1">
                  {title}
                </h2>
                <p className="text-sm leading-relaxed text-gray-500 dark:text-gray-400">
                  {body}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 p-6 rounded-2xl bg-indigo-50 dark:bg-indigo-950 border border-indigo-100 dark:border-indigo-900">
          <div className="flex gap-6 items-start">
            <span className="text-2xl font-bold text-indigo-200 dark:text-indigo-800 select-none shrink-0 leading-tight">
              07
            </span>
            <div>
              <h2 className="text-base font-semibold text-gray-900 dark:text-white mb-1">
                Contact Us
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                Have questions about these terms? We're here to help.
              </p>
              <a
                href="mailto:info@greatfamilychapel.org"
  className="inline-flex items-center gap-2 text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-200 transition-colors"
>
                info@greatfamilychapel.org
                <svg
                  className="w-3.5 h-3.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <p className="mt-8 text-xs text-center text-gray-300 dark:text-gray-700">
          © {new Date().getFullYear()} Great Family Chapel. All rights reserved.
        </p>
      </div>
    </div>
  );
}