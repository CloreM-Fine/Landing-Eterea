import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  Instagram, 
  Linkedin,
  ArrowUpRight,
  CheckCircle,
  Clock,
  MessageCircle
} from 'lucide-react';

const contactInfo = [
  {
    icon: Mail,
    label: 'Email',
    value: 'info@etereastudio.it',
    href: 'mailto:info@etereastudio.it',
  },
  {
    icon: Phone,
    label: 'Telefono',
    value: '3465728606',
    href: 'tel:3465728606',
  },
  {
    icon: MapPin,
    label: 'Sede',
    value: 'Lucca, Toscana',
    href: '#',
  },
  {
    icon: Clock,
    label: 'Orari',
    value: 'Lun-Ven: 9:00 - 18:00',
    href: '#',
  },
];

const socialLinks = [
  { icon: Instagram, label: 'Instagram', href: 'https://www.instagram.com/eterea.studio.lucca/', color: '#E8B4B8' },
  { icon: Linkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/in/lorenzo-puccetti-66931b21a/?skipRedirect=true', color: '#A8D0E6' },
];

const services = [
  'Brand Design',
  'Web Development',
  'App Mobile',
  'Fotografia',
  'Illustrazione',
  'Marketing',
  'Altro',
];


interface ContactProps {
  onOpenPrivacy: () => void;
}

export function Contact({ onOpenPrivacy }: ContactProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    service: '',

    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Netlify Forms - invio automatico
    const form = e.target as HTMLFormElement;
    const formDataNetlify = new FormData(form);
    
    try {
      await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(formDataNetlify as any).toString()
      });
      
      // Redirect alla pagina di ringraziamento
      window.location.href = '/thank-you';
    } catch (error) {
      console.error('Errore invio form:', error);
      setIsSubmitting(false);
      alert('Si è verificato un errore. Riprova più tardi.');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleWhatsAppClick = () => {
    const { name, email, company, service, message } = formData;
    
    if (!name || !message) {
      alert('Per favore, compila almeno il nome e il messaggio prima di inviare su WhatsApp.');
      return;
    }
    
    const phoneNumber = '393465728606'; // Numero WhatsApp senza +
    const text = `*Nuova richiesta da Eterea Studio*%0A%0A` +
      `*Nome:* ${name}%0A` +
      `*Email:* ${email || 'Non specificata'}%0A` +
      `*Azienda:* ${company || 'Non specificata'}%0A` +
      `*Servizio:* ${service || 'Non specificato'}%0A%0A` +
      `*Messaggio:*%0A${message}`;
    
    window.open(`https://wa.me/${phoneNumber}?text=${text}`, '_blank');
  };

  const handleBookCallClick = () => {
    const phoneNumber = '393465728606'; // Numero WhatsApp senza +
    const text = `*Ciao! Vorrei prenotare una call di 30 minuti per discutere il mio progetto con Eterea Studio.*%0A%0A` +
      `Quando siete disponibili?%0A%0A` +
      `Grazie!`;
    
    window.open(`https://wa.me/${phoneNumber}?text=${text}`, '_blank');
  };

  return (
    <section id="contatti" className="relative py-24 lg:py-32 bg-eterea-dark overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-10"
          style={{ background: 'linear-gradient(135deg, #A8D0E6, #C5B9CD)' }}
          animate={{ 
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
          }}
          transition={{ duration: 20, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-0 left-0 w-80 h-80 rounded-full opacity-10"
          style={{ background: 'linear-gradient(135deg, #F4C2A1, #E8E4A0)' }}
          animate={{ 
            scale: [1.2, 1, 1.2],
            x: [0, -30, 0],
          }}
          transition={{ duration: 15, repeat: Infinity }}
        />
      </div>

      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-12 xl:px-20">
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-sm font-medium text-white">Contatti</span>
          </motion.div>

          <motion.h2
            className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            Iniziamo un <span className="gradient-text">progetto</span> insieme
          </motion.h2>

          <motion.p
            className="text-lg text-white/70"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Hai un'idea? Parliamone! Siamo sempre entusiasti di scoprire nuovi progetti 
            e creare qualcosa di straordinario insieme.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-stretch">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="flex flex-col h-full"
          >
            <div className="grid sm:grid-cols-2 gap-6 mb-12 flex-1">
              {contactInfo.map((item, index) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  className="group p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * index }}
                  whileHover={{ scale: 1.02 }}
                >
                  <item.icon className="w-6 h-6 text-eterea-blue mb-3" />
                  <div className="text-sm text-white/50 mb-1">{item.label}</div>
                  <div className="text-white font-medium group-hover:text-eterea-blue transition-colors">
                    {item.value}
                  </div>
                </motion.a>
              ))}
            </div>

            {/* Social Links */}
            <div className="mb-12">
              <h3 className="text-white font-medium mb-4">Seguici</h3>
              <div className="flex gap-4">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label={social.label}
                  >
                    <social.icon className="w-5 h-5 text-white" />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* CTA Card - spinta in basso con mt-auto */}
            <motion.div
              className="mt-auto p-8 rounded-3xl bg-gradient-to-br from-eterea-blue/20 to-eterea-lilac/20 border border-white/10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
            >
              <h3 className="text-xl font-bold text-white mb-2">
                Preferisci una call?
              </h3>
              <p className="text-white/70 mb-4">
                Prenota una consulenza gratuita di 30 minuti per discutere il tuo progetto.
              </p>
              <motion.button
                type="button"
                onClick={handleBookCallClick}
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-eterea-dark rounded-full font-medium"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Prenota ora
                <ArrowUpRight className="w-4 h-4" />
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="h-full flex flex-col"
          >
            <div className="p-8 rounded-3xl bg-white flex-1 flex flex-col">
              {isSubmitted ? (
                <motion.div
                  className="text-center py-12"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <motion.div
                    className="w-20 h-20 rounded-full bg-eterea-sage/20 flex items-center justify-center mx-auto mb-6"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200 }}
                  >
                    <CheckCircle className="w-10 h-10 text-eterea-sage" />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-eterea-dark mb-2">
                    Messaggio inviato!
                  </h3>
                  <p className="text-eterea-gray">
                    Ti risponderemo entro 24 ore.
                  </p>
                </motion.div>
              ) : (
                <form 
                  name="contatto"
                  method="POST"
                  action="/mail-handler.php"
                  onSubmit={handleSubmit} 
                  className="space-y-6 flex-1 flex flex-col"
                >
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-eterea-dark mb-2">
                        Nome *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-eterea-blue focus:ring-2 focus:ring-eterea-blue/20 outline-none transition-all"
                        placeholder="Il tuo nome"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-eterea-dark mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-eterea-blue focus:ring-2 focus:ring-eterea-blue/20 outline-none transition-all"
                        placeholder="tua@email.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-eterea-dark mb-2">
                      Azienda
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-eterea-blue focus:ring-2 focus:ring-eterea-blue/20 outline-none transition-all"
                      placeholder="Nome azienda (opzionale)"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-eterea-dark mb-2">
                      Servizio di interesse
                    </label>
                    <select
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-eterea-blue focus:ring-2 focus:ring-eterea-blue/20 outline-none transition-all bg-white"
                    >
                      <option value="">Seleziona...</option>
                      {services.map(service => (
                        <option key={service} value={service}>{service}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-eterea-dark mb-2">
                      Messaggio *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={4}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-eterea-blue focus:ring-2 focus:ring-eterea-blue/20 outline-none transition-all resize-none"
                      placeholder="Raccontaci il tuo progetto..."
                    />
                  </div>

                  <div className="mt-auto space-y-4">
                    <div className="flex flex-col sm:flex-row gap-3">
                      <motion.button
                        type="submit"
                        disabled={isSubmitting}
                        className="flex-1 py-4 bg-eterea-dark text-white rounded-xl font-medium flex items-center justify-center gap-2 disabled:opacity-70"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {isSubmitting ? (
                          <>
                            <motion.div
                              className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                            />
                            Invio in corso...
                          </>
                        ) : (
                          <>
                            Invia messaggio
                            <Send className="w-5 h-5" />
                          </>
                        )}
                      </motion.button>

                      <motion.button
                        type="button"
                        onClick={handleWhatsAppClick}
                        className="flex-1 py-4 bg-[#25D366] text-white rounded-xl font-medium flex items-center justify-center gap-2"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <MessageCircle className="w-5 h-5" />
                        Invia su WhatsApp
                      </motion.button>
                    </div>

                    <p className="text-xs text-eterea-gray text-center">
                      Cliccando su "Invia" accetti la nostra{' '}
                      <button
                        type="button"
                        onClick={onOpenPrivacy}
                        className="underline hover:text-eterea-dark cursor-pointer bg-transparent border-none p-0 font-inherit text-inherit"
                      >
                        Privacy Policy
                      </button>
                    </p>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Gradient transition to footer */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-96 pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, rgba(45,49,66,0) 0%, rgba(45,49,66,0.3) 40%, rgba(255,255,255,0.8) 80%, white 100%)',
        }}
      />
    </section>
  );
}
