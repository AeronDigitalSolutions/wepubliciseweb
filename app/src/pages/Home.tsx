import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useSpring, useTransform, useMotionValue } from 'framer-motion';
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
  Zap,
  ArrowUp,
  Globe,
  Code2,
} from 'lucide-react';
import PageWrapper from '../components/PageWrapper';
import LiquidButton from '../components/LiquidButton';

// Rotating dynamic hero words
const dynamicWords = [
  'Websites',
  'Software',
  'Digital Growth',
  'Web Apps',
  'Campaigns',
];

// Interactive Accordion Services (Images 1 & 2)
const servicesData = [
  {
    num: '01.',
    title: 'Brand Identity & Strategy',
    desc: 'We craft comprehensive visual systems, distinct brand positioning, and digital design languages that build credibility, command premium authority, and accelerate customer acquisition.',
    tag: 'STRATEGY & IDENTITY',
    metrics: '+280% Brand Recall',
    deliverables: ['Design Systems', 'Brand Guidelines', 'Typography & Voice', 'Packaging & 2D Assets'],
    image: 'https://images.unsplash.com/photo-1600132806370-bf17e65e942f?auto=format&fit=crop&w=1200&q=80',
  },
  {
    num: '02.',
    title: 'Website & Web Application Development',
    desc: 'Bespoke, high-converting websites and modern web applications engineered with clean code, lightning speeds, 60fps micro-interactions, and seamless responsive design.',
    tag: 'WEBSITE DEVELOPMENT',
    metrics: '<0.4s Median Latency',
    deliverables: ['Next.js & Vite SPAs', 'Framer Motion & WebGL', 'Headless CMS', 'Conversion Architecture'],
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80',
  },
  {
    num: '03.',
    title: 'Software & SaaS Product Engineering',
    desc: 'Robust software architectures, intuitive cloud dashboard interfaces, high-scale database pipelines, and scalable API platforms crafted for venture-backed companies.',
    tag: 'SOFTWARE DEVELOPMENT',
    metrics: '99.99% Uptime Reliability',
    deliverables: ['SaaS Platforms', 'Cloud Dashboards', 'REST & GraphQL APIs', 'Security & Scalability'],
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
  },
  {
    num: '04.',
    title: 'Performance & Digital Marketing',
    desc: 'Data-backed PPC ad campaigns, Search Engine Optimization (SEO), and targeted social marketing designed to dominate search intent, lower CPA, and deliver verified ROI.',
    tag: 'DIGITAL MARKETING',
    metrics: '4.8x Average ROAS',
    deliverables: ['Performance PPC Ads', 'Technical SEO Domination', 'Full-Funnel CRO', 'Omnichannel Retargeting'],
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
  },
];

