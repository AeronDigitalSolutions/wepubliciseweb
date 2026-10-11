import PageWrapper from '../components/PageWrapper';

const PrivacyPolicy = () => {
  return (
    <PageWrapper>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-brand-wine mb-8">Privacy Policy</h1>
        <div className="prose prose-lg text-gray-700">
          <p>Last updated: October 2026</p>
          <h2 className="text-2xl font-semibold mt-8 mb-4">1. Introduction</h2>
          <p>At we Publicise, we respect your privacy and are committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website.</p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">2. The data we collect about you</h2>
          <p>We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>Identity Data includes first name, last name, username or similar identifier.</li>
            <li>Contact Data includes billing address, delivery address, email address and telephone numbers.</li>
            <li>Technical Data includes internet protocol (IP) address, your login data, browser type and version.</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8 mb-4">3. How we use your personal data</h2>
          <p>We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>Where we need to perform the contract we are about to enter into or have entered into with you.</li>
            <li>Where it is necessary for our legitimate interests and your interests and fundamental rights do not override those interests.</li>
            <li>Where we need to comply with a legal or regulatory obligation.</li>
          </ul>
        </div>
      </div>
    </PageWrapper>
  );
};

export default PrivacyPolicy;
