import { motion } from 'framer-motion';
import PageWrapper from '../components/PageWrapper';
import LiquidButton from '../components/LiquidButton';

const ContactUs = () => {
  return (
    <PageWrapper>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-bold text-brand-wine mb-6">Let's Talk</h1>
          <p className="text-xl text-gray-600">Ready to amplify your brand? Reach out to us today.</p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white p-10 rounded-3xl shadow-xl"
        >
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                <input type="text" id="name" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-wine focus:border-brand-wine outline-none transition" placeholder="John Doe" />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input type="email" id="email" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-wine focus:border-brand-wine outline-none transition" placeholder="john@example.com" />
              </div>
            </div>
            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
              <input type="text" id="subject" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-wine focus:border-brand-wine outline-none transition" placeholder="How can we help?" />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">Message</label>
              <textarea id="message" rows={5} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-wine focus:border-brand-wine outline-none transition" placeholder="Tell us about your project..."></textarea>
            </div>
            <LiquidButton
              type="button"
              className="w-full justify-center bg-brand-wine border-[#800020] text-white py-4 rounded-xl font-bold text-lg shadow-xl"
            >
              <span>Send Message</span>
            </LiquidButton>
          </form>
        </motion.div>
      </div>
    </PageWrapper>
  );
};

export default ContactUs;
