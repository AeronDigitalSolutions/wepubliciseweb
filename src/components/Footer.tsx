import { Link } from 'react-router-dom';
import { ArrowUpRight, Mail, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="relative bg-[#080405] text-white pt-20 pb-12 border-t border-[#4A1016]/40 overflow-hidden">
      {/* Background ambient wine glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#722F37]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-[#E24A68]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
          {/* Brand Col */}
          <div className="md:col-span-5 space-y-6">
            <Link to="/" className="inline-flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#722F37] via-[#9E2A3B] to-[#E24A68] flex items-center justify-center p-[2px]">
                <div className="w-full h-full bg-[#0C0708] rounded-full flex items-center justify-center">
                  <span className="text-[#E24A68] font-black text-xl italic">w</span>
                </div>
              </div>
              <span className="text-2xl font-bold tracking-tight text-white group-hover:text-[#E24A68] transition-colors">
                we Publicise
              </span>
            </Link>

            <p className="text-zinc-400 text-sm max-w-sm leading-relaxed">
              Our expertise, as well as our passion for web design & strategic branding, sets us apart from other agencies. Helping ambitious brands turn ideas into magic.
            </p>

            <div className="space-y-3 pt-2 text-sm text-zinc-400">
              <div className="flex items-center gap-3">
                <MapPin size={16} className="text-[#E24A68]" />
                <span>HSR Layout Sector 6 - Bangalore, India</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={16} className="text-[#E24A68]" />
                <a href="mailto:info@wepublicise.com" className="hover:text-white transition-colors">
                  info@wepublicise.com &bull; business@wepublicise.com
                </a>
              </div>
            </div>
          </div>

          {/* Quick links */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-xs uppercase tracking-widest text-[#E24A68] font-bold">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-sm text-zinc-400">
              <li>
                <Link to="/" className="hover:text-white transition-colors inline-flex items-center gap-1 group">
                  <span>Home</span>
                  <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity text-[#E24A68]" />
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-white transition-colors inline-flex items-center gap-1 group">
                  <span>Services</span>
                  <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity text-[#E24A68]" />
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition-colors inline-flex items-center gap-1 group">
                  <span>About Us</span>
                  <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity text-[#E24A68]" />
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition-colors inline-flex items-center gap-1 group">
                  <span>Contact</span>
                  <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity text-[#E24A68]" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Services Quicklist */}
          <div className="md:col-span-2 space-y-4">
            <h4 className="text-xs uppercase tracking-widest text-[#E24A68] font-bold">
              Expertise
            </h4>
            <ul className="space-y-2.5 text-sm text-zinc-400">
              <li>Web Development</li>
              <li>Brand Identity</li>
              <li>Packaging Design</li>
              <li>Digital Campaigns</li>
              <li>App Engineering</li>
            </ul>
          </div>

          {/* Legal */}
          <div className="md:col-span-2 space-y-4">
            <h4 className="text-xs uppercase tracking-widest text-[#E24A68] font-bold">
              Legal
            </h4>
            <ul className="space-y-2.5 text-sm text-zinc-400">
              <li>
                <Link to="/privacy-policy" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms-and-conditions" className="hover:text-white transition-colors">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-zinc-900/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <p>&copy; {new Date().getFullYear()} we Publicise. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link to="/privacy-policy" className="hover:text-zinc-300 transition-colors">
              Privacy Policy
            </Link>
            <span>&bull;</span>
            <Link to="/terms-and-conditions" className="hover:text-zinc-300 transition-colors">
              Terms and Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
