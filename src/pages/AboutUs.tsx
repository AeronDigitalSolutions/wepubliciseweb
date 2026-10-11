import { motion } from 'framer-motion';
import PageWrapper from '../components/PageWrapper';

const AboutUs = () => {
  return (
    <PageWrapper>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl font-bold text-brand-wine mb-6">About Us</h1>
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              We are the architects of perception.
            </h2>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              Founded on the belief that every brand has a unique story, we Publicise is a premier public relations and communications agency. We specialize in cutting through the noise and delivering your message directly to the audience that matters most.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              Our team of seasoned strategists, creative writers, and digital experts work cohesively to build campaigns that not only generate buzz but drive tangible business results.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative h-[600px] rounded-3xl overflow-hidden bg-brand-wine"
          >
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80')] bg-cover bg-center mix-blend-overlay opacity-50"></div>
            <div className="absolute inset-0 flex items-center justify-center p-12 text-center">
              <h3 className="text-4xl font-bold text-white leading-tight">
                "Communication is the solvent of all problems."
              </h3>
            </div>
          </motion.div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default AboutUs;
