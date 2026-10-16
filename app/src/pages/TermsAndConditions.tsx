import PageWrapper from '../components/PageWrapper';

const TermsAndConditions = () => {
  return (
    <PageWrapper className="bg-[#080B0E] text-white py-16">
      <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12">
        <span className="text-xs uppercase font-mono tracking-widest text-[#00F5A0] font-bold block mb-3">
          Legal Agreement & Rights
        </span>
        <h1 className="text-4xl sm:text-5xl font-black text-white mb-8 tracking-tight">Terms & Conditions</h1>
        <div className="space-y-6 text-zinc-300 leading-relaxed">
          <p className="text-xs font-mono text-zinc-500">Last updated: October 2026</p>
          <h2 className="text-2xl font-bold text-white mt-8 mb-2">1. Agreement to Terms</h2>
          <p>These Terms of Use constitute a legally binding agreement made between you and we Publicise concerning your access to and engagement with our web properties, digital services, and sprint deliverables.</p>
          
          <h2 className="text-2xl font-bold text-white mt-8 mb-2">2. Intellectual Property Rights</h2>
          <p>Unless explicitly contracted under client work-for-hire assignment agreements, all agency design systems, interactive code frameworks, proprietary motion choreographies, and brand assets are intellectual property of we Publicise.</p>

          <h2 className="text-2xl font-bold text-white mt-8 mb-2">3. Client Representations</h2>
          <p>By engaging our services or using this site, you warrant that all submitted briefs, materials, and trademarks provided for client sprints are lawful and owned by your organization.</p>
        </div>
      </div>
    </PageWrapper>
  );
};

export default TermsAndConditions;
