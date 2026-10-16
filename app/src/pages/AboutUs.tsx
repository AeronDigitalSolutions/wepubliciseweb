import { motion } from 'framer-motion';
import PageWrapper from '../components/PageWrapper';
import LiquidButton from '../components/LiquidButton';
import { Sparkles, ArrowRight } from 'lucide-react';

const AboutUs = () => {
  return (
    <PageWrapper className="bg-[#060608] text-white py-16">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="space-y-6"
          >
            <span className="text-xs uppercase font-mono tracking-widest text-[#A78BFA] font-bold inline-flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#7C3AED] animate-pulse" />
              The Creative & Tech Collective
            </span>
            <h1 className="text-5xl sm:text-6xl font-black text-white tracking-tight leading-tight">
              Architects Of Modern Brand Perception.
            </h1>
            <p className="text-lg text-zinc-300 leading-relaxed font-light">
              Founded on the conviction that high-growth companies deserve world-class digital craftsmanship, we Publicise is a premier brand identity, custom web engineering, and digital growth agency.
            </p>
            <p className="text-base text-zinc-400 leading-relaxed">
              We eliminate template mediocrity. Our multidisciplinary team fuses behavioral design psychology, 60fps micro-interaction code, and precision conversion optimization to turn ambitious ideas into market-dominating brands.
            </p>
            <div className="pt-4">
              <LiquidButton
                to="/contact"
                variant="white"
                className="gap-3 text-sm uppercase tracking-wider font-bold group"
              >
                <span>Partner With Us</span>
                <ArrowRight size={16} className="text-black group-hover:text-white group-hover:translate-x-1 transition-all" />
              </LiquidButton>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative h-[540px] rounded-3xl overflow-hidden border-2 border-[#222234] bg-[#0E0E15]"
          >
            <img 
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80" 
              alt="we Publicise Studio" 
              className="absolute inset-0 w-full h-full object-cover filter contrast-110 opacity-70"
            />
            <div className="absolute inset-0 bg-[#060608]/60 flex flex-col justify-end p-8 sm:p-12">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#1E1035] border border-[#7C3AED] w-fit mb-4">
                <Sparkles size={14} className="text-[#A78BFA]" />
                <span className="text-xs font-mono font-bold text-[#A78BFA]">Worldwide Digital Delivery</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white leading-snug">
                "Design is intelligence made visible. Code is performance made tangible."
              </h3>
            </div>
          </motion.div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default AboutUs;
