import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LiquidButton from './LiquidButton';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'About Us', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#0C0708]/90 backdrop-blur-md border-b border-[#4A1016]/40 py-4 shadow-2xl'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex justify-between items-center">
          {/* Logo with Brandemic vibe */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#722F37] via-[#9E2A3B] to-[#E24A68] flex items-center justify-center p-[2px] transition-transform duration-300 group-hover:scale-105 shadow-lg shadow-[#722F37]/30">
              <div className="w-full h-full bg-[#0C0708] rounded-full flex items-center justify-center">
                <span className="text-[#E24A68] font-black text-xl italic leading-none">w</span>
              </div>
            </div>
            <div className="flex items-baseline">
              <span className="text-2xl font-bold tracking-tight text-white group-hover:text-[#E24A68] transition-colors">
                we Publicise
              </span>
              <span className="w-2 h-2 rounded-full bg-[#E24A68] ml-1 animate-pulse"></span>
            </div>
          </Link>

          {/* Desktop Links & Action CTA */}
          <div className="hidden md:flex items-center gap-10">
            <div className="flex items-center gap-8">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={`text-sm tracking-wide font-medium transition-colors relative py-1 ${
                      isActive
                        ? 'text-white font-semibold'
                        : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    {link.name}
                    {isActive && (
                      <motion.div
                        layoutId="activeNav"
                        className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#722F37] to-[#E24A68] rounded-full"
                      />
                    )}
                  </Link>
                );
              })}
            </div>

            <LiquidButton
              to="/contact"
              size="sm"
              className="gap-2 border-zinc-700/80 bg-zinc-900/60 text-white group shadow-sm hover:shadow-[#722F37]/30"
            >
              <span>Get In Touch</span>
              <ArrowUpRight
                size={15}
                className="text-zinc-400 group-hover:text-white transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </LiquidButton>
          </div>

          {/* Mobile hamburger button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-zinc-300 hover:text-white rounded-lg focus:outline-none"
              aria-label="Toggle Menu"
            >
              {isOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-[#140D0F] border-b border-[#4A1016]/50 px-6 py-6 shadow-2xl"
          >
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className="text-lg font-medium text-zinc-300 hover:text-white hover:pl-2 transition-all"
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-4 border-t border-zinc-800">
                <LiquidButton
                  to="/contact"
                  onClick={() => setIsOpen(false)}
                  className="w-full justify-center border-zinc-700/80 bg-zinc-900/60 text-white"
                >
                  <span>Get In Touch</span>
                </LiquidButton>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
