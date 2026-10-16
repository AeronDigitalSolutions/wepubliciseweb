import { motion } from 'framer-motion';
import PageWrapper from '../components/PageWrapper';
import LiquidButton from '../components/LiquidButton';
import { ArrowUpRight } from 'lucide-react';

const Service = () => {
  const services = [
    { 
      title: 'Web & Web Application Engineering', 
      desc: 'Custom, high-speed responsive web applications built with Next.js, Vite, and Framer Motion for sub-second load times and fluid 60fps interaction.',
      tag: 'Development',
      color: 'mint',
      tagClass: 'bg-[#0D2A26] text-[#00F5A0] border-[#00F5A0]/40',
      numClass: 'text-[#00F5A0]',
      hoverBorder: 'hover:border-[#00F5A0]',
      iconClass: 'text-[#00F5A0]',
    },
    { 
      title: 'Cloud & SaaS Product Architecture', 
      desc: 'Scalable multi-tenant backends, real-time database telemetry pipelines, and enterprise-grade REST/GraphQL API systems.',
      tag: 'Engineering',
      color: 'violet',
      tagClass: 'bg-[#1E1035] text-[#A78BFA] border-[#7C3AED]/40',
      numClass: 'text-[#A78BFA]',
      hoverBorder: 'hover:border-[#7C3AED]',
      iconClass: 'text-[#A78BFA]',
    },
    { 
      title: 'Performance Digital Marketing & PPC', 
      desc: 'Precision paid search, meta funnels, and programmatic ad buying engineered to maximize ROAS and scale client acquisition.',
      tag: 'Growth',
      color: 'mint',
      tagClass: 'bg-[#0D2A26] text-[#00F5A0] border-[#00F5A0]/40',
      numClass: 'text-[#00F5A0]',
      hoverBorder: 'hover:border-[#00F5A0]',
      iconClass: 'text-[#00F5A0]',
    },
    { 
      title: 'Search Engine Optimization (SEO)', 
      desc: 'Technical architecture, deep entity optimization, and content authority strategies to dominate high-intent organic search rankings.',
      tag: 'Acquisition',
      color: 'violet',
      tagClass: 'bg-[#1E1035] text-[#A78BFA] border-[#7C3AED]/40',
      numClass: 'text-[#A78BFA]',
      hoverBorder: 'hover:border-[#7C3AED]',
      iconClass: 'text-[#A78BFA]',
    },
    { 
      title: 'Brand Identity & Visual Design Systems', 
      desc: 'Cohesive brand narratives, comprehensive design systems, typography tokens, and tactile digital assets that command premium valuation.',
      tag: 'Branding',
      color: 'mint',
      tagClass: 'bg-[#0D2A26] text-[#00F5A0] border-[#00F5A0]/40',
      numClass: 'text-[#00F5A0]',
      hoverBorder: 'hover:border-[#00F5A0]',
      iconClass: 'text-[#00F5A0]',
    },
    { 
      title: 'Conversion Rate Optimization (CRO)', 
      desc: 'Behavioral analytics, A/B testing frameworks, and multivariate funnels designed specifically to convert ad clicks into paying customers.',
      tag: 'Conversion',
      color: 'violet',
      tagClass: 'bg-[#1E1035] text-[#A78BFA] border-[#7C3AED]/40',
      numClass: 'text-[#A78BFA]',
      hoverBorder: 'hover:border-[#7C3AED]',
      iconClass: 'text-[#A78BFA]',
    },
  ];

  return (
    <PageWrapper className="bg-[#080B0E] text-white py-16">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="text-center mb-20 max-w-3xl mx-auto">
          <span className="text-xs uppercase font-mono tracking-widest text-[#A78BFA] font-bold inline-flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-[#00F5A0] animate-pulse" />
            Capabilities & Deliverables
          </span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl sm:text-6xl font-black text-white mb-6 tracking-tight"
          >
            Engineering Unfair Advantages
          </motion.h1>
          <p className="text-lg text-zinc-400 font-light leading-relaxed">
            Every service is calibrated to elevate brand perception and generate measurable, compounding enterprise value.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08, duration: 0.5 }}
              className={`bg-[#0E141B] p-8 rounded-3xl border border-[#1E2B37] ${service.hoverBorder} transition-all duration-300 group flex flex-col justify-between`}
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-10 h-10 bg-[#080B0E] border border-[#1E2B37] rounded-xl flex items-center justify-center transition-colors duration-300">
                    <span className={`text-sm font-mono font-bold ${service.numClass}`}>0{index + 1}</span>
                  </div>
                  <span className={`text-[11px] font-mono uppercase px-3 py-1 rounded-full border ${service.tagClass}`}>
                    {service.tag}
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-white transition-colors">{service.title}</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">{service.desc}</p>
              </div>

              <div className="pt-8 flex items-center justify-between border-t border-[#1E2B37] mt-6">
                <span className="text-xs font-mono text-zinc-500">Inquire for sprint</span>
                <ArrowUpRight size={16} className={`${service.iconClass} group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform`} />
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-20 text-center">
          <LiquidButton
            to="/contact"
            className="gap-3 border-[#00F5A0] bg-[#00F5A0] text-sm uppercase tracking-wider font-bold text-[#080B0E] group hover:text-[#080B0E]"
          >
            <span>Discuss Your Project Requirements</span>
          </LiquidButton>
        </div>
      </div>
    </PageWrapper>
  );
};

export default Service;