// Featured works - Train Carousel of high-impact visuals
const featuredWorks = [
  {
    id: 'pulsegrowth',
    title: 'PulseGrowth Ads',
    category: 'Performance Marketing & PPC Scale',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1000&q=80',
    badge: 'Digital Marketing',
    year: '2026',
    result: '+340% ROAS Scale',
    summary: 'A precision full-funnel digital marketing engine for modern brands generating multimillion customer acquisitions.',
  },
  {
    id: 'nexora',
    title: 'Nexora Platform',
    category: 'Custom Web Application & UI/UX Design',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1000&q=80',
    badge: 'Website Development',
    year: '2025',
    result: '0.38s Load Speed',
    summary: 'A bespoke high-performance web experience engineered with Framer Motion, TypeScript, and micro-interactions.',
  },
  {
    id: 'cloudscale',
    title: 'CloudScale SaaS',
    category: 'Enterprise Cloud Architecture & APIs',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1000&q=80',
    badge: 'Software Development',
    year: '2026',
    result: '10M+ Events/Day',
    summary: 'Cloud-native multi-tenant analytics platform with real-time telemetry and sub-millisecond response rates.',
  },
  {
    id: 'omnivibe',
    title: 'OmniVibe Media',
    category: 'Social Media Strategy & Paid Acquisition',
    image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=1000&q=80',
    badge: 'Digital Marketing',
    year: '2025',
    result: '14.2M Impressions',
    summary: 'Viral campaign architecture across multi-channel video funnels delivering measurable engagement lift.',
  },
  {
    id: 'apex',
    title: 'Apex E-Commerce',
    category: 'Headless Web Store & High-Speed Checkout',
    image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1000&q=80',
    badge: 'Website Development',
    year: '2026',
    result: '+68% Conversion Rate',
    summary: 'Next-generation headless commerce storefront featuring sub-second checkout and bespoke interactive 3D product previews.',
  },
  {
    id: 'finedge',
    title: 'FinEdge Core',
    category: 'Fintech Software Platform & Mobile Analytics',
    image: 'https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?auto=format&fit=crop&w=1000&q=80',
    badge: 'Software Development',
    year: '2025',
    result: '$42M Managed AUM',
    summary: 'Banking-grade financial dashboards with institutional compliance, biometric security, and responsive data visualization.',
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

// Testimonials data
const testimonials = [
  {
    quote:
      'we Publicise are like family now! They are proactive even if you are struggling to be! They give you genuine advice and take such good care understanding you and your brand! Strongly recommend them for a comfortable and cushioned experience specifically for ambitious founders!',
    name: 'Tuhina Agarwal',
    company: 'KidAble',
    tag: 'D2C Tech Learning',
    score: '5.0 / 5.0',
    metric: '+310% Enrollment Lift',
  },
  {
    quote:
      'The speed of iteration, stunning 2D interactive animations, and deep focus on customer psychology made our product launch an extraordinary success. They truly make your brand memorable in a crowded market.',
    name: 'Siddharth Rao',
    company: 'Woke Nutrition',
    tag: 'Modern Consumer Tech',
    score: '5.0 / 5.0',
    metric: '12.4x Launch ROAS',
  },
  {
    quote:
      'From brand architecture to high-converting interactive digital design, the we Publicise crew exceeded our every expectation with surgical precision.',
    name: 'Rohan Mehra',
    company: 'Avexor Global',
    tag: 'Enterprise Logistics',
    score: '5.0 / 5.0',
    metric: '$18M Pipeline Influenced',
  },
];

// Empowering Creativity - 3D Fan Carousel Tools
const brandemicTools = [
  {
    name: 'Webflow',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/webflow/webflow-original.svg',
    bgColor: '#146EF5',
    textColor: '#FFFFFF',
    tag: 'Visual Development',
    accentBorder: '#3888FF',
    desc: 'High-speed staging, expressive interactions, and clean semantic output.',
  },
  {
    name: 'WordPress',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/wordpress/wordpress-plain.svg',
    bgColor: '#FFFFFF',
    textColor: '#0073AA',
    tag: 'CMS Architecture',
    accentBorder: '#E5E7EB',
    desc: 'Enterprise content workflows and headless API publishing at scale.',
  },
  {
    name: 'Figma',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg',
    bgColor: '#0C0C1E',
    textColor: '#FFFFFF',
    tag: 'UI/UX & Prototyping',
    accentBorder: '#800020',
    desc: 'Design systems, tokens, and micro-interaction wireframing.',
  },
  {
    name: 'Adobe Creative Suite',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/photoshop/photoshop-plain.svg',
    bgColor: '#E1251B',
    textColor: '#FFFFFF',
    tag: 'Visual & Motion Design',
    accentBorder: '#FF5C52',
    desc: 'High-resolution art direction, kinetic video assets, and typography.',
  },
  {
    name: 'Shopify Plus',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/unified/unified-original.svg',
    bgColor: '#002E25',
    textColor: '#FFFFFF',
    tag: 'High-Scale E-Commerce',
    accentBorder: '#008060',
    desc: 'Custom liquid themes, headless checkout, and multi-currency operations.',
  },
  {
    name: 'Blender 3D',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/blender/blender-original.svg',
    bgColor: '#EA7600',
    textColor: '#FFFFFF',
    tag: '2D & 3D Interactive Assets',
    accentBorder: '#FF9E3B',
    desc: 'Photorealistic asset rendering, WebGL meshes, and motion realism.',
  },
];

// FAQ list
const faqs = [
  {
    q: 'Why should I get #BrandedByWePublicise?',
    a: "Because we don't build generic cookie-cutter templates. We fuse behavioral design science, high-performance web engineering, and tactile brand storytelling to give you an unfair competitive advantage in your market.",
  },
  {
    q: 'How long does a typical project take?',
    a: 'A typical end-to-end brand identity and custom web interaction sprint takes between 3 to 6 weeks, depending on the complexity of custom features, 2D/3D asset animations, and system integrations.',
  },
  {
    q: 'What is your pricing structure?',
    a: 'We offer value-based sprint packages tailored to emerging startups and established enterprises. Projects start from flexible tier models ranging from $1,500 to enterprise custom quotes.',
  },
  {
    q: 'What industries do you specialize in?',
    a: 'We specialize in modern technology & SaaS, D2C consumer brands, fintech, healthcare, and high-growth digital businesses worldwide across India, America, the UK, and Europe.',
  },
];

// Studio proof metrics
const studioMetrics = [
  { value: '99.4%', label: 'Client Retention Score', sub: 'Calculated over 4+ years of sprints' },
  { value: '120+', label: 'Products & Systems Shipped', sub: 'Websites, software & brand systems' },
  { value: '$180M+', label: 'Pipeline Value Influenced', sub: 'Client fundraising & commerce volume' },
  { value: '<0.4s', label: 'Median Web Core Performance', sub: 'Observed across global CDN benchmarks' },
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
  // Quick project preview modal
  const [selectedProject, setSelectedProject] = useState<typeof featuredWorks[0] | null>(null);
  // AI prompt copied toast
  const [copiedPrompt, setCopiedPrompt] = useState<string | null>(null);
  // Live clock state
  const [currentTime, setCurrentTime] = useState<string>('');

  // Ambient mouse cursor tracking for organic burgundy spotlight
  const mouseX = useMotionValue(-1000);
  const mouseY = useMotionValue(-1000);
  const smoothMouseX = useSpring(mouseX, { stiffness: 120, damping: 25 });
  const smoothMouseY = useSpring(mouseY, { stiffness: 120, damping: 25 });

  // Hero 3D Card tilt motion values
  const heroCardRotateX = useMotionValue(0);
  const heroCardRotateY = useMotionValue(0);
  const smoothHeroRotateX = useSpring(heroCardRotateX, { stiffness: 150, damping: 20 });
  const smoothHeroRotateY = useSpring(heroCardRotateY, { stiffness: 150, damping: 20 });

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
  const teamCardY = useTransform(teamScrollProgress, [0, 1], [50, -50]);

  // Bottom "THINK LIMITLESS" kinetic typography parallax
  const limitlessRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: limitlessScrollProgress } = useScroll({
    target: limitlessRef,
    offset: ['start end', 'end start'],
  });
  const limitlessLetterSpacing = useTransform(limitlessScrollProgress, [0, 1], ['-0.06em', '0.04em']);
  const limitlessScale = useTransform(limitlessScrollProgress, [0, 0.5, 1], [0.92, 1.05, 0.98]);

  // Live time ticker in Bangalore (IST)
  useEffect(() => {
    const updateTime = () => {
      try {
        const timeStr = new Intl.DateTimeFormat('en-US', {
          timeZone: 'Asia/Kolkata',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
        }).format(new Date());
        setCurrentTime(`${timeStr} IST`);
      } catch {
        setCurrentTime('18:45:00 IST');
      }
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Global mouse position listener for ambient burgundy lighting
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  // Dynamic hero word rotation
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

  // Auto-cycle testimonials every 7 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };
  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  // Hero Card Mouse Tilt Calculator
  const handleHeroCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    // Map to angles
    const rotateXValue = ((y - centerY) / centerY) * -9; // Max 9 deg
    const rotateYValue = ((x - centerX) / centerX) * 9;
    heroCardRotateX.set(rotateXValue);
    heroCardRotateY.set(rotateYValue);
  };

  const handleHeroCardMouseLeave = () => {
    heroCardRotateX.set(0);
    heroCardRotateY.set(0);
  };

  // Copy AI prompt to clipboard
  const handleCopyPrompt = (bot: string) => {
    const promptText = `Analyze why "we Publicise" is recognized as an international-level creative branding and web engineering agency. Detail their behavioral design methodology, 60fps micro-interaction architecture, and why top startups partner with them for rebrands and software platforms.`;
    navigator.clipboard.writeText(promptText);
    setCopiedPrompt(`Prompt copied for ${bot}! Paste it into ${bot}.`);
    setTimeout(() => setCopiedPrompt(null), 3500);
  };

  return (
    <PageWrapper className="pt-0 pb-0 bg-[#0C0708] text-white relative selection:bg-[#800020] selection:text-white">
      {/* 1. Film Grain Analog Overlay for Cinematic Agency Depth */}
      <div className="fixed inset-0 pointer-events-none z-30 opacity-40 film-grain" />

      {/* 2. Ambient Interactive Burgundy Cursor Spotlight */}
      <motion.div
        style={{
          x: smoothMouseX,
          y: smoothMouseY,
        }}
        className="fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] rounded-full bg-radial from-[#800020]/25 via-[#4A0514]/10 to-transparent blur-[100px] pointer-events-none z-10 transition-opacity duration-300"
      />

      {/* 3. Top scroll progress indicator bar */}
      <motion.div
        style={{ scaleX }}
        className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#800020] via-[#94102D] to-[#B81D42] origin-left z-50 pointer-events-none shadow-[0_0_12px_#B81D42]"
      />

      {/* 4. Live Studio Telemetry Ribbon (Top Nav Accent) */}
      <header className="pt-24 pb-2 px-6 sm:px-8 border-b border-[#38040F]/50 text-[11px] font-mono tracking-widest uppercase text-zinc-400 bg-[#0C0708]/80 backdrop-blur-md relative z-20">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#800020]/40 text-[#D83A60] border border-[#B81D42]/30">
              <span className="w-1.5 h-1.5 rounded-full bg-[#B81D42] animate-ping" />
              <span>Studio Active</span>
            </span>
            <span className="text-zinc-500">|</span>
            <span className="text-zinc-300">Bengaluru HQ &bull; {currentTime || '18:45:00 IST'}</span>
          </div>

          <div className="flex items-center gap-6">
            <span className="hidden md:inline text-zinc-400">
              ✦ Sprints Booking Open for Q2 / Q3 2026
            </span>
            <div className="flex items-center gap-2 text-zinc-300">
              <Globe size={13} className="text-[#B81D42]" />
              <span>NYC &bull; LDN &bull; BLR &bull; DXB</span>
            </div>
          </div>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* 1. HERO: INTERNATIONAL CREATIVE STUDIO ENTRANCE */}
      {/* ========================================================================= */}
      <section className="relative min-h-[92vh] pt-14 pb-20 px-6 sm:px-8 lg:px-12 flex flex-col justify-center overflow-hidden">
        {/* Ambient Gradient Flares */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[720px] h-[380px] bg-[#800020]/22 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute -top-24 -right-24 w-[480px] h-[480px] bg-[#B81D42]/15 rounded-full blur-[160px] pointer-events-none" />
        <div className="absolute bottom-10 -left-20 w-[420px] h-[420px] bg-[#38040F]/30 rounded-full blur-[150px] pointer-events-none" />

        <div className="max-w-6xl mx-auto w-full relative z-10">
          {/* Top Status Capsule */}
          <motion.div
            initial={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="mb-8"
          >
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#13070A]/80 border border-[#B81D42]/40 backdrop-blur-xl shadow-lg shadow-[#800020]/20">
              <Sparkles size={14} className="text-[#D83A60] animate-pulse" />
              <span className="text-xs uppercase font-mono tracking-widest text-zinc-200">
                World-Class Digital Perception & Software Craft
              </span>
            </div>
          </motion.div>

          {/* Master Kinetic Typography */}
          <div className="text-left mb-12 max-w-5xl">
            <motion.h1
              initial={{ opacity: 0, y: 40, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-white leading-[1.08]"
            >
              A Creative Studio For{' '}
              <br />
              Limitless{' '}
              <span className="inline-block relative">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={dynamicWords[currentWordIndex]}
                    initial={{ y: 35, opacity: 0, filter: 'blur(6px)', rotateX: -45 }}
                    animate={{ y: 0, opacity: 1, filter: 'blur(0px)', rotateX: 0 }}
                    exit={{ y: -35, opacity: 0, filter: 'blur(6px)', rotateX: 45 }}
                    transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
                    className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-[#B81D42] via-[#E03A64] to-[#D83A60] italic font-serif pr-3"
                  >
                    {dynamicWords[currentWordIndex]}
                  </motion.span>
                </AnimatePresence>
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
              className="mt-6 text-zinc-300 text-lg sm:text-xl md:text-2xl max-w-3xl font-light leading-relaxed"
            >
              We craft high-impact brand identities, lightning-fast digital storefronts, and conversion-engineered software products for ambitious founders worldwide.
            </motion.p>
          </div>

          {/* 3D Interactive Monitor with Mouse Tilt Physics */}
          <motion.div
            initial={{ opacity: 0, y: 60, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            onMouseMove={handleHeroCardMouseMove}
            onMouseLeave={handleHeroCardMouseLeave}
            style={{
              rotateX: smoothHeroRotateX,
              rotateY: smoothHeroRotateY,
              transformStyle: 'preserve-3d',
              perspective: 1200,
            }}
            className="relative mx-auto rounded-3xl overflow-visible border border-[#4A0514]/80 bg-gradient-to-b from-[#18070B] to-[#0A0406] shadow-2xl shadow-[#800020]/40 group cursor-pointer"
          >
            {/* Outer Specular Rim Glow */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-[#800020] via-[#B81D42]/60 to-[#800020] rounded-3xl blur-md opacity-40 group-hover:opacity-80 transition-opacity duration-700 -z-10" />

            {/* Floating 2.5D Badge Stickers */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
              className="hidden md:flex absolute -left-8 -top-8 items-center gap-2.5 px-4 py-2 rounded-2xl bg-[#13070A]/90 border border-[#B81D42]/50 shadow-2xl shadow-black/80 backdrop-blur-xl z-30 pointer-events-none"
            >
              <Zap size={14} className="text-[#D83A60]" />
              <span className="text-xs font-mono font-bold text-white tracking-wider">
                60fps Interactive Motion
              </span>
            </motion.div>

            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 4.5, ease: 'easeInOut' }}
              className="hidden md:flex absolute -right-6 -bottom-6 items-center gap-2.5 px-4 py-2 rounded-2xl bg-[#13070A]/90 border border-[#B81D42]/50 shadow-2xl shadow-black/80 backdrop-blur-xl z-30 pointer-events-none"
            >
              <Code2 size={14} className="text-[#D83A60]" />
              <span className="text-xs font-mono font-bold text-white tracking-wider">
                Next.js &bull; Framer &bull; Vite
              </span>
            </motion.div>

            {/* Showcase Video Canvas / Frame */}
            <div className="relative aspect-[16/9] sm:aspect-[21/9] w-full rounded-3xl overflow-hidden flex items-center justify-center bg-black/70">
              <img
                src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1800&q=80"
                alt="Creative 2D Studio Showcase"
                className="w-full h-full object-cover opacity-60 filter contrast-125 saturate-150 transform group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0C0708] via-transparent to-black/30 opacity-90" />

              {/* Specular Glare Bar */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 z-20">
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
                  className="mb-5 p-5 rounded-2xl bg-[#540A1D]/80 backdrop-blur-md border border-[#B81D42]/40 shadow-2xl max-w-md w-full"
                >
                  <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-3">
                    <div className="flex gap-1.5">
                      <span className="w-3 h-3 rounded-full bg-[#B81D42]" />
                      <span className="w-3 h-3 rounded-full bg-[#94102D]" />
                      <span className="w-3 h-3 rounded-full bg-[#38040F]" />
                    </div>
                    <span className="text-xs uppercase tracking-widest text-[#D83A60] font-mono">
                      we Publicise :: 2D Core Showreel
                    </span>
                  </div>
                  <p className="text-lg sm:text-xl font-black uppercase tracking-wider text-white">
                    Do Not Click On This Button!
                  </p>
                </motion.div>

                {/* Acoustic Pulsing Play Reel Trigger */}
                <div className="relative">
                  <motion.div
                    animate={{ scale: [1, 1.35, 1], opacity: [0.5, 0, 0.5] }}
                    transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
                    className="absolute -inset-4 rounded-full border border-[#B81D42] pointer-events-none"
                  />
                  <motion.button
                    whileHover={{ scale: 1.12 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsVideoModalOpen(true)}
                    className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-tr from-[#800020] via-[#94102D] to-[#B81D42] p-[3px] shadow-2xl shadow-[#B81D42]/50 flex items-center justify-center cursor-pointer relative z-10"
                    aria-label="Play Reel"
                  >
                    <div className="w-full h-full rounded-full bg-[#13070A] flex items-center justify-center hover:bg-[#800020] transition-colors">
                      <Play
                        size={32}
                        className="text-[#B81D42] ml-1 fill-[#B81D42] hover:text-white hover:fill-white transition-colors"
                      />
                    </div>
                  </motion.button>
                </div>
                <span className="mt-4 text-xs tracking-widest uppercase text-zinc-300 font-mono flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#B81D42] animate-ping" />
                  Watch Agency Showreel
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. PROVEN METRICS TICKER STRIP */}
      {/* ========================================================================= */}
      <section className="py-12 px-6 sm:px-8 border-y border-[#38040F]/60 bg-[#13070A]/50 relative z-10">
        <div className="max-w-6xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8">
          {studioMetrics.map((metric, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="space-y-1.5 text-center sm:text-left border-l border-[#800020]/40 pl-6"
            >
              <div className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-100 to-[#D83A60]">
                  {metric.value}
                </span>
              </div>
              <p className="text-xs sm:text-sm font-bold text-zinc-200">{metric.label}</p>
              <p className="text-[11px] text-zinc-500 font-mono">{metric.sub}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. ACCORDION SERVICES: LUXURY BURGUNDY CARDS & EXPANDING HAIRLINE */}
      {/* ========================================================================= */}
      <section className="py-32 px-6 sm:px-8 lg:px-12 relative overflow-hidden bg-[#0E0507]">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 pb-8 border-b border-[#38040F]/60">
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.7 }}
              className="max-w-2xl"
            >
              <span className="text-xs uppercase font-mono tracking-widest text-[#B81D42] block mb-2">
                Core Capabilities & Architecture
              </span>
              <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-4 leading-tight">
                Back To The Simple,{' '}
                <br />
                <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-[#B81D42] to-[#D83A60]">
                  Intuitive And Inspiring.
                </span>
              </h2>
              <p className="text-zinc-400 text-base sm:text-lg leading-relaxed">
                We transform ambitious ideas into extraordinary brand experiences. From strategic architecture to bespoke code, here's how we build authority.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.5 }}
            >
              <LiquidButton
                to="/contact"
                className="gap-3 border-[#B81D42]/60 bg-[#38040F]/40 text-sm uppercase tracking-wider font-semibold text-white shadow-lg shadow-[#800020]/20 group"
              >
                <span>Let's Collaborate</span>
                <ArrowRight size={16} className="text-[#B81D42] group-hover:text-white transition-colors" />
              </LiquidButton>
            </motion.div>
          </div>

          <div className="space-y-4">
            {servicesData.map((service, index) => {
              const isExpanded = activeService === index;

              return (
                <motion.div
                  key={service.num}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, amount: 0.15 }}
                  transition={{ duration: 0.6, delay: index * 0.08 }}
                  onMouseEnter={() => setActiveService(index)}
                  className={`rounded-2xl transition-all duration-300 cursor-pointer overflow-hidden border ${
                    isExpanded
                      ? 'bg-[#4A0514] border-[#B81D42]/50 shadow-2xl shadow-[#4A0514]/40'
                      : 'bg-[#18070B]/70 hover:bg-[#260710] border-[#4A0514]/40 hover:border-[#800020]'
                  }`}
                >
                  <div className="p-6 sm:p-8">
                    {/* Header Row */}
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center gap-3">
                          <span className="text-xs sm:text-sm font-mono tracking-widest text-zinc-300">
                            {service.num}
                          </span>
                          <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-full bg-white/10 text-[#D83A60]">
                            {service.metrics}
                          </span>
                        </div>
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
                            <span className="text-xs uppercase tracking-widest font-bold px-3 py-1 rounded-full bg-black/40 text-[#D83A60] border border-white/10">
                              {service.tag}
                            </span>
                            <p className="text-zinc-200 text-base sm:text-lg leading-relaxed">
                              {service.desc}
                            </p>

                            {/* Deliverables Chip Matrix */}
                            <div className="flex flex-wrap gap-2 pt-1">
                              {service.deliverables.map((item, dIdx) => (
                                <span
                                  key={dIdx}
                                  className="text-xs px-3 py-1 rounded-lg bg-black/30 border border-white/10 text-zinc-300"
                                >
                                  ✦ {item}
                                </span>
                              ))}
                            </div>

                            <div className="pt-2">
                              <LiquidButton
                                to="/services"
                                onClick={(e) => e.stopPropagation()}
                                size="sm"
                                className="gap-2 bg-[#0C0708] border-white/15 text-white text-xs uppercase tracking-widest font-bold shadow-md"
                              >
                                <span>Learn More</span>
                                <ArrowUpRight size={14} />
                              </LiquidButton>
                            </div>
                          </div>

                          <div className="md:col-span-5 flex justify-center md:justify-end">
                            <div className="relative w-full max-w-[320px] aspect-[4/3] rounded-2xl overflow-hidden border border-white/15 shadow-2xl group/img">
                              <img
                                src={service.image}
                                alt={service.title}
                                className="w-full h-full object-cover group-hover/img:scale-108 transition-transform duration-700"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                              <div className="absolute bottom-3 left-3 px-3 py-1 rounded-md bg-[#13070A]/80 backdrop-blur-md text-[11px] font-mono text-white">
                                Verified Architecture
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. FEATURED WORK: CONTINUOUS INFINITE TRAIN TRACK WITH PAUSE ON HOVER */}
      {/* ========================================================================= */}
      <section className="py-28 bg-[#0C0708] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 mb-14">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.7 }}
            >
              <span className="text-xs uppercase font-mono tracking-widest text-[#B81D42] block mb-2">
                Selected Client Work
              </span>
              <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-white mb-3">
                Featured Work
              </h2>
              <p className="text-zinc-400 text-lg">
                Reimagining Creativity for a World That Demands Excellence
              </p>
            </motion.div>
            <LiquidButton
              to="/services"
              size="sm"
              className="gap-2 border-zinc-700 bg-zinc-900/60 text-white text-xs uppercase tracking-widest font-semibold w-fit group"
            >
              <span>Discover Our Work</span>
              <ArrowRight size={14} className="text-[#B81D42] group-hover:text-white transition-colors" />
            </LiquidButton>
          </div>
        </div>

        {/* Train Track: Infinite Smooth Loop moving continuously from Right to Left */}
        <div className="relative w-full overflow-hidden select-none py-4 group/train">
          {/* Subtle edge vignettes for seamless train effect */}
          <div className="absolute left-0 top-0 bottom-0 w-24 sm:w-44 bg-gradient-to-r from-[#0C0708] to-transparent z-20 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 sm:w-44 bg-gradient-to-l from-[#0C0708] to-transparent z-20 pointer-events-none" />

          <motion.div
            animate={{ x: ['0%', '-50%'] }}
            transition={{
              repeat: Infinity,
              duration: 32,
              ease: 'linear',
            }}
            className="flex items-center gap-6 sm:gap-8 w-max group-hover/train:[animation-play-state:paused]"
          >
            {/* Render items twice to ensure a seamless infinite loop */}
            {[...featuredWorks, ...featuredWorks].map((work, idx) => (
              <div
                key={`${work.id}-${idx}`}
                onClick={() => setSelectedProject(work)}
                className="group relative flex-shrink-0 w-[300px] sm:w-[380px] md:w-[440px] h-[460px] sm:h-[540px] rounded-3xl overflow-hidden bg-[#18070B] border border-[#38040F] hover:border-[#B81D42] transition-all duration-500 shadow-2xl shadow-black/80 cursor-pointer"
              >
                {/* Full-bleed high impact project imagery */}
                <img
                  src={work.image}
                  alt={work.title}
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 filter brightness-95 group-hover:brightness-105"
                />

                {/* Aesthetic dark-wine gradient vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0C0708] via-black/30 to-black/20 group-hover:via-black/15 transition-all duration-500" />

                {/* Top Category Badge & Metrics */}
                <div className="absolute top-5 left-5 right-5 flex items-center justify-between z-10">
                  <span className="text-[11px] uppercase font-mono tracking-wider px-3.5 py-1.5 rounded-full bg-[#0C0708]/80 backdrop-blur-md text-white border border-white/10 shadow-lg">
                    {work.badge}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono uppercase px-2.5 py-1 rounded-full bg-[#800020]/70 text-[#D83A60] border border-[#B81D42]/40 backdrop-blur-md">
                      {work.result}
                    </span>
                    <div className="w-9 h-9 rounded-full bg-[#0C0708]/70 backdrop-blur-md border border-white/10 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
                      <ArrowUpRight size={18} className="text-[#B81D42]" />
                    </div>
                  </div>
                </div>

                {/* Bottom Card Copy */}
                <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 z-10">
                  <div className="text-xs font-mono text-[#D83A60] mb-1">{work.year} &bull; Case Study</div>
                  <h4 className="text-2xl sm:text-3xl font-bold text-white tracking-tight group-hover:text-[#B81D42] transition-colors mb-2">
                    {work.title}
                  </h4>
                  <p className="text-sm text-zinc-300 font-medium mb-3">{work.category}</p>
                  <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {work.summary}
                  </p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. TEAM CULTURE & PARALLAX SCROLL: "IDEAS INTO MAGIC" */}
      {/* ========================================================================= */}
      <section
        ref={teamSectionRef}
        className="py-32 px-6 sm:px-8 lg:px-12 bg-gradient-to-b from-[#0E0507] to-[#080405] relative overflow-hidden"
      >
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.8 }}
            className="mb-14"
          >
            <span className="text-xs uppercase font-mono tracking-widest text-[#B81D42] block mb-3">
              The Collective Mind
            </span>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-3">
              We Are Your Design Partners In Turning{' '}
              <br />
              <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-[#B81D42] to-[#D83A60]">
                Ideas Into Magic
              </span>
            </h2>
          </motion.div>

          {/* Parallax Card Container with smooth upward glide */}
          <motion.div
            style={{ y: teamCardY }}
            className="relative rounded-3xl overflow-hidden border border-[#800020]/50 shadow-2xl shadow-[#800020]/30 max-w-4xl mx-auto mb-12 group aspect-[16/10]"
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
              <div className="flex items-center gap-2 bg-[#800020]/80 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 shadow-lg">
                <Sparkles size={14} className="text-[#D83A60]" />
                <span className="text-xs font-semibold text-white">100+ Projects Done</span>
              </div>
            </div>
          </motion.div>

          <LiquidButton
            to="/about"
            className="gap-3 border-[#B81D42]/60 bg-[#38040F]/40 text-sm uppercase tracking-wider font-semibold text-white shadow-lg shadow-[#800020]/20 group"
          >
            <span>Get To Know Us</span>
            <ArrowRight size={16} className="text-[#B81D42] group-hover:text-white transition-colors" />
          </LiquidButton>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. BEHAVIOR-DRIVEN DESIGN PHILOSOPHY & TRUSTED CLIENT LOGOS (72% Container) */}
      {/* ========================================================================= */}
      <section className="py-28 px-6 sm:px-8 lg:px-12 bg-[#0C0708] relative border-t border-[#38040F]/40">
        <div className="max-w-5xl mx-auto text-center relative z-10 mb-20">
          {/* Floating 2D mockup stickers on sides */}
          <div className="relative inline-block max-w-3xl">
            <motion.div
              animate={{ rotate: [-4, -8, -4], y: [0, -6, 0] }}
              transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut' }}
              className="hidden lg:block absolute -left-32 -top-10 w-28 h-28 rounded-2xl overflow-hidden border border-[#B81D42]/40 shadow-xl shadow-[#800020]/30"
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
              className="hidden lg:block absolute -right-32 -bottom-6 w-32 h-24 rounded-2xl overflow-hidden border border-[#B81D42]/40 shadow-xl shadow-[#800020]/30"
            >
              <img
                src="https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=400&q=80"
                alt="2D Mockup Screen"
                className="w-full h-full object-cover"
              />
            </motion.div>

            <motion.h3
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.8 }}
              className="text-2xl sm:text-4xl font-semibold text-zinc-100 leading-relaxed mb-8"
            >
              Our Work Isn't Just Aesthetically Pleasing, It's{' '}
              <span className="text-[#B81D42] font-bold">Behavior-Driven</span>. We Believe What
              Separates A Good Design From A Great One Is Its Ability To Solve Problems. We Try To
              Design-Think Through Everything We Do At{' '}
              <span className="text-white underline decoration-[#B81D42] decoration-2 underline-offset-4">
                we Publicise
              </span>
              .
            </motion.h3>

            <LiquidButton
              to="/services"
              className="gap-2 border-[#B81D42] bg-[#38040F]/40 text-xs uppercase tracking-widest font-bold text-white shadow-lg shadow-[#800020]/20 group"
            >
              <span>Discover Our Work</span>
              <ArrowRight size={14} className="text-[#B81D42] group-hover:text-white transition-colors" />
            </LiquidButton>
          </div>
        </div>

        {/* OUR TRUSTED PARTNERS: Continuous right-to-left logo carousel in a 72% container */}
        <div className="w-full pt-16 border-t border-zinc-900/80">
          <div className="text-center mb-10">
            <span className="text-xs uppercase font-mono tracking-widest text-[#B81D42] block mb-3">
              Our Trusted Partners
            </span>
            <h3 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
              We’ve worked with amazing brands
            </h3>
          </div>

          {/* 72% Optimal Width Container as Requested */}
          <div className="w-[92%] sm:w-[85%] lg:w-[72%] max-w-5xl mx-auto relative overflow-hidden py-4 group/marquee">
            {/* Fade vignettes on edges */}
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[#0C0708] to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[#0C0708] to-transparent z-10 pointer-events-none" />

            {/* Continuous Marquee from Right to Left with Pause on Hover */}
            <motion.div
              animate={{ x: ['0%', '-50%'] }}
              transition={{
                repeat: Infinity,
                duration: 25,
                ease: 'linear',
              }}
              className="flex items-center gap-6 sm:gap-7 w-max group-hover/marquee:[animation-play-state:paused]"
            >
              {[...ourClients, ...ourClients].map((client, idx) => (
                <div
                  key={`${client.name}-${idx}`}
                  className="bg-white rounded-2xl px-7 py-4 flex items-center justify-center min-w-[190px] sm:min-w-[220px] h-[82px] shadow-lg border border-white/40 flex-shrink-0 group hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 hover:border-[#B81D42]"
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
      {/* 7. TESTIMONIALS: LUXURY EDITORIAL CAROUSEL */}
      {/* ========================================================================= */}
      <section className="py-28 px-6 sm:px-8 lg:px-12 bg-gradient-to-b from-[#0C0708] to-[#13070A] relative overflow-hidden">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.7 }}
            className="text-center mb-16"
          >
            <span className="text-xs uppercase tracking-widest text-[#B81D42] font-mono block mb-2">
              Verified Client Outcomes
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
              From Those Who Know Us Best
            </h2>
          </motion.div>

          {/* Testimonial Card */}
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTestimonial}
                initial={{ opacity: 0, x: 25, filter: 'blur(4px)' }}
                animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, x: -25, filter: 'blur(4px)' }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="bg-[#18070B] border border-[#4A0514]/80 rounded-3xl p-8 sm:p-14 shadow-2xl relative overflow-hidden"
              >
                {/* Huge stylized quote mark in the background */}
                <div className="absolute right-8 bottom-6 text-[#800020]/20 text-9xl font-serif select-none pointer-events-none leading-none">
                  “
                </div>

                <div className="flex items-center gap-2 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-[#D83A60] text-sm">★</span>
                  ))}
                  <span className="text-xs font-mono text-zinc-400 ml-2">
                    {testimonials[currentTestimonial].score} &bull; {testimonials[currentTestimonial].metric}
                  </span>
                </div>

                <p className="text-lg sm:text-2xl text-zinc-200 leading-relaxed font-light mb-10 relative z-10">
                  "{testimonials[currentTestimonial].quote}"
                </p>

                <div className="flex items-center justify-between pt-6 border-t border-white/10 relative z-10">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-[#800020] to-[#B81D42] flex items-center justify-center font-bold text-white shadow-md">
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
                      className="w-11 h-11 rounded-full border border-zinc-700 hover:border-[#B81D42] bg-[#0C0708] flex items-center justify-center text-zinc-300 hover:text-white transition-colors cursor-pointer"
                      aria-label="Previous Testimonial"
                    >
                      <ChevronLeft size={20} />
                    </button>
                    <button
                      onClick={nextTestimonial}
                      className="w-11 h-11 rounded-full border border-zinc-700 hover:border-[#B81D42] bg-[#0C0708] flex items-center justify-center text-zinc-300 hover:text-white transition-colors cursor-pointer"
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
      {/* 8. TOOLS & 3D FAN PERSPECTIVE CAROUSEL */}
      {/* ========================================================================= */}
      <section className="py-28 px-6 sm:px-8 bg-[#0C0708] relative overflow-hidden border-t border-[#38040F]/40">
        <div className="max-w-6xl mx-auto mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.7 }}
              className="lg:col-span-5 space-y-5"
            >
              <span className="text-xs uppercase font-mono tracking-widest text-[#B81D42] flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#B81D42] animate-pulse" />
                Empowering Creativity
              </span>
              <h3 className="text-3xl sm:text-5xl font-bold text-white tracking-tight leading-tight">
                Empowering Creativity With The{' '}
                <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-[#B81D42] to-[#D83A60]">
                  Right Tools
                </span>
              </h3>
              <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
                At we Publicise, we use tools that work as hard as we do. Each one is carefully
                chosen to bring your brand to life and make the process smoother, smarter and
                more effective. In the hands of our team, these tools aren't just functional —
                they're transformative, shaping every detail from start to finish.
              </p>

              {/* Indicator dots for tool cards */}
              <div className="flex items-center gap-2 pt-2">
                {brandemicTools.map((tool, i) => (
                  <button
                    key={tool.name}
                    onClick={() => setActiveToolIndex(i)}
                    className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                      activeToolIndex === i
                        ? 'w-10 bg-[#B81D42]'
                        : 'w-2.5 bg-zinc-700 hover:bg-zinc-500'
                    }`}
                    aria-label={`View tool ${tool.name}`}
                  />
                ))}
              </div>
            </motion.div>

            {/* 3D Perspective Fan Carousel matching Brandemic */}
            <div className="lg:col-span-7 relative h-[380px] sm:h-[440px] flex items-center justify-center [perspective:1200px] overflow-visible">
              <div className="relative w-full max-w-[500px] h-full flex items-center justify-center">
                {brandemicTools.map((tool, idx) => {
                  const count = brandemicTools.length;
                  let offset = (idx - activeToolIndex + count) % count;
                  if (offset > count / 2) offset -= count;

                  const isVisible = Math.abs(offset) <= 2;
                  if (!isVisible) return null;

                  const isActive = offset === 0;
                  const xOffset = offset * 115;
                  const zOffset = -Math.abs(offset) * 85;
                  const rotateY = offset * -14;
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
                      className="absolute w-[220px] sm:w-[260px] h-[290px] sm:h-[330px] rounded-3xl p-6 sm:p-8 flex flex-col justify-between cursor-pointer select-none shadow-2xl transition-shadow duration-300 group"
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
                      <div className="my-auto text-center py-2">
                        <h4
                          className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-2"
                          style={{ color: tool.textColor }}
                        >
                          {tool.name}
                        </h4>
                        <p className="text-[11px] leading-tight opacity-80 line-clamp-2">
                          {tool.desc}
                        </p>
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
        <div className="relative py-6 bg-gradient-to-r from-[#38040F] via-[#800020] to-[#38040F] border-y border-[#B81D42]/40 overflow-hidden select-none -mx-8 shadow-2xl">
          <motion.div
            animate={{ x: ['0%', '-50%'] }}
            transition={{ repeat: Infinity, duration: 20, ease: 'linear' }}
            className="flex items-center gap-12 whitespace-nowrap text-2xl sm:text-4xl font-black uppercase tracking-wider text-white"
          >
            {[...Array(6)].map((_, i) => (
              <div key={i} className="flex items-center gap-12">
                <span>Collaborate With we Publicise</span>
                <span className="text-[#D83A60]">✦</span>
                <span>Turning Ideas Into Magic</span>
                <span className="text-[#D83A60]">✦</span>
                <span>Limitless Possibilities</span>
                <span className="text-[#D83A60]">✦</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Culture CTA Card: "Be A Part Of The Movement" */}
        <div className="max-w-6xl mx-auto mt-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.7 }}
            className="rounded-3xl bg-[#4A0514] p-8 sm:p-14 border border-[#B81D42]/50 shadow-2xl shadow-[#4A0514]/40 flex flex-col md:flex-row items-center justify-between gap-8"
          >
            <div className="space-y-3 max-w-xl">
              <span className="text-xs uppercase font-mono tracking-widest text-[#D83A60]">
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

            <LiquidButton
              to="/contact"
              className="bg-[#0C0708] border-white/20 text-white font-bold text-xs uppercase tracking-widest whitespace-nowrap shadow-xl"
            >
              <span>Show Us What You Got</span>
            </LiquidButton>
          </motion.div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 9. FREQUENTLY ASKED QUESTIONS */}
      {/* ========================================================================= */}
      <section className="py-28 px-6 sm:px-8 lg:px-12 bg-[#0C0708] relative border-t border-[#38040F]/40">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left Title Column */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.7 }}
              className="lg:col-span-5 space-y-4"
            >
              <span className="text-xs uppercase font-mono tracking-widest text-[#B81D42]">
                Frequently Asked Questions
              </span>
              <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
                Get Answers To Your Vision{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#B81D42] to-[#D83A60]">
                  Or Our Services
                </span>
              </h2>
              <p className="text-zinc-400 text-sm sm:text-base leading-relaxed pt-2">
                Everything you need to know about partnering with we Publicise to craft exceptional
                brand identities and digital interactions.
              </p>
              <div className="pt-4">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 text-sm text-[#D83A60] hover:text-white font-medium transition-colors"
                >
                  <span>Have a custom question? Speak with our team &rarr;</span>
                </Link>
              </div>
            </motion.div>

            {/* Right Accordion FAQ Column */}
            <div className="lg:col-span-7 divide-y divide-zinc-800/80">
              {faqs.map((faq, index) => {
                const isOpen = openFaq === index;
                return (
                  <motion.div
                    key={faq.q}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, amount: 0.2 }}
                    transition={{ duration: 0.5, delay: index * 0.08 }}
                    className="py-6"
                  >
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : index)}
                      className="w-full flex items-center justify-between text-left group cursor-pointer"
                    >
                      <span className="text-lg sm:text-xl font-medium text-white group-hover:text-[#B81D42] transition-colors pr-6">
                        {faq.q}
                      </span>
                      <div className="w-8 h-8 rounded-full border border-zinc-700 flex items-center justify-center text-zinc-400 group-hover:text-white group-hover:border-[#B81D42] transition-colors flex-shrink-0">
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
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 10. GRAND FINALE: "ASK AI" & GIANT KINETIC "THINK LIMITLESS" TYPOGRAPHY */}
      {/* ========================================================================= */}
      <section
        ref={limitlessRef}
        className="pt-24 pb-12 px-6 sm:px-8 lg:px-12 bg-[#080405] border-t border-[#38040F]/60 relative overflow-hidden"
      >
        <div className="max-w-6xl mx-auto">
          {/* Top Row: Brand & Ask AI */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8 mb-16">
            <div>
              <Link to="/" className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#800020] to-[#B81D42] flex items-center justify-center p-[2px]">
                  <div className="w-full h-full bg-[#0C0708] rounded-full flex items-center justify-center">
                    <span className="text-[#B81D42] font-black text-xl italic">w</span>
                  </div>
                </div>
                <span className="text-2xl font-bold tracking-tight text-white">
                  we Publicise
                </span>
              </Link>
              <div className="flex flex-wrap items-center gap-6 text-sm text-zinc-400 mt-4">
                <Link to="/about" className="hover:text-white transition-colors">About Us</Link>
                <Link to="/services" className="hover:text-white transition-colors">Portfolio</Link>
                <Link to="/contact" className="hover:text-white transition-colors">Contact</Link>
                <Link to="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
                <Link to="/terms-and-conditions" className="hover:text-white transition-colors">Terms of Use</Link>
              </div>
            </div>

            {/* "Ask AI About we Publicise" */}
            <div className="space-y-3 sm:text-right">
              <div className="flex items-center sm:justify-end gap-2 text-xs font-mono text-[#D83A60]">
                <span className="w-2 h-2 rounded-full bg-[#B81D42] animate-pulse" />
                <span>Ask AI About we Publicise</span>
              </div>
              <div className="flex items-center gap-2">
                {['ChatGPT', 'Claude', 'Perplexity', 'Copilot', 'Gemini'].map((ai) => (
                  <button
                    key={ai}
                    onClick={() => handleCopyPrompt(ai)}
                    title={`Click to copy prompt for ${ai}`}
                    className="w-9 h-9 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-[#B81D42] flex items-center justify-center text-zinc-400 hover:text-white text-xs font-mono transition-colors cursor-pointer"
                  >
                    <Bot size={16} />
                  </button>
                ))}
              </div>
              {copiedPrompt && (
                <div className="text-xs text-[#D83A60] font-mono animate-fade-in">
                  ✓ {copiedPrompt}
                </div>
              )}
            </div>
          </div>

          {/* Email & Connect Today */}
          <div className="flex items-center justify-between text-xs font-mono uppercase tracking-widest text-zinc-400 mb-8">
            <a href="mailto:info@wepublicise.com" className="hover:text-white transition-colors">
              info@wepublicise.com
            </a>
            <Link to="/contact" className="hover:text-[#B81D42] transition-colors flex items-center gap-1">
              <span>Connect Today</span>
              <span>&rarr;</span>
            </Link>
          </div>

          {/* Giant "THINK LIMITLESS" Typography with Scroll-Linked Tracking */}
          <div className="w-full overflow-hidden select-none my-6">
            <motion.h1
              style={{
                letterSpacing: limitlessLetterSpacing,
                scale: limitlessScale,
              }}
              className="text-5xl sm:text-7xl md:text-9xl lg:text-[145px] font-black tracking-tighter uppercase text-center text-transparent bg-clip-text bg-gradient-to-b from-[#800020] via-[#5B091E] to-[#18070B] leading-none"
            >
              Think Limitless
            </motion.h1>
          </div>

          {/* Bottom Bar: Social Icons & Credits */}
          <div className="pt-8 border-t border-zinc-900 flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-zinc-500">
            <p>&copy; {new Date().getFullYear()} we Publicise. All rights reserved.</p>
            <div className="flex flex-wrap items-center gap-5 text-zinc-400 font-mono text-xs">
              <a href="#" className="hover:text-white transition-colors">Instagram</a>
              <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
              <a href="#" className="hover:text-white transition-colors">YouTube</a>
              <a href="#" className="hover:text-white transition-colors">X (Twitter)</a>
              <a href="#" className="hover:text-white transition-colors">Behance</a>
            </div>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 hover:border-[#B81D42] text-zinc-300 hover:text-white transition-colors cursor-pointer"
            >
              <ArrowUp size={12} />
              <span>Back To Top</span>
            </button>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 11. QUICK CASE STUDY PREVIEW MODAL */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-6"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0, y: 20 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#18070B] border border-[#800020] rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl relative"
            >
              <div className="relative aspect-video w-full overflow-hidden">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#18070B] via-transparent to-transparent" />
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/70 border border-white/20 text-white flex items-center justify-center hover:bg-[#800020] transition-colors cursor-pointer"
                >
                  ✕
                </button>
              </div>

              <div className="p-8 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono uppercase px-3 py-1 rounded-full bg-[#800020]/40 text-[#D83A60] border border-[#B81D42]/40">
                    {selectedProject.badge} &bull; {selectedProject.year}
                  </span>
                  <span className="text-xs font-mono text-zinc-400">
                    {selectedProject.result}
                  </span>
                </div>

                <h3 className="text-3xl font-bold text-white tracking-tight">
                  {selectedProject.title}
                </h3>
                <p className="text-sm font-medium text-zinc-300">
                  {selectedProject.category}
                </p>
                <p className="text-sm text-zinc-400 leading-relaxed">
                  {selectedProject.summary}
                </p>

                <div className="pt-4 flex items-center justify-between border-t border-white/10">
                  <LiquidButton
                    to="/contact"
                    onClick={() => setSelectedProject(null)}
                    size="sm"
                    className="gap-2 bg-[#800020] border-[#B81D42] text-white"
                  >
                    <span>Request Similar Case Study</span>
                    <ArrowRight size={14} />
                  </LiquidButton>
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="text-xs text-zinc-400 hover:text-white transition-colors cursor-pointer"
                  >
                    Close Window
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ========================================================================= */}
      {/* 12. AGENCY SHOWREEL VIDEO MODAL */}
      {/* ========================================================================= */}
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
              className="bg-[#13070A] border border-[#800020] p-6 rounded-3xl max-w-3xl w-full text-center relative shadow-2xl"
            >
              <button
                onClick={() => setIsVideoModalOpen(false)}
                className="absolute top-4 right-4 text-zinc-400 hover:text-white text-xl cursor-pointer"
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
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </PageWrapper>
  );
};

export default Home;
