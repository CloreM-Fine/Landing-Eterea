import { motion } from 'framer-motion';
import { Instagram, Linkedin, ArrowUp } from 'lucide-react';
import { Logo } from '../ui/Logo';

const footerLinks = {
  servizi: [
    { label: 'Brand Design', href: '#servizi' },
    { label: 'Web Development', href: '#servizi' },
    { label: 'App Mobile', href: '#servizi' },
    { label: 'Fotografia', href: '#servizi' },
    { label: 'Marketing', href: '#servizi' },
  ],
  azienda: [
    { label: 'Chi Siamo', href: '#chi-siamo' },
    { label: 'Lavori', href: '#lavori' },
    { label: 'Contatti', href: '#contatti' },
    { label: 'Area Riservata', href: 'https://gestionale.etereastudio.it', external: true },
  ],
  legale: [
    { label: 'Privacy Policy', href: '#', action: 'privacy' },
    { label: 'Cookie Policy', href: '#', action: 'cookies' },
    { label: 'Termini di Servizio', href: '#', action: 'terms' },
    { label: 'Condizioni dei Servizi', href: '#', action: 'service-conditions' },
  ],
};

const socialLinks = [
  { icon: Instagram, label: 'Instagram', href: 'https://www.instagram.com/eterea.studio.lucca/' },
  { icon: Linkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/in/lorenzo-puccetti-66931b21a/?skipRedirect=true' },
];

interface FooterProps {
  onOpenPrivacy: () => void;
  onOpenCookies: () => void;
  onOpenTerms: () => void;
  onOpenServiceConditions: () => void;
}

export function Footer({ onOpenPrivacy, onOpenCookies, onOpenTerms, onOpenServiceConditions }: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLegalClick = (action: string) => {
    switch (action) {
      case 'privacy':
        onOpenPrivacy();
        break;
      case 'cookies':
        onOpenCookies();
        break;
      case 'terms':
        onOpenTerms();
        break;
      case 'service-conditions':
        onOpenServiceConditions();
        break;
    }
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-eterea-cream overflow-hidden">
      {/* Wave decoration */}
      <div className="absolute top-0 left-0 right-0 overflow-hidden">
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="w-full h-16 fill-white"
        >
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" />
        </svg>
      </div>

      <div className="relative z-10 pt-24 pb-8 w-full px-4 sm:px-6 lg:px-12 xl:px-20">
        {/* Main Footer Content */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 lg:gap-12 mb-16">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-4 lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Logo size="md" animated={false} />
              <p className="mt-6 text-eterea-gray max-w-sm leading-relaxed">
                Design e Sviluppo Digitale. Trasformiamo idee in esperienze 
                uniche, unendo creatività e tecnologia per far crescere 
                il tuo brand nel mondo digitale.
              </p>
              
              {/* Social Links */}
              <div className="flex gap-3 mt-6">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-eterea-gray hover:text-eterea-dark hover:bg-eterea-blue/20 transition-colors"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label={social.label}
                  >
                    <social.icon className="w-4 h-4" />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Services Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h4 className="font-bold text-eterea-dark mb-4">Servizi</h4>
            <ul className="space-y-3">
              {footerLinks.servizi.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-eterea-gray hover:text-eterea-dark transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Company Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h4 className="font-bold text-eterea-dark mb-4">Azienda</h4>
            <ul className="space-y-3">
              {footerLinks.azienda.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-eterea-gray hover:text-eterea-dark transition-colors"
                    {...(link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Legal Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <h4 className="font-bold text-eterea-dark mb-4">Legale</h4>
            <ul className="space-y-3">
              {footerLinks.legale.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => handleLegalClick(link.action)}
                    className="text-sm text-eterea-gray hover:text-eterea-dark transition-colors text-left"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Bottom Bar - Tutto su una riga */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pt-8 border-t border-eterea-dark/10">
          <motion.p
            className="text-sm text-eterea-gray"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            © {currentYear} Eterea Studio di Puccetti Lorenzo P.IVA 02758150466 C.F. PCCLNZ01E08E715B
          </motion.p>

          {/* Back to top */}
          <motion.button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-sm text-eterea-gray hover:text-eterea-dark transition-colors"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            Torna su
            <span className="w-8 h-8 rounded-full bg-white flex items-center justify-center">
              <ArrowUp className="w-4 h-4" />
            </span>
          </motion.button>
        </div>
      </div>

      {/* Large Background Text */}
      <div className="absolute bottom-0 left-0 right-0 overflow-hidden pointer-events-none">
        <motion.div
          className="text-[15vw] font-serif font-bold text-eterea-dark/[0.02] whitespace-nowrap"
          initial={{ x: '0%' }}
          animate={{ x: '-50%' }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        >
          ETEREA STUDIO • ETEREA STUDIO • ETEREA STUDIO • ETEREA STUDIO •
        </motion.div>
      </div>
    </footer>
  );
}
