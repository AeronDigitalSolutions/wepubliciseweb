import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useSpring, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Play,
  ArrowUpRight,
  ArrowRight,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Plus,
  Minus,
  Bot,
} from 'lucide-react';
import PageWrapper from '../components/PageWrapper';

// Rotating dynamic hero words
const dynamicWords = [
  'Naming',
  'Branding',
  'Packaging',
  'Interactions',
  'Experiences',
];

// Interactive Accordion Services (Images 1 & 2)
const servicesData = [
  {
    num: '01.',
    title: 'Brand Identity & Communication',
    desc: 'We craft comprehensive visual systems, distinct brand voice, and typography that make lasting impressions and connect deeply with audiences.',
    tag: 'STRATEGY & IDENTITY',
    image: 'https://images.unsplash.com/photo-1600132806370-bf17e65e942f?auto=format&fit=crop&w=800&q=80',
  },
  {
    num: '02.',
    title: 'Packaging Design',
    desc: "We design beyond the shelf, crafting packaging that carries your brand's story in every fold, texture and line.",
    tag: 'STRUCTURAL & TACTILE',
    image: 'https://images.unsplash.com/photo-1547949003-9792a18a2601?auto=format&fit=crop&w=800&q=80',
  },
  {
    num: '03.',
    title: 'User Experience & Interaction',
    desc: 'Immersive digital products, intuitive responsive interfaces, and delightful micro-interactions engineered with modern performance.',
    tag: 'DIGITAL & WEB',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
  },
  {
    num: '04.',
    title: 'Performance & Growth Marketing',
    desc: 'ROI-driven PPC campaigns, social media domination, and Search Engine Optimization tailored to scale ambitious consumer brands.',
    tag: 'GROWTH & SCALING',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
  },
];

// Featured works - Train Carousel of high-impact visuals
const featuredWorks = [
  {
    title: 'Chins Coffee',
    category: 'Packaging & Visual Identity',
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1000&q=80',
    badge: 'Beverage & Cafe',
  },
  {
    title: 'Dailies Nutrition',
    category: 'Brand Strategy & E-Commerce',
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=1000&q=80',
    badge: 'Health & Wellness',
  },
  {
    title: 'Avexor Logistics',
    category: 'Packaging & Corporate Identity',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1000&q=80',
    badge: 'Supply Chain',
  },
  {
    title: 'Luminary Apparel',
    category: 'Lifestyle & Digital Experience',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1000&q=80',
    badge: 'Fashion & Retail',
  },
  {
    title: 'Vesper Audio',
    category: 'Industrial Design & Acoustics',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1000&q=80',
    badge: 'Consumer Electronics',
  },
  {
    title: 'Oasis Botanicals',
    category: 'Sustainable Skincare & Box Packaging',
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=1000&q=80',
    badge: 'Clean Beauty',
  },
];

// Actual Clients with Logos from wepublicise.com
const ourClients = [
  {
    name: 'Regency Health',
    tag: 'HEALTHCARE',
    logo: 'https://wepublicise.com/wp-content/uploads/2024/12/Untitled-7.png',
  },
  {
    name: 'Zomato',
    tag: 'FOOD & TECH',
    logo: 'https://wepublicise.com/wp-content/uploads/2024/12/Untitled-8.png',
  },
  {
    name: 'Hubble',
    tag: 'FINTECH',
    logo: 'https://wepublicise.com/wp-content/uploads/2024/12/Untitled-9.png',
  },
  {
    name: 'Rupani',
    tag: 'FOOTWEAR',
    logo: 'https://wepublicise.com/wp-content/uploads/2024/12/Untitled-10.png',
  },
  {
    name: 'Paytm',
    tag: 'PAYMENTS',
    logo: 'https://wepublicise.com/wp-content/uploads/2024/12/Untitled-11.png',
  },
  {
    name: 'Moody',
    tag: 'LIFESTYLE',
    logo: 'https://wepublicise.com/wp-content/uploads/2024/12/Untitled-15.png',
  },
  {
    name: 'बावर्ची',
    tag: 'F&B TRADITION',
    logo: 'https://wepublicise.com/wp-content/uploads/2024/12/Untitled-13.png',
  },
  {
    name: 'The Landmark Towers',
    tag: 'HOSPITALITY',
    logo: 'https://wepublicise.com/wp-content/uploads/2024/12/Untitled-18.png',
  },
  {
    name: 'Bikanervala',
    tag: 'SWEETS & DINE',
    logo: 'https://wepublicise.com/wp-content/uploads/2024/12/Untitled-16.png',
  },
  {
    name: 'Resonance',
    tag: 'EDUCATION',
    logo: 'https://wepublicise.com/wp-content/uploads/2024/12/Untitled-17.png',
  },
  {
    name: 'RE:GEN:TA Central',
    tag: 'LUXURY HOTELS',
    logo: 'https://wepublicise.com/wp-content/uploads/2024/12/Untitled-19.png',
  },
  {
    name: 'Pristine',
    tag: 'ORGANIC FOOD',
    logo: 'https://wepublicise.com/wp-content/uploads/2024/12/Untitled-20.png',
  },
  {
    name: 'Agrow Ayurveda',
    tag: 'WELLNESS',
    logo: 'https://wepublicise.com/wp-content/uploads/2024/12/Untitled-21.png',
  },
  {
    name: 'Nestlé',
    tag: 'GLOBAL FMCG',
    logo: 'https://wepublicise.com/wp-content/uploads/2024/11/client-img12.png',
  },
];

