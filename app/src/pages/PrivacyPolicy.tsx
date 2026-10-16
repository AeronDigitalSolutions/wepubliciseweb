import PageWrapper from '../components/PageWrapper';

const PrivacyPolicy = () => {
  return (
    <PageWrapper className="bg-[#060608] text-white py-16">
      <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12">
        <span className="text-xs uppercase font-mono tracking-widest text-[#A78BFA] font-bold block mb-3">
          Compliance & Transparency
        </span>
        <h1 className="text-4xl sm:text-5xl font-black text-white mb-8 tracking-tight">Privacy Policy</h1>
        <div className="space-y-6 text-zinc-300 leading-relaxed">
          <p className="text-xs font-mono text-zinc-500">Last updated: October 2026</p>
          <h2 className="text-2xl font-bold text-white mt-8 mb-2">1. Introduction</h2>
          <p>At we Publicise, we respect your privacy and are committed to protecting your personal data. This privacy policy informs you of how we manage, protect, and respect your information when you visit our website.</p>
          
          <h2 className="text-2xl font-bold text-white mt-8 mb-2">2. The Data We Collect About You</h2>
          <p>We may collect, use, store and transfer different kinds of personal information grouped as follows:</p>
          <ul className="list-disc pl-6 space-y-1.5 text-zinc-400">
            <li><strong className="text-white">Identity Data:</strong> Name, company name, or professional title.</li>
            <li><strong className="text-white">Contact Data:</strong> Business email address, project requirements, and phone details.</li>
            <li><strong className="text-white">Technical Telemetry:</strong> Anonymized interaction latency, session metadata, and regional device analytics.</li>
          </ul>

          <h2 className="text-2xl font-bold text-white mt-8 mb-2">3. How We Use Your Data</h2>
          <p>We will only process data when necessary for legitimate client engagements, responding to project briefs, maintaining website integrity, or complying with statutory requirements.</p>
        </div>
      </div>
    </PageWrapper>
  );
};

export default PrivacyPolicy;
