import { motion } from 'framer-motion';
import PageWrapper from '../components/PageWrapper';

const Service = () => {
  const services = [
    { title: 'Web Development', desc: 'Custom, responsive websites built with passion and expertise.' },
    { title: 'App Development', desc: 'Engaging mobile applications for modern users.' },
    { title: 'Social Media Marketing', desc: 'Connecting your brand with the right audience.' },
    { title: 'PPC Ads', desc: 'Targeted ad campaigns for maximum ROI.' },
    { title: 'Search Engine Optimisation', desc: 'Boosting your visibility on search engines.' },
    { title: 'Graphic Designing', desc: 'Creative visuals that define your brand identity.' },
  ];

  return (
    <PageWrapper>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl font-bold text-brand-wine mb-6"
          >
            Our Services
          </motion.h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Comprehensive communication solutions tailored to elevate your brand.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="bg-white p-10 rounded-2xl shadow-lg border border-gray-100 hover:shadow-2xl transition-shadow duration-300 group"
            >
              <div className="h-12 w-12 bg-brand-wine/10 rounded-full flex items-center justify-center mb-6 group-hover:bg-brand-wine group-hover:text-white transition-colors duration-300">
                <span className="text-2xl font-bold text-brand-wine group-hover:text-white">{index + 1}</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">{service.title}</h3>
              <p className="text-gray-600 text-lg">{service.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </PageWrapper>
  );
};

export default Service;