// Testimonials data (Image 3 from new batch)
const testimonials = [
  {
    quote:
      'we Publicise are like family now! They are proactive even if you are struggling to be! They give you genuine advice and take such good care understanding you and your brand! Strongly recommend them for a comfortable and cushioned experience specifically for first-time business owners!',
    name: 'Tuhina Agarwal',
    company: 'KidAble',
    tag: 'D2C Kids Learning',
  },
  {
    quote:
      'The speed of iteration, stunning 2D interactive animations, and deep focus on customer psychology made our product launch an extraordinary success. They truly make your brand memorable in a crowded market.',
    name: 'Siddharth Rao',
    company: 'Woke Nutrition',
    tag: 'Health & FMCG',
  },
  {
    quote:
      'From brand architecture to high-converting interactive digital design, the we Publicise crew exceeded our every expectation with surgical precision.',
    name: 'Rohan Mehra',
    company: 'Avexor Global',
    tag: 'Enterprise Logistics',
  },
];

// Empowering Creativity - 3D Fan Carousel Tools (Brandemic style)
const brandemicTools = [
  {
    name: 'Webflow',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/webflow/webflow-original.svg',
    bgColor: '#146EF5',
    textColor: '#FFFFFF',
    tag: 'Visual Development',
    accentBorder: '#3888FF',
  },
  {
    name: 'WordPress',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/wordpress/wordpress-plain.svg',
    bgColor: '#FFFFFF',
    textColor: '#0073AA',
    tag: 'CMS Architecture',
    accentBorder: '#E5E7EB',
  },
  {
    name: 'Figma',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg',
    bgColor: '#0C0C1E',
    textColor: '#FFFFFF',
    tag: 'UI/UX & Prototyping',
    accentBorder: '#722F37',
  },
  {
    name: 'Adobe Creative Suite',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/photoshop/photoshop-plain.svg',
    bgColor: '#E1251B',
    textColor: '#FFFFFF',
    tag: 'Visual & Motion Design',
    accentBorder: '#FF5C52',
  },
  {
    name: 'Shopify Plus',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/unified/unified-original.svg',
    bgColor: '#002E25',
    textColor: '#FFFFFF',
    tag: 'High-Scale E-Commerce',
    accentBorder: '#008060',
  },
  {
    name: 'Blender 3D',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/blender/blender-original.svg',
    bgColor: '#EA7600',
    textColor: '#FFFFFF',
    tag: '2D & 3D Interactive Assets',
    accentBorder: '#FF9E3B',
  },
];

// FAQ list (Images 1 & 2 from new batch)
const faqs = [
  {
    q: 'Why should I get #BrandedByWePublicise?',
    a: "Because we don't build generic cookie-cutter templates. We fuse behavioral design science, high-performance web engineering, and tactile brand storytelling to give you an unfair advantage in your market.",
  },
  {
    q: 'How long does a typical project take?',
    a: 'A typical end-to-end brand identity and custom web interaction sprint takes between 3 to 6 weeks, depending on the complexity of 2D asset animations and system integration.',
  },
  {
    q: 'What is your pricing structure?',
    a: 'We offer value-based sprint packages tailored to emerging startups and established enterprises. Projects start from flexible tier models ranging from $1,500 to enterprise custom quotes.',
  },
  {
    q: 'What industries do you specialize in?',
    a: 'We specialize in D2C consumer brands, modern technology & SaaS, food & beverage, healthcare, fashion, and lifestyle retail across India, America, and Europe.',
  },
];

