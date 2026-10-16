import { motion } from 'framer-motion';
import PageWrapper from '../components/PageWrapper';
import LiquidButton from '../components/LiquidButton';

const ContactUs = () => {
  return (
    <PageWrapper className="bg-[#060608] text-white py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <span className="text-xs uppercase font-mono tracking-widest text-[#A78BFA] font-bold inline-flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-[#7C3AED] animate-pulse" />
            Start A Conversation
          </span>
          <h1 className="text-5xl font-bold text-white mb-4 tracking-tight">Let's Build Something Iconic</h1>
          <p className="text-lg text-zinc-400">Ready to scale your brand? Speak directly with our product & growth strategists.</p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-[#0E0E15] border border-[#222234] hover:border-[#7C3AED]/70 p-8 sm:p-12 rounded-3xl shadow-2xl transition-colors"
        >
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-zinc-300 mb-2">Name</label>
                <input 
                  type="text" 
                  id="name" 
                  className="w-full px-4 py-3 rounded-xl bg-[#141420] border border-[#222234] text-white focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED] outline-none transition" 
                  placeholder="John Doe" 
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-zinc-300 mb-2">Work Email</label>
                <input 
                  type="email" 
                  id="email" 
                  className="w-full px-4 py-3 rounded-xl bg-[#141420] border border-[#222234] text-white focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED] outline-none transition" 
                  placeholder="john@company.com" 
                />
              </div>
            </div>
            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-zinc-300 mb-2">Project Scope / Objective</label>
              <input 
                type="text" 
                id="subject" 
                className="w-full px-4 py-3 rounded-xl bg-[#141420] border border-[#222234] text-white focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED] outline-none transition" 
                placeholder="Website, SaaS Software, or Growth Ads Campaign" 
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-zinc-300 mb-2">Project Brief</label>
              <textarea 
                id="message" 
                rows={5} 
                className="w-full px-4 py-3 rounded-xl bg-[#141420] border border-[#222234] text-white focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED] outline-none transition" 
                placeholder="Tell us about your brand goals, target timeline, and budget..."
              ></textarea>
            </div>
            <LiquidButton
              type="button"
              variant="white"
              className="w-full justify-center py-4 rounded-xl font-bold text-lg"
            >
              <span>Submit Inquiry</span>
            </LiquidButton>
          </form>
        </motion.div>
      </div>
    </PageWrapper>
  );
};

export default ContactUs;