const Home = () => {
  // Hero dynamic word rotation
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  // Expandable services state (Image 2 style)
  const [activeService, setActiveService] = useState<number | null>(1);
  // Video modal toggle
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  // Testimonial slider state
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  // FAQ accordion state
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  // Active tool index for 3D fan carousel
  const [activeToolIndex, setActiveToolIndex] = useState(1);

  // Scroll spring progress
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Parallax hook for Section 4 (Team / Ideas into Magic)
  const teamSectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: teamScrollProgress } = useScroll({
    target: teamSectionRef,
    offset: ['start end', 'end start'],
  });

  // Image internal scroll parallax (moves up as you scroll past)
  const teamImageY = useTransform(teamScrollProgress, [0, 1], ['-12%', '12%']);
  const teamImageScale = useTransform(teamScrollProgress, [0, 0.5, 1], [1.18, 1.1, 1.18]);
  const teamCardY = useTransform(teamScrollProgress, [0, 1], [40, -40]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWordIndex((prev) => (prev + 1) % dynamicWords.length);
    }, 2400);
    return () => clearInterval(interval);
  }, []);

  // Auto-cycle the 3D tool carousel every 3.2s
  useEffect(() => {
    const toolTimer = setInterval(() => {
      setActiveToolIndex((prev) => (prev + 1) % brandemicTools.length);
    }, 3200);
    return () => clearInterval(toolTimer);
  }, []);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };
  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <PageWrapper className="pt-0 pb-0 bg-[#0C0708] text-white">
      {/* Top scroll progress indicator bar */}
      <motion.div
        style={{ scaleX }}
        className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#722F37] via-[#9E2A3B] to-[#E24A68] origin-left z-50 pointer-events-none"
      />

      {/* ========================================================================= */}
      {/* 1. HERO (Image 3 from 1st Batch) */}
      {/* ========================================================================= */}
      <section className="relative min-h-screen pt-32 pb-20 px-6 sm:px-8 lg:px-12 flex flex-col justify-center overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[650px] h-[350px] bg-[#722F37]/20 rounded-full blur-[130px] pointer-events-none" />
        <div className="absolute -top-20 -right-20 w-[400px] h-[400px] bg-[#E24A68]/15 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-6xl mx-auto w-full relative z-10">
          <div className="text-left mb-10 max-w-4xl">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.12]"
            >
              A Creative Studio For{' '}
              <br className="hidden sm:inline" />
              Limitless{' '}
              <span className="inline-block relative">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={dynamicWords[currentWordIndex]}
                    initial={{ y: 25, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -25, opacity: 0 }}
                    transition={{ duration: 0.35, ease: 'easeInOut' }}
                    className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-[#E24A68] to-[#FF849B] italic font-serif pr-2"
                  >
                    {dynamicWords[currentWordIndex]}
                  </motion.span>
                </AnimatePresence>
              </span>
            </motion.h1>
          </div>

          {/* 2D Interactive Laptop Video Asset Display */}
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="relative mx-auto rounded-3xl overflow-hidden border border-[#4A1016]/80 bg-gradient-to-b from-[#1E0D10] to-[#0A0506] shadow-2xl shadow-[#722F37]/30 group"
          >
            <div className="relative aspect-[16/9] sm:aspect-[21/9] w-full overflow-hidden flex items-center justify-center bg-black/60">
              <img
                src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1800&q=80"
                alt="Creative 2D Studio Showcase"
                className="w-full h-full object-cover opacity-60 filter contrast-125 saturate-150 transform group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0C0708] via-transparent to-transparent opacity-90" />

              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
                  className="mb-4 p-5 rounded-2xl bg-[#521820]/70 backdrop-blur-md border border-[#E24A68]/40 shadow-xl max-w-md w-full"
                >
                  <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-3">
                    <div className="flex gap-1.5">
                      <span className="w-3 h-3 rounded-full bg-[#E24A68]"></span>
                      <span className="w-3 h-3 rounded-full bg-[#9E2A3B]"></span>
                      <span className="w-3 h-3 rounded-full bg-[#3B0D11]"></span>
                    </div>
                    <span className="text-xs uppercase tracking-widest text-[#E24A68] font-mono">
                      we Publicise :: 2D Core
                    </span>
                  </div>
                  <p className="text-lg sm:text-xl font-black uppercase tracking-wider text-white">
                    Do Not Click On This Button!
                  </p>
                </motion.div>

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsVideoModalOpen(true)}
                  className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-tr from-[#722F37] via-[#9E2A3B] to-[#E24A68] p-[3px] shadow-2xl shadow-[#E24A68]/40 flex items-center justify-center cursor-pointer"
                  aria-label="Play Reel"
                >
                  <div className="w-full h-full rounded-full bg-[#140D0F] flex items-center justify-center hover:bg-[#722F37] transition-colors">
                    <Play
                      size={32}
                      className="text-[#E24A68] ml-1 fill-[#E24A68] hover:text-white hover:fill-white transition-colors"
                    />
                  </div>
                </motion.button>
                <span className="mt-3 text-xs tracking-widest uppercase text-zinc-400 font-mono">
                  Watch Agency Reel
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. ACCORDION SERVICES (Images 1 & 2 from 1st Batch) */}
      {/* ========================================================================= */}
      <section className="py-28 px-6 sm:px-8 lg:px-12 relative overflow-hidden bg-[#0F080A]">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 pb-8 border-b border-[#3B0D11]/60">
            <div className="max-w-2xl">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-4 leading-tight"
              >
                Back To The Simple,{' '}
                <br />
                <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-[#E24A68] to-[#FF849B]">
                  Intuitive And Inspiring.
                </span>
              </motion.h2>
              <p className="text-zinc-400 text-base sm:text-lg leading-relaxed">
                We transform ideas into extraordinary brand experiences. From crafting strategies to delivering seamless designs, here's how we can help.
              </p>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              <Link
                to="/contact"
                className="inline-flex items-center gap-3 px-8 py-3.5 rounded-full border border-[#E24A68]/60 hover:border-[#E24A68] bg-[#3B0D11]/40 hover:bg-[#722F37] text-sm uppercase tracking-wider font-semibold text-white transition-all duration-300 shadow-lg shadow-[#722F37]/20"
              >
                <span>Let's Collaborate</span>
                <ArrowRight size={16} className="text-[#E24A68]" />
              </Link>
            </motion.div>
          </div>

          <div className="space-y-4">
            {servicesData.map((service, index) => {
              const isExpanded = activeService === index;

              return (
                <div
                  key={service.num}
                  onMouseEnter={() => setActiveService(index)}
                  className={`rounded-2xl transition-all duration-300 cursor-pointer overflow-hidden border ${
                    isExpanded
                      ? 'bg-gradient-to-r from-[#5A1C24] via-[#722F37] to-[#4A1016] border-[#E24A68]/60 shadow-2xl shadow-[#722F37]/40'
                      : 'bg-[#1E0D10]/70 hover:bg-[#2A1115] border-[#4A1016]/40 hover:border-[#722F37]'
                  }`}
                >
                  <div className="p-6 sm:p-8">
                    {/* Header Row */}
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <span className="text-xs sm:text-sm font-mono tracking-widest text-zinc-300">
                          {service.num}
                        </span>
                        <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                          {service.title}
                        </h3>
                      </div>
                      <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white text-lg transition-transform duration-300">
                        {isExpanded ? <Minus size={18} /> : <Plus size={18} />}
                      </div>
                    </div>

                    {/* Clean Minimalist White Divider Line - Left to Right Expansion */}
                    <div className="relative w-full h-[1px] mt-6 flex items-center justify-start overflow-hidden">
                      <motion.div
                        initial={false}
                        animate={{
                          scaleX: isExpanded ? 1 : 0,
                          opacity: isExpanded ? 0.6 : 0,
                        }}
                        transition={{
                          duration: 1.1,
                          ease: [0.16, 1, 0.3, 1],
                        }}
                        style={{ originX: 0 }}
                        className="h-full w-full bg-white"
                      />
                    </div>

                    {/* Smooth Zero-Jank Expandable Container */}
                    <div
                      className={`grid transition-[grid-template-rows,opacity] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                        isExpanded
                          ? 'grid-rows-[1fr] opacity-100 pt-6'
                          : 'grid-rows-[0fr] opacity-0'
                      }`}
                    >
                      <div className="overflow-hidden">
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center pb-2">
                          <div className="md:col-span-7 space-y-5">
                            <span className="text-xs uppercase tracking-widest font-bold px-3 py-1 rounded-full bg-black/40 text-[#FF849B] border border-white/10">
                              {service.tag}
                            </span>
                            <p className="text-zinc-200 text-base sm:text-lg leading-relaxed">
                              {service.desc}
                            </p>
                            <Link
                              to="/services"
                              onClick={(e) => e.stopPropagation()}
                              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#0C0708] hover:bg-white hover:text-[#722F37] text-white text-xs uppercase tracking-widest font-bold transition-all duration-300 border border-white/10"
                            >
                              <span>Learn More</span>
                              <ArrowUpRight size={14} />
                            </Link>
                          </div>

                          <div className="md:col-span-5 flex justify-center md:justify-end">
                            <div className="relative w-full max-w-[280px] aspect-[4/3] rounded-xl overflow-hidden border border-white/15 shadow-2xl">
                              <img
                                src={service.image}
                                alt={service.title}
                                className="w-full h-full object-cover"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. FEATURED WORK: CONTINUOUS INFINITE TRAIN LOOP (Right to Left) */}
      {/* ========================================================================= */}
      <section className="py-28 bg-[#0C0708] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 mb-14">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-white mb-3">
                Featured Work
              </h2>
              <p className="text-zinc-400 text-lg">
                Reimagining Creativity for a World That Demands Excellence
              </p>
            </div>
            <Link
              to="/services"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-zinc-700 hover:border-[#E24A68] bg-zinc-900/60 hover:bg-[#722F37]/30 text-xs uppercase tracking-widest font-semibold text-white transition-all w-fit"
            >
              <span>Discover Our Work</span>
              <ArrowRight size={14} className="text-[#E24A68]" />
            </Link>
          </div>
        </div>

        {/* Train Track: Infinite Smooth Loop moving continuously from Right to Left */}
        <div className="relative w-full overflow-hidden select-none py-4">
          {/* Subtle edge gradients for seamless train effect */}
          <div className="absolute left-0 top-0 bottom-0 w-24 sm:w-36 bg-gradient-to-r from-[#0C0708] to-transparent z-20 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 sm:w-36 bg-gradient-to-l from-[#0C0708] to-transparent z-20 pointer-events-none" />

          <motion.div
            animate={{ x: ['0%', '-50%'] }}
            transition={{
              repeat: Infinity,
              duration: 28,
              ease: 'linear',
            }}
            className="flex items-center gap-6 sm:gap-8 w-max"
          >
            {/* Render items twice to ensure a seamless infinite seamless loop */}
            {[...featuredWorks, ...featuredWorks].map((work, idx) => (
              <div
                key={`${work.title}-${idx}`}
                className="group relative flex-shrink-0 w-[300px] sm:w-[380px] md:w-[440px] h-[460px] sm:h-[540px] rounded-3xl overflow-hidden bg-[#180E10] border border-[#3B0D11] hover:border-[#E24A68] transition-all duration-500 shadow-2xl shadow-black/80 cursor-pointer"
              >
                {/* Full-bleed high impact project imagery */}
                <img
                  src={work.image}
                  alt={work.title}
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 filter brightness-95 group-hover:brightness-105"
                />

                {/* Aesthetic dark-wine gradient vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0C0708] via-black/30 to-black/20 group-hover:via-black/20 transition-all duration-500" />

                {/* Top Category Badge */}
                <div className="absolute top-5 left-5 right-5 flex items-center justify-between z-10">
                  <span className="text-[11px] uppercase font-mono tracking-wider px-3.5 py-1.5 rounded-full bg-[#0C0708]/80 backdrop-blur-md text-white border border-white/10 shadow-lg">
                    {work.badge}
                  </span>
                  <div className="w-9 h-9 rounded-full bg-[#0C0708]/70 backdrop-blur-md border border-white/10 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
                    <ArrowUpRight size={18} className="text-[#E24A68]" />
                  </div>
                </div>

                {/* Bottom Card Copy */}
                <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 z-10">
                  <h4 className="text-2xl sm:text-3xl font-bold text-white tracking-tight group-hover:text-[#E24A68] transition-colors mb-1">
                    {work.title}
                  </h4>
                  <p className="text-sm text-zinc-300 font-medium">{work.category}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. TEAM CULTURE: PARALLAX SCROLL EFFECT (Ideas Into Magic) */}
      {/* ========================================================================= */}
      <section
        ref={teamSectionRef}
        className="py-32 px-6 sm:px-8 lg:px-12 bg-gradient-to-b from-[#0F080A] to-[#080405] relative overflow-hidden"
      >
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="mb-14">
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-3">
              We Are Your Design Partners In Turning{' '}
              <br />
              <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-[#E24A68] to-[#FF849B]">
                Ideas Into Magic
              </span>
            </h2>
          </div>

          {/* Parallax Card Container with smooth upward glide */}
          <motion.div
            style={{ y: teamCardY }}
            className="relative rounded-3xl overflow-hidden border border-[#722F37]/50 shadow-2xl shadow-[#722F37]/30 max-w-4xl mx-auto mb-12 group aspect-[16/10]"
          >
            {/* Parallax Image inside that scrolls smoothly inside its frame */}
            <motion.img
              style={{ y: teamImageY, scale: teamImageScale }}
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1800&q=80"
              alt="we Publicise Team"
              className="absolute inset-0 w-full h-full object-cover filter contrast-105"
            />

            {/* Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />

            {/* Card Info Overlay */}
            <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-left z-10">
              <div>
                <p className="text-lg font-bold text-white">The Creators at we Publicise</p>
                <p className="text-xs text-zinc-300">Bengaluru &bull; Worldwide Delivery</p>
              </div>
              <div className="flex items-center gap-2 bg-[#722F37]/80 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 shadow-lg">
                <Sparkles size={14} className="text-[#FF849B]" />
                <span className="text-xs font-semibold text-white">100+ Projects Done</span>
              </div>
            </div>
          </motion.div>

          <Link
            to="/about"
            className="inline-flex items-center gap-3 px-8 py-3.5 rounded-full border border-[#E24A68]/60 hover:border-[#E24A68] bg-[#3B0D11]/40 hover:bg-[#722F37] text-sm uppercase tracking-wider font-semibold text-white transition-all duration-300 shadow-lg shadow-[#722F37]/20"
          >
            <span>Get To Know Us</span>
            <ArrowRight size={16} className="text-[#E24A68]" />
          </Link>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. BEHAVIOR-DRIVEN DESIGN PHILOSOPHY & TRUSTED LOGOS (Image 4 from 2nd Batch) */}
      {/* "Our Work Isn't Just Aesthetically Pleasing, It's Behavior-Driven..." */}
      {/* ========================================================================= */}
      <section className="py-28 px-6 sm:px-8 lg:px-12 bg-[#0C0708] relative border-t border-[#3B0D11]/40">
        <div className="max-w-5xl mx-auto text-center relative z-10 mb-20">
          {/* Floating 2D mockup stickers on sides */}
          <div className="relative inline-block max-w-3xl">
            <motion.div
              animate={{ rotate: [-4, -8, -4], y: [0, -6, 0] }}
              transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut' }}
              className="hidden lg:block absolute -left-32 -top-10 w-28 h-28 rounded-2xl overflow-hidden border border-[#E24A68]/40 shadow-xl shadow-[#722F37]/30"
            >
              <img
                src="https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=400&q=80"
                alt="2D Mockup Packaging"
                className="w-full h-full object-cover"
              />
            </motion.div>

            <motion.div
              animate={{ rotate: [6, 10, 6], y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}
              className="hidden lg:block absolute -right-32 -bottom-6 w-32 h-24 rounded-2xl overflow-hidden border border-[#E24A68]/40 shadow-xl shadow-[#722F37]/30"
            >
              <img
                src="https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=400&q=80"
                alt="2D Mockup Screen"
                className="w-full h-full object-cover"
              />
            </motion.div>

            <h3 className="text-2xl sm:text-4xl font-semibold text-zinc-100 leading-relaxed mb-8">
              Our Work Isn't Just Aesthetically Pleasing, It's{' '}
              <span className="text-[#E24A68] font-bold">Behavior-Driven</span>. We Believe What
              Separates A Good Design From A Great One Is Its Ability To Solve Problems. We Try To
              Design-Think Through Everything We Do At{' '}
              <span className="text-white underline decoration-[#E24A68] decoration-2 underline-offset-4">
                we Publicise
              </span>
              .
            </h3>

            <Link
              to="/services"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full border border-[#E24A68] bg-[#3B0D11]/40 hover:bg-[#722F37] text-xs uppercase tracking-widest font-bold text-white transition-all shadow-lg shadow-[#722F37]/20"
            >
              <span>Discover Our Work</span>
              <ArrowRight size={14} className="text-[#E24A68]" />
            </Link>
          </div>
        </div>

        {/* OUR TRUSTED PARTNERS: Continuous right-to-left logo carousel in a 60% container */}
        <div className="w-full pt-16 border-t border-zinc-900/80">
          <div className="text-center mb-10">
            <span className="text-xs uppercase font-mono tracking-widest text-[#E24A68] block mb-3">
              Our Trusted Partners
            </span>
            <h3 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
              We’ve worked with amazing brands
            </h3>
          </div>

          {/* 72% Optimal Width Container */}
          <div className="w-[92%] sm:w-[85%] lg:w-[72%] max-w-5xl mx-auto relative overflow-hidden py-4">
            {/* Fade vignettes on edges */}
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[#0C0708] to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[#0C0708] to-transparent z-10 pointer-events-none" />

            {/* Continuous Marquee from Right to Left */}
            <motion.div
              animate={{ x: ['0%', '-50%'] }}
              transition={{
                repeat: Infinity,
                duration: 25,
                ease: 'linear',
              }}
              className="flex items-center gap-6 sm:gap-7 w-max"
            >
              {[...ourClients, ...ourClients].map((client, idx) => (
                <div
                  key={`${client.name}-${idx}`}
                  className="bg-white rounded-2xl px-7 py-4 flex items-center justify-center min-w-[190px] sm:min-w-[220px] h-[82px] shadow-lg border border-white/40 flex-shrink-0 group hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
                >
                  <img
                    src={client.logo}
                    alt={client.name}
                    className="max-h-12 w-auto max-w-[170px] object-contain filter contrast-115 group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      const target = e.target as HTMLElement;
                      target.style.display = 'none';
                      if (target.parentElement) {
                        target.parentElement.innerHTML = `<span class="text-gray-900 font-extrabold text-base tracking-tight">${client.name}</span>`;
                      }
                    }}
                  />
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. TESTIMONIALS (Image 3 from 2nd Batch) */}
      {/* "TESTIMONIALS: From Those Who Know Us Best" */}
      {/* ========================================================================= */}
      <section className="py-28 px-6 sm:px-8 lg:px-12 bg-gradient-to-b from-[#0C0708] to-[#12080B] relative overflow-hidden">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs uppercase tracking-widest text-[#E24A68] font-mono block mb-2">
              Testimonials
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
              From Those Who Know Us Best
            </h2>
          </div>

          {/* Testimonial Card */}
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTestimonial}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
                className="bg-[#1A0E12] border border-[#4A1016]/80 rounded-3xl p-8 sm:p-14 shadow-2xl relative overflow-hidden"
              >
                {/* Huge stylized quote mark in the background */}
                <div className="absolute right-8 bottom-6 text-[#722F37]/20 text-9xl font-serif select-none pointer-events-none leading-none">
                  “
                </div>

                <p className="text-lg sm:text-2xl text-zinc-200 leading-relaxed font-light mb-10 relative z-10">
                  "{testimonials[currentTestimonial].quote}"
                </p>

                <div className="flex items-center justify-between pt-6 border-t border-white/10 relative z-10">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-[#722F37] to-[#E24A68] flex items-center justify-center font-bold text-white shadow-md">
                      {testimonials[currentTestimonial].company.substring(0, 2)}
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-white">
                        {testimonials[currentTestimonial].name}
                      </h4>
                      <p className="text-xs text-zinc-400">
                        {testimonials[currentTestimonial].company} &bull;{' '}
                        {testimonials[currentTestimonial].tag}
                      </p>
                    </div>
                  </div>

                  {/* Navigation Arrows */}
                  <div className="flex items-center gap-3">
                    <button
                      onClick={prevTestimonial}
                      className="w-11 h-11 rounded-full border border-zinc-700 hover:border-[#E24A68] bg-[#0C0708] flex items-center justify-center text-zinc-300 hover:text-white transition-colors"
                      aria-label="Previous Testimonial"
                    >
                      <ChevronLeft size={20} />
                    </button>
                    <button
                      onClick={nextTestimonial}
                      className="w-11 h-11 rounded-full border border-zinc-700 hover:border-[#E24A68] bg-[#0C0708] flex items-center justify-center text-zinc-300 hover:text-white transition-colors"
                      aria-label="Next Testimonial"
                    >
                      <ChevronRight size={20} />
                    </button>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 7. TOOLS & MARQUEE COLLABORATION (Image 5 from 2nd Batch) */}
      {/* "Empowering Creativity With The Best Tools" + "Collaborate With we Publicise" Marquee */}
      {/* ========================================================================= */}
      <section className="py-24 px-6 sm:px-8 bg-[#0C0708] relative overflow-hidden border-t border-[#3B0D11]/40">
        <div className="max-w-6xl mx-auto mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 space-y-5">
              <span className="text-xs uppercase font-mono tracking-widest text-[#E24A68] flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#E24A68] animate-pulse"></span>
                Empowering Creativity
              </span>
              <h3 className="text-3xl sm:text-5xl font-bold text-white tracking-tight leading-tight">
                Empowering Creativity With The{' '}
                <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-[#E24A68] to-[#FF849B]">
                  Right Tools
                </span>
              </h3>
              <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
                At we Publicise, we use tools that work as hard as we do. Each one is carefully
                chosen to help bring your brand to life and make the process smoother, smarter and
                more effective. In the hands of our team, these tools aren't just functional —
                they're transformative, shaping every detail from start to finish. Because for us,
                it's not about flashy solutions - it's about getting it right, every time.
              </p>

              {/* Indicator dots for tool cards */}
              <div className="flex items-center gap-2 pt-2">
                {brandemicTools.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveToolIndex(i)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      activeToolIndex === i
                        ? 'w-8 bg-[#E24A68]'
                        : 'w-2 bg-zinc-700 hover:bg-zinc-500'
                    }`}
                    aria-label={`View tool ${i + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* 3D Perspective Fan Carousel matching Brandemic Images 1-4 */}
            <div className="lg:col-span-7 relative h-[360px] sm:h-[420px] flex items-center justify-center [perspective:1200px] overflow-visible">
              <div className="relative w-full max-w-[500px] h-full flex items-center justify-center">
                {brandemicTools.map((tool, idx) => {
                  // Calculate offset from the active card
                  const count = brandemicTools.length;
                  let offset = (idx - activeToolIndex + count) % count;
                  if (offset > count / 2) offset -= count;

                  // Only render cards close to active
                  const isVisible = Math.abs(offset) <= 2;
                  if (!isVisible) return null;

                  const isActive = offset === 0;

                  // 3D positioning matching the screenshots
                  const xOffset = offset * 110; // spread horizontally
                  const zOffset = -Math.abs(offset) * 80; // push background cards back
                  const rotateY = offset * -14; // angled outward like a fan
                  const scale = isActive ? 1.08 : 0.88;
                  const zIndex = 20 - Math.abs(offset) * 5;

                  return (
                    <motion.div
                      key={tool.name}
                      onClick={() => setActiveToolIndex(idx)}
                      animate={{
                        x: xOffset,
                        z: zOffset,
                        rotateY: rotateY,
                        scale: scale,
                      }}
                      transition={{
                        type: 'spring',
                        stiffness: 180,
                        damping: 24,
                      }}
                      style={{
                        zIndex,
                        transformStyle: 'preserve-3d',
                        backgroundColor: tool.bgColor,
                        color: tool.textColor,
                        border: `2px solid ${tool.accentBorder}`,
                        boxShadow: isActive
                          ? `0 25px 60px -15px ${tool.bgColor}99, 0 0 35px ${tool.accentBorder}40`
                          : '0 15px 35px -10px rgba(0,0,0,0.8)',
                      }}
                      className="absolute w-[220px] sm:w-[260px] h-[280px] sm:h-[320px] rounded-3xl p-6 sm:p-8 flex flex-col justify-between cursor-pointer select-none shadow-2xl transition-shadow duration-300 group"
                    >
                      {/* Top Brand Logo */}
                      <div className="flex items-center justify-between">
                        <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md p-2.5 flex items-center justify-center border border-white/20">
                          <img
                            src={tool.logo}
                            alt={tool.name}
                            className="w-full h-full object-contain filter drop-shadow-md"
                          />
                        </div>
                        <span className="text-[10px] uppercase font-mono tracking-wider px-2.5 py-1 rounded-full bg-black/20 backdrop-blur-md border border-white/10 opacity-80">
                          {tool.tag}
                        </span>
                      </div>

                      {/* Main Typography & Logo Title */}
                      <div className="my-auto text-center py-4">
                        <h4
                          className="text-3xl sm:text-4xl font-extrabold tracking-tight"
                          style={{ color: tool.textColor }}
                        >
                          {tool.name}
                        </h4>
                      </div>

                      {/* Bottom Active Pill Indicator */}
                      <div className="flex items-center justify-between pt-2 border-t border-black/10">
                        <span className="text-xs font-mono opacity-80">
                          {isActive ? '✦ In Production' : 'Click to view'}
                        </span>
                        <div
                          className={`w-2.5 h-2.5 rounded-full ${
                            isActive ? 'bg-white animate-ping' : 'bg-white/40'
                          }`}
                        />
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Infinite Kinetic Marquee Bar: "Collaborate With we Publicise ✦" */}
        <div className="relative py-6 bg-gradient-to-r from-[#3B0D11] via-[#722F37] to-[#3B0D11] border-y border-[#E24A68]/40 overflow-hidden select-none -mx-8">
          <motion.div
            animate={{ x: ['0%', '-50%'] }}
            transition={{ repeat: Infinity, duration: 18, ease: 'linear' }}
            className="flex items-center gap-12 whitespace-nowrap text-2xl sm:text-4xl font-black uppercase tracking-wider text-white"
          >
            {[...Array(6)].map((_, i) => (
              <div key={i} className="flex items-center gap-12">
                <span>Collaborate With we Publicise</span>
                <span className="text-[#FF849B]">✦</span>
                <span>Turning Ideas Into Magic</span>
                <span className="text-[#FF849B]">✦</span>
                <span>Limitless Possibilities</span>
                <span className="text-[#FF849B]">✦</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Culture CTA Card: "Be A Part Of The Movement" (Image 5 from 2nd Batch) */}
        <div className="max-w-6xl mx-auto mt-20">
          <div className="rounded-3xl bg-gradient-to-r from-[#5A1C24] via-[#722F37] to-[#4A1016] p-8 sm:p-14 border border-[#E24A68]/60 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-3 max-w-xl">
              <span className="text-xs uppercase font-mono tracking-widest text-[#FF849B]">
                Work With The Best PR & Branding Agency
              </span>
              <h3 className="text-3xl sm:text-4xl font-bold text-white">
                Be A Part Of The Movement
              </h3>
              <p className="text-zinc-200 text-sm sm:text-base leading-relaxed">
                Crafting magical experiences from start to finish is what we love, so if working
                together excites you, then we want you to be a part of our crew.
              </p>
            </div>

            <Link
              to="/contact"
              className="px-8 py-4 rounded-full bg-[#0C0708] hover:bg-white hover:text-[#722F37] text-white font-bold text-xs uppercase tracking-widest transition-all duration-300 border border-white/20 whitespace-nowrap shadow-xl"
            >
              Show Us What You Got
            </Link>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 8. FREQUENTLY ASKED QUESTIONS (Images 1 & 2 from 2nd Batch) */}
      {/* "FREQUENTLY ASKED QUESTIONS: Get Answers To Your Vision Or Our Services" */}
      {/* ========================================================================= */}
      <section className="py-28 px-6 sm:px-8 lg:px-12 bg-[#0C0708] relative border-t border-[#3B0D11]/40">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left Title Column */}
            <div className="lg:col-span-5 space-y-4">
              <span className="text-xs uppercase font-mono tracking-widest text-[#E24A68]">
                Frequently Asked Questions
              </span>
              <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
                Get Answers To Your Vision{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E24A68] to-[#FF849B]">
                  Or Our Services
                </span>
              </h2>
              <p className="text-zinc-400 text-sm sm:text-base leading-relaxed pt-2">
                Everything you need to know about partnering with we Publicise to craft exceptional
                brand identities and digital interactions.
              </p>
            </div>

            {/* Right Accordion FAQ Column */}
            <div className="lg:col-span-7 divide-y divide-zinc-800/80">
              {faqs.map((faq, index) => {
                const isOpen = openFaq === index;
                return (
                  <div key={faq.q} className="py-6">
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : index)}
                      className="w-full flex items-center justify-between text-left group"
                    >
                      <span className="text-lg sm:text-xl font-medium text-white group-hover:text-[#E24A68] transition-colors pr-6">
                        {faq.q}
                      </span>
                      <div className="w-8 h-8 rounded-full border border-zinc-700 flex items-center justify-center text-zinc-400 group-hover:text-white group-hover:border-[#E24A68] transition-colors flex-shrink-0">
                        {isOpen ? <Minus size={16} /> : <Plus size={16} />}
                      </div>
                    </button>

                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="pt-4 text-zinc-400 text-sm sm:text-base leading-relaxed"
                        >
                          {faq.a}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 9. BRANDEMIC FOOTER ACCENT: "Ask AI" + GIANT "THINK LIMITLESS" (Image 1 from 2nd Batch) */}
      {/* ========================================================================= */}
      <section className="pt-20 pb-12 px-6 sm:px-8 lg:px-12 bg-[#080405] border-t border-[#3B0D11]/60 relative overflow-hidden">
        <div className="max-w-6xl mx-auto">
          {/* Top Row: Brand & Ask AI */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8 mb-16">
            <div>
              <Link to="/" className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#722F37] to-[#E24A68] flex items-center justify-center p-[2px]">
                  <div className="w-full h-full bg-[#0C0708] rounded-full flex items-center justify-center">
                    <span className="text-[#E24A68] font-black text-xl italic">w</span>
                  </div>
                </div>
                <span className="text-2xl font-bold tracking-tight text-white">
                  we Publicise
                </span>
              </Link>
              <div className="flex items-center gap-6 text-sm text-zinc-400 mt-4">
                <Link to="/about" className="hover:text-white transition-colors">About Us</Link>
                <Link to="/services" className="hover:text-white transition-colors">Portfolio</Link>
                <Link to="/contact" className="hover:text-white transition-colors">Contact</Link>
                <Link to="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
                <Link to="/terms-and-conditions" className="hover:text-white transition-colors">Terms of Use</Link>
              </div>
            </div>

            {/* "Ask AI About we Publicise" (Image 1 from 2nd Batch) */}
            <div className="space-y-3 sm:text-right">
              <div className="flex items-center sm:justify-end gap-2 text-xs font-mono text-[#E24A68]">
                <span className="w-2 h-2 rounded-full bg-[#E24A68] animate-pulse"></span>
                <span>Ask AI About we Publicise</span>
              </div>
              <div className="flex items-center gap-2">
                {['ChatGPT', 'Claude', 'Perplexity', 'Copilot', 'Gemini'].map((ai) => (
                  <div
                    key={ai}
                    title={ai}
                    className="w-9 h-9 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-[#E24A68] flex items-center justify-center text-zinc-400 hover:text-white text-xs font-mono transition-colors cursor-pointer"
                  >
                    <Bot size={16} />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Email & Connect Today */}
          <div className="flex items-center justify-between text-xs font-mono uppercase tracking-widest text-zinc-400 mb-8">
            <a href="mailto:info@wepublicise.com" className="hover:text-white transition-colors">
              info@wepublicise.com
            </a>
            <Link to="/contact" className="hover:text-[#E24A68] transition-colors">
              Connect Today &rarr;
            </Link>
          </div>

          {/* Giant "THINK LIMITLESS" Typography (Image 1 from 2nd Batch) */}
          <div className="w-full overflow-hidden select-none my-6">
            <h1 className="text-5xl sm:text-7xl md:text-9xl lg:text-[140px] font-black tracking-tighter uppercase text-center text-transparent bg-clip-text bg-gradient-to-b from-[#722F37] via-[#5A1C24] to-[#1E0D10] leading-none">
              Think Limitless
            </h1>
          </div>

          {/* Bottom Bar: Social Icons & Credits */}
          <div className="pt-8 border-t border-zinc-900 flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-zinc-500">
            <p>Made with passion by we Publicise</p>
            <div className="flex items-center gap-5 text-zinc-400 font-mono text-xs">
              <a href="#" className="hover:text-white transition-colors">Instagram</a>
              <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
              <a href="#" className="hover:text-white transition-colors">YouTube</a>
              <a href="#" className="hover:text-white transition-colors">X (Twitter)</a>
              <a href="#" className="hover:text-white transition-colors">Behance</a>
            </div>
          </div>
        </div>
      </section>

      {/* Video Reel Modal */}
      <AnimatePresence>
        {isVideoModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-6"
            onClick={() => setIsVideoModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#140D0F] border border-[#722F37] p-6 rounded-3xl max-w-2xl w-full text-center relative"
            >
              <button
                onClick={() => setIsVideoModalOpen(false)}
                className="absolute top-4 right-4 text-zinc-400 hover:text-white text-xl"
              >
                ✕
              </button>
              <h3 className="text-2xl font-bold text-white mb-2">we Publicise Showreel</h3>
              <p className="text-sm text-zinc-400 mb-6">
                Dynamic 2D Motion & Scroll Interaction Showcase
              </p>
              <div className="aspect-video bg-black rounded-2xl overflow-hidden flex items-center justify-center border border-white/10">
                <iframe
                  className="w-full h-full"
                  src="https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?autoplay=1"
                  title="Showreel"
                  allow="accelerometer; autoplay; clipboard-write-gradient; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </PageWrapper>
  );
};

export default Home;
