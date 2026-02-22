import React, { useState } from 'react';
import { motion } from 'framer-motion';

// URL immagini Unsplash (placeholder)
const IMAGES = {
  hero: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&h=900&fit=crop',
  team: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop',
  office: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=1200&h=800&fit=crop',
  design: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800&h=800&fit=crop',
  code: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=600&fit=crop',
  meeting: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&h=600&fit=crop',
  creative: 'https://images.unsplash.com/photo-1542744094-3a31f272c490?w=800&h=1000&fit=crop',
  workspace: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1200&h=800&fit=crop',
  branding: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=800&fit=crop',
  photo: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=800&h=1000&fit=crop',
  video: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800&h=600&fit=crop',
  motion: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&h=600&fit=crop',
  app: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&h=800&fit=crop',
  web: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=800&fit=crop',
  social: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=800&h=600&fit=crop',
  product: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&h=600&fit=crop',
  abstract1: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=600&h=800&fit=crop',
  abstract2: 'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=800&h=600&fit=crop',
  abstract3: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&h=800&fit=crop',
  texture: 'https://images.unsplash.com/photo-1557682250-33bd709cbe85?w=800&h=600&fit=crop',
};

// Componente immagine brutalista
const BrutalImage = ({ src, alt, className = '', aspect = 'aspect-video', delay = 0 }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.6 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative overflow-hidden border-2 border-black ${aspect} ${className}`}
    >
      <motion.img
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
        animate={{
          scale: isHovered ? 1.1 : 1,
          filter: isHovered ? 'grayscale(0%)' : 'grayscale(100%)',
        }}
        transition={{ duration: 0.3 }}
      />
      {/* Overlay glitch effect on hover */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{
          opacity: isHovered ? 1 : 0,
          background: isHovered ? 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.1) 2px, rgba(0,0,0,0.1) 4px)' : 'none',
        }}
      />
      {/* Corner accents */}
      <div className="absolute top-0 left-0 w-4 h-4 border-t-4 border-l-4 border-black" />
      <div className="absolute top-0 right-0 w-4 h-4 border-t-4 border-r-4 border-black" />
      <div className="absolute bottom-0 left-0 w-4 h-4 border-b-4 border-l-4 border-black" />
      <div className="absolute bottom-0 right-0 w-4 h-4 border-b-4 border-r-4 border-black" />
    </motion.div>
  );
};

// Immagine con testo sovrapposto
const BrutalImageText = ({ src, alt, text, subtext, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, x: -30 }}
    whileInView={{ opacity: 1, x: 0 }}
    transition={{ delay, duration: 0.5 }}
    className="relative border-2 border-black overflow-hidden group"
  >
    <div className="aspect-[4/5] overflow-hidden">
      <img 
        src={src} 
        alt={alt} 
        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-110"
      />
    </div>
    <div className="absolute bottom-0 left-0 right-0 bg-black text-white p-4">
      <p className="font-black uppercase text-lg">{text}</p>
      {subtext && <p className="text-xs font-mono mt-1 opacity-70">{subtext}</p>}
    </div>
  </motion.div>
);

// Grid immagini
const ImageGrid = ({ images }) => (
  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
    {images.map((img, i) => (
      <BrutalImage key={i} src={img.src} alt={img.alt} delay={i * 0.1} aspect={img.aspect || 'aspect-square'} />
    ))}
  </div>
);

// Marquee component
const Marquee = ({ text, direction = 'left', speed = 20, size = 'text-4xl', className = '' }) => (
  <div className={`overflow-hidden whitespace-nowrap border-y-2 border-black ${className}`}>
    <motion.div
      animate={{ x: direction === 'left' ? [0, -1000] : [-1000, 0] }}
      transition={{ duration: speed, repeat: Infinity, ease: 'linear' }}
      className={`inline-block ${size} font-black uppercase tracking-tighter`}
    >
      {text} {text} {text} {text} {text} {text}
    </motion.div>
  </div>
);

// Vertical text
const VerticalText = ({ text, className = '' }) => (
  <div className={`text-xs font-mono tracking-widest uppercase ${className}`} style={{ writingMode: 'vertical-rl' }}>
    {text}
  </div>
);

// Text reveal animation
const TextReveal = ({ text, className = '' }) => {
  const words = text.split(' ');
  return (
    <span className={className}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0.2 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: i * 0.03 }}
          className="inline-block mr-[0.3em]"
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
};

// Block component
const Block = ({ children, className = '', border = true }) => (
  <div className={`p-4 md:p-6 ${border ? 'border-2 border-black' : ''} ${className}`}>
    {children}
  </div>
);

// Section title
const SectionTitle = ({ children, number }) => (
  <div className="mb-8">
    <span className="font-mono text-xs border border-black px-2 py-1">{number}</span>
    <h2 className="text-2xl md:text-4xl font-black uppercase mt-4">{children}</h2>
  </div>
);

export const folderContents = {
  'Eterea': {
    title: 'ETEREA STUDIO',
    url: 'etereastudio.com',
    content: (
      <div className="bg-white text-black">
        {/* HERO CON IMMAGINE */}
        <section className="min-h-screen border-b-2 border-black relative overflow-hidden">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 hidden md:block">
            <VerticalText text="Design Studio — Lucca, Italy — Est. 2020" />
          </div>
          <div className="absolute right-4 top-1/2 -translate-y-1/2 hidden md:block" style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg) translateY(50%)' }}>
            <span className="text-xs font-mono tracking-widest uppercase">Web • App • Brand • Motion</span>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
            <div className="flex flex-col justify-center p-8 md:p-16">
              <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
                <span className="font-mono text-xs border border-black px-3 py-1 inline-block mb-6">DESIGN & DEVELOPMENT</span>
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-black uppercase leading-none tracking-tighter">ETEREA</h1>
                <p className="text-xs md:text-sm font-mono mt-4 tracking-widest uppercase">Studio Creativo Digitale</p>
                <p className="max-w-md text-sm mt-8 leading-relaxed">
                  Non siamo un'agenzia tradizionale. Siamo un collettivo di creativi, sviluppatori e strategisti digitali che rifiutano il compromesso.
                </p>
              </motion.div>
            </div>
            <div className="relative">
              <BrutalImage src={IMAGES.hero} alt="Studio" aspect="h-full" className="h-full border-l-2 border-black" />
            </div>
          </div>
        </section>

        {/* MARQUEE */}
        <Marquee text="CREATIVITÀ SENZA LIMITI × DESIGN BRUTALIST × ESPERIENZE DIGITALI ×" speed={25} size="text-6xl md:text-8xl" className="bg-black text-white py-6" />

        {/* MANIFESTO CON IMMAGINE */}
        <section className="min-h-screen border-b-2 border-black p-8 md:p-16">
          <div className="max-w-6xl mx-auto">
            <SectionTitle number="01">Manifesto</SectionTitle>
            
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
              <div className="md:col-span-5">
                <BrutalImage src={IMAGES.creative} alt="Creative" aspect="aspect-[3/4]" />
              </div>
              <div className="md:col-span-7">
                <p className="text-lg md:text-xl leading-relaxed">
                  <TextReveal text="Non seguiamo trend. Li creiamo. Non ascoltiamo il mercato. Lo anticipiamo. Il design non è decorazione, è comunicazione pura." />
                </p>
                <p className="text-sm mt-6 leading-relaxed text-gray-600">
                  Crediamo nella potenza delle idee audaci. Non abbiamo paura del caos, lo abbracciamo e lo trasformiamo in ordine.
                </p>
                
                <div className="mt-8 grid grid-cols-2 gap-4">
                  <Block className="bg-black text-white">
                    <span className="text-xs font-mono uppercase">Approccio</span>
                    <p className="text-sm mt-2 font-medium">Strategia prima del design. Ricerca prima della soluzione.</p>
                  </Block>
                  <Block className="bg-gray-100">
                    <span className="text-xs font-mono uppercase">Filosofia</span>
                    <p className="text-sm mt-2 font-medium">Meno ma meglio. Sostanza sopra lo stile.</p>
                  </Block>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* WORK CON IMMAGINI */}
        <section className="border-b-2 border-black">
          <div className="p-8 md:p-16">
            <SectionTitle number="02">Servizi</SectionTitle>
          </div>
          
          <div className="flex overflow-x-auto pb-8 px-8 gap-4 snap-x">
            {[
              { title: 'Branding', desc: 'Identità visiva completa', img: IMAGES.branding },
              { title: 'Web Design', desc: 'Siti web performanti', img: IMAGES.web },
              { title: 'Development', desc: 'Codice pulito e scalabile', img: IMAGES.code },
              { title: 'App Mobile', desc: 'iOS e Android native', img: IMAGES.app },
              { title: 'Motion', desc: 'Animazioni che colpiscono', img: IMAGES.motion },
              { title: 'Strategy', desc: 'Pianificazione digitale', img: IMAGES.workspace },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="min-w-[300px] snap-start"
              >
                <div className="border-2 border-black overflow-hidden group cursor-pointer hover:bg-black transition-colors">
                  <div className="aspect-video overflow-hidden">
                    <img src={item.img} alt={item.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-300" />
                  </div>
                  <div className="p-4 group-hover:text-white">
                    <span className="text-xs font-mono">0{i + 1}</span>
                    <h3 className="text-xl font-black uppercase mt-2">{item.title}</h3>
                    <p className="text-sm mt-2">{item.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* GALLERY IMMAGINI */}
        <section className="p-8 md:p-16 border-b-2 border-black">
          <SectionTitle number="03">Gallery</SectionTitle>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {[IMAGES.design, IMAGES.office, IMAGES.meeting, IMAGES.abstract1, IMAGES.abstract2, IMAGES.abstract3, IMAGES.texture, IMAGES.product].map((src, i) => (
              <BrutalImage key={i} src={src} alt={`Gallery ${i}`} delay={i * 0.05} aspect={i % 3 === 0 ? 'aspect-[3/4]' : 'aspect-square'} />
            ))}
          </div>
        </section>

        {/* PROCESS CON IMMAGINI */}
        <section className="border-b-2 border-black">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="p-8 md:p-16 border-r-2 border-black">
              <SectionTitle number="04">Processo</SectionTitle>
              <div className="space-y-6">
                {[
                  { step: '01', title: 'Discovery', desc: 'Analizziamo il tuo mercato, i competitor, il pubblico target. Definiamo obiettivi chiari e misurabili.' },
                  { step: '02', title: 'Strategy', desc: 'Pianifichiamo ogni mossa. Architettura dell\'informazione, user flow, content strategy.' },
                  { step: '03', title: 'Design', desc: 'UI/UX design iterativo. Wireframe, mockup, prototipi interattivi.' },
                  { step: '04', title: 'Development', desc: 'Codice pulito, performante, scalabile. Best practices sempre.' },
                ].map((item) => (
                  <div key={item.step} className="flex gap-4 py-4 border-b border-gray-200">
                    <span className="text-3xl font-black text-gray-300">{item.step}</span>
                    <div>
                      <h4 className="text-lg font-black uppercase">{item.title}</h4>
                      <p className="text-sm mt-1 text-gray-600">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <BrutalImage src={IMAGES.workspace} alt="Process" aspect="h-full min-h-[500px]" className="h-full" />
            </div>
          </div>
        </section>

        {/* STATS */}
        <section className="border-b-2 border-black">
          <div className="grid grid-cols-2 md:grid-cols-4">
            {[
              { num: '150+', label: 'Progetti completati' },
              { num: '50+', label: 'Clienti' },
              { num: '6', label: 'Anni' },
              { num: '12', label: 'Team' }
            ].map((stat, i) => (
              <div key={stat.label} className={`p-6 border-r-2 border-black last:border-r-0 ${i % 2 === 1 ? 'bg-gray-100' : ''}`}>
                <div className="text-3xl md:text-5xl font-black">{stat.num}</div>
                <div className="font-mono text-xs mt-2 uppercase">{stat.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA CON IMMAGINE */}
        <section className="min-h-[80vh] bg-black text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <img src={IMAGES.abstract3} alt="Background" className="w-full h-full object-cover grayscale" />
          </div>
          <div className="relative z-10 flex flex-col justify-center items-center h-full p-8 text-center">
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-black uppercase leading-tight">Hai un<br />progetto?</h2>
            <motion.a href="mailto:info@etereastudio.com" whileHover={{ scale: 1.05 }} className="mt-8 bg-white text-black px-8 py-4 text-sm font-black uppercase tracking-widest hover:bg-gray-200 transition-colors">
              Iniziamo a parlarne
            </motion.a>
          </div>
        </section>
      </div>
    )
  },

  'Contatti': {
    title: 'CONTATTI',
    url: 'etereastudio.com/contatti',
    content: (
      <div className="bg-white text-black">
        <section className="min-h-[70vh] border-b-2 border-black relative">
          <div className="absolute right-8 top-1/2 -translate-y-1/2 hidden md:block">
            <VerticalText text="Get in Touch — Let's Talk" />
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[70vh]">
            <div className="flex flex-col justify-center p-8 md:p-16">
              <motion.div initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
                <span className="font-mono text-xs border border-black px-3 py-1 inline-block mb-6">CONTATTI</span>
                <h1 className="text-4xl md:text-6xl font-black uppercase leading-none">Parliamo del tuo progetto</h1>
                <p className="text-sm mt-6 max-w-lg leading-relaxed">
                  Siamo sempre interessati a nuove sfide. Che tu abbia un'idea chiara o solo un'intuizione, contattaci.
                </p>
              </motion.div>
            </div>
            <div className="relative border-l-2 border-black">
              <BrutalImage src={IMAGES.office} alt="Office" aspect="h-full" className="h-full" />
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 border-b-2 border-black">
          <div className="p-8 md:p-12 border-r-2 border-black">
            <div className="space-y-8">
              <div>
                <span className="font-mono text-xs uppercase opacity-50">Email</span>
                <a href="mailto:info@etereastudio.com" className="block text-xl font-bold mt-2 hover:underline">info@etereastudio.com</a>
              </div>
              <div>
                <span className="font-mono text-xs uppercase opacity-50">Telefono</span>
                <p className="text-xl font-bold mt-2">+39 333 1234567</p>
              </div>
            </div>
          </div>
          <div className="p-8 md:p-12 bg-gray-50">
            <div className="space-y-8">
              <div>
                <span className="font-mono text-xs uppercase opacity-50">Indirizzo</span>
                <p className="text-lg font-bold mt-2">Via Roma 123, 55100 Lucca</p>
              </div>
              <div>
                <span className="font-mono text-xs uppercase opacity-50">Orari</span>
                <p className="text-sm mt-2">Lun-Ven: 9:00 - 18:00</p>
              </div>
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-2">
          <div className="p-8 md:p-16 border-r-2 border-black">
            <h2 className="text-2xl font-black uppercase mb-8">Scrivici</h2>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="font-mono text-xs uppercase block mb-2">Nome</label>
                  <input type="text" className="w-full border-b-2 border-black bg-transparent py-3 text-base focus:outline-none" placeholder="Mario Rossi" />
                </div>
                <div>
                  <label className="font-mono text-xs uppercase block mb-2">Email</label>
                  <input type="email" className="w-full border-b-2 border-black bg-transparent py-3 text-base focus:outline-none" placeholder="mario@example.com" />
                </div>
              </div>
              <div>
                <label className="font-mono text-xs uppercase block mb-2">Messaggio</label>
                <textarea rows="5" className="w-full border-b-2 border-black bg-transparent py-3 text-base focus:outline-none resize-none" placeholder="Raccontaci il tuo progetto..." />
              </div>
              <motion.button whileHover={{ scale: 1.02 }} className="bg-black text-white px-8 py-4 text-sm font-black uppercase tracking-widest">
                Invia →
              </motion.button>
            </form>
          </div>
          <div className="relative min-h-[400px]">
            <BrutalImage src={IMAGES.meeting} alt="Meeting" aspect="h-full" className="h-full" />
          </div>
        </section>
      </div>
    )
  },

  'Chi siamo': {
    title: 'CHI SIAMO',
    url: 'etereastudio.com/chi-siamo',
    content: (
      <div className="bg-white text-black">
        <section className="min-h-screen bg-black text-white relative overflow-hidden">
          <div className="absolute right-8 top-1/2 -translate-y-1/2 hidden md:block opacity-30">
            <VerticalText text="About Us — Our Story" />
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
            <div className="flex flex-col justify-center p-8 md:p-16">
              <motion.h1 initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-5xl md:text-7xl lg:text-8xl font-black uppercase leading-none">
                Chi<br />Siamo
              </motion.h1>
            </div>
            <div className="relative">
              <BrutalImage src={IMAGES.team} alt="Team" aspect="h-full" className="h-full border-l-2 border-white" />
            </div>
          </div>
        </section>

        <section className="p-8 md:p-16 border-b-2 border-black">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <span className="font-mono text-xs border border-black px-3 py-1 inline-block mb-6">LA NOSTRA STORIA</span>
                <p className="text-lg leading-relaxed">
                  Eterea Studio nasce nel 2020 dalla fusione di due menti creative. Partiti da un garage a Lucca, oggi siamo un team di 12 persone.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <BrutalImage src={IMAGES.office} alt="Office" aspect="aspect-square" />
                <BrutalImage src={IMAGES.workspace} alt="Workspace" aspect="aspect-square" delay={0.1} />
              </div>
            </div>
          </div>
        </section>

        <section className="border-b-2 border-black">
          <div className="grid grid-cols-1 md:grid-cols-3">
            {[
              { title: 'Innovazione', desc: 'Esploriamo costantemente nuove tecnologie.' },
              { title: 'Qualità', desc: 'Nessun compromesso sulla qualità.' },
              { title: 'Collaborazione', desc: 'Lavoriamo con i clienti, non per i clienti.' }
            ].map((val, i) => (
              <div key={val.title} className={`p-8 md:p-12 ${i < 2 ? 'border-r-2 border-black' : ''} ${i === 1 ? 'bg-gray-100' : ''}`}>
                <span className="text-4xl font-black text-gray-200">0{i + 1}</span>
                <h3 className="text-xl font-black uppercase mt-4 mb-4">{val.title}</h3>
                <p className="text-sm">{val.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="p-8 md:p-16">
          <h2 className="text-2xl font-black uppercase mb-12">Il Team</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: 'Lorenzo P.', role: 'Creative Director', img: IMAGES.abstract1 },
              { name: 'Marco B.', role: 'Lead Developer', img: IMAGES.abstract2 },
              { name: 'Giulia R.', role: 'UI Designer', img: IMAGES.abstract3 },
              { name: 'Andrea M.', role: 'Motion', img: IMAGES.texture },
            ].map((member, i) => (
              <BrutalImageText key={member.name} src={member.img} text={member.name} subtext={member.role} delay={i * 0.1} />
            ))}
          </div>
        </section>
      </div>
    )
  },

  'Servizi': {
    title: 'SERVIZI',
    url: 'etereastudio.com/servizi',
    content: (
      <div className="bg-white text-black">
        {/* HERO */}
        <section className="min-h-[80vh] bg-black text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <img src={IMAGES.workspace} alt="Background" className="w-full h-full object-cover grayscale" />
          </div>
          <div className="relative z-10 flex flex-col justify-center min-h-[80vh] p-8 md:p-16">
            <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
              <span className="font-mono text-xs border border-white px-3 py-1 inline-block mb-6">WHAT WE DO</span>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black uppercase leading-none">Tutti i<br />Servizi</h1>
              <p className="text-sm md:text-base mt-6 max-w-xl text-gray-400">
                Design, sviluppo, strategia. Tutto in un unico studio.
              </p>
            </motion.div>
          </div>
        </section>

        {/* LISTA SERVIZI */}
        <section>
          {[
            { num: '01', title: 'Siti Web', desc: 'Design moderno, performance ottimali, esperienze utente memorabili.', img: IMAGES.web },
            { num: '02', title: 'App Mobile', desc: 'Sviluppo nativo iOS e Android con esperienze fluide.', img: IMAGES.app },
            { num: '03', title: 'Grafica & Brand', desc: 'Identità visiva completa, brand strategy, brand guidelines.', img: IMAGES.branding },
            { num: '05', title: 'Shooting', desc: 'Fotografia professionale, video production, editing.', img: IMAGES.photo },
            { num: '06', title: 'Social Media', desc: 'Content strategy, content creation, community management.', img: IMAGES.social },
            { num: '07', title: 'Video', desc: 'Commercial, documentary, motion graphics.', img: IMAGES.video },
          ].map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className={`grid grid-cols-1 lg:grid-cols-2 border-b-2 border-black ${i % 2 === 1 ? 'bg-gray-50' : ''}`}
            >
              <div className={`p-8 md:p-16 flex flex-col justify-center ${i % 2 === 1 ? 'lg:order-2 border-l-2 border-black' : 'border-r-2 border-black'}`}>
                <span className="text-6xl md:text-8xl font-black text-gray-200">{service.num}</span>
                <h2 className="text-3xl md:text-5xl font-black uppercase mt-4">{service.title}</h2>
                <p className="text-sm md:text-base mt-6 leading-relaxed">{service.desc}</p>
              </div>
              <div className={`relative overflow-hidden min-h-[300px] ${i % 2 === 1 ? 'lg:order-1' : ''}`}>
                <img src={service.img} alt={service.title} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" />
              </div>
            </motion.div>
          ))}
        </section>

        {/* CTA */}
        <section className="min-h-[60vh] bg-black text-white flex flex-col justify-center items-center p-8 text-center">
          <h2 className="text-4xl md:text-6xl font-black uppercase">Hai un progetto?</h2>
          <p className="text-gray-400 mt-4">Scopri come possiamo aiutarti.</p>
        </section>
      </div>
    )
  },

  'App': {
    title: 'SVILUPPO APP',
    url: 'etereastudio.com/app',
    content: (
      <div className="bg-white text-black">
        <section className="min-h-[80vh] border-b-2 border-black">
          <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[80vh]">
            <div className="flex flex-col justify-center p-8 md:p-16 border-r-2 border-black">
              <motion.div initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }}>
                <span className="font-mono text-xs border border-black px-3 py-1 inline-block mb-6">MOBILE</span>
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-black uppercase leading-none">App<br />Native</h1>
                <p className="text-sm mt-6 max-w-lg leading-relaxed">
                  Sviluppiamo applicazioni mobile per iOS e Android che offrono esperienze utente fluide e performanti.
                </p>
              </motion.div>
            </div>
            <div className="relative">
              <BrutalImage src={IMAGES.app} alt="App" aspect="h-full" className="h-full" />
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 border-b-2 border-black">
          <div className="p-8 md:p-16 border-r-2 border-black">
            <span className="text-3xl">🍎</span>
            <h2 className="text-2xl md:text-4xl font-black uppercase mt-4">iOS</h2>
            <p className="text-sm mt-4 leading-relaxed">
              Sviluppo nativo con Swift e SwiftUI. Performance ottimali su iPhone e iPad. Integrazione completa con l'ecosistema Apple.
            </p>
            <div className="mt-6">
              <BrutalImage src={IMAGES.product} alt="iOS" aspect="aspect-video" />
            </div>
          </div>
          <div className="p-8 md:p-16 bg-gray-50">
            <span className="text-3xl">🤖</span>
            <h2 className="text-2xl md:text-4xl font-black uppercase mt-4">Android</h2>
            <p className="text-sm mt-4 leading-relaxed">
              Kotlin e Jetpack Compose per interfacce moderne. Material Design 3 per un'esperienza coerente.
            </p>
            <div className="mt-6">
              <BrutalImage src={IMAGES.abstract2} alt="Android" aspect="aspect-video" />
            </div>
          </div>
        </section>

        <section className="p-8 md:p-16">
          <h2 className="text-2xl font-black uppercase mb-8">Cross Platform</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {['React Native', 'Flutter', 'PWA'].map((tech, i) => (
              <Block key={tech} className={i === 0 ? 'bg-black text-white' : i === 2 ? 'bg-gray-100' : ''}>
                <h3 className="text-lg font-black uppercase">{tech}</h3>
                <div className="mt-4">
                  <BrutalImage src={i === 0 ? IMAGES.code : i === 1 ? IMAGES.abstract1 : IMAGES.web} alt={tech} aspect="aspect-video" />
                </div>
              </Block>
            ))}
          </div>
        </section>
      </div>
    )
  },

  'Grafica': {
    title: 'GRAFICA & BRAND',
    url: 'etereastudio.com/grafica',
    content: (
      <div className="bg-white text-black">
        <section className="min-h-screen bg-black text-white">
          <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
            <div className="flex flex-col justify-center p-8 md:p-16">
              <motion.h1 initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="text-5xl md:text-7xl lg:text-8xl font-black uppercase leading-none">
                Visual<br />Identity
              </motion.h1>
              <p className="text-sm mt-6 max-w-xl text-gray-400 leading-relaxed">
                Brand identity che comunicano valori. Design sistematico che scala con il tuo business.
              </p>
            </div>
            <div className="relative">
              <BrutalImage src={IMAGES.branding} alt="Branding" aspect="h-full" className="h-full border-l-2 border-white" />
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 border-b-2 border-black">
          <div className="p-8 md:p-16 border-r-2 border-black">
            <h2 className="text-2xl md:text-4xl font-black uppercase mb-6">Brand Identity</h2>
            <ul className="space-y-3 text-sm">
              <li>• Logo Design & Brandmark</li>
              <li>• Color Palette & Typography</li>
              <li>• Brand Guidelines</li>
              <li>• Brand Strategy</li>
            </ul>
            <div className="mt-8">
              <BrutalImage src={IMAGES.design} alt="Design" aspect="aspect-video" />
            </div>
          </div>
          <div className="p-8 md:p-16 bg-gray-50">
            <h2 className="text-2xl md:text-4xl font-black uppercase mb-6">Print Design</h2>
            <ul className="space-y-3 text-sm">
              <li>• Business Cards & Stationery</li>
              <li>• Brochure & Cataloghi</li>
              <li>• Packaging Design</li>
              <li>• Editorial</li>
            </ul>
            <div className="mt-8">
              <BrutalImage src={IMAGES.product} alt="Print" aspect="aspect-video" />
            </div>
          </div>
        </section>

        <section className="p-8 md:p-16">
          <h2 className="text-2xl font-black uppercase mb-8">Portfolio</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {[IMAGES.abstract1, IMAGES.abstract2, IMAGES.abstract3, IMAGES.texture, IMAGES.branding, IMAGES.design, IMAGES.product, IMAGES.creative].map((src, i) => (
              <BrutalImage key={i} src={src} alt={`Portfolio ${i}`} delay={i * 0.05} />
            ))}
          </div>
        </section>
      </div>
    )
  },


  'Shooting': {
    title: 'PHOTO & VIDEO',
    url: 'etereastudio.com/shooting',
    content: (
      <div className="bg-white text-black">
        <div className="bg-black text-white py-24 border-b-2 border-black overflow-hidden">
          <motion.div animate={{ x: [0, -1000] }} transition={{ repeat: Infinity, duration: 20, ease: 'linear' }} className="flex whitespace-nowrap">
            <span className="text-6xl md:text-8xl lg:text-9xl font-black uppercase px-8">SHOOTING • PHOTO • VIDEO •</span>
          </motion.div>
        </div>

        <section className="grid grid-cols-1 md:grid-cols-2 border-b-2 border-black">
          <div className="p-8 md:p-16 border-r-2 border-black">
            <span className="font-mono text-xs">01</span>
            <h2 className="text-2xl md:text-4xl font-black uppercase mt-2">Fotografia</h2>
            <ul className="mt-6 space-y-2 text-sm">
              <li>Product Photography</li>
              <li>Corporate Portrait</li>
              <li>Fashion & Editorial</li>
              <li>Food Photography</li>
            </ul>
            <div className="mt-8">
              <BrutalImage src={IMAGES.photo} alt="Photo" aspect="aspect-[4/3]" />
            </div>
          </div>
          <div className="p-8 md:p-16 bg-gray-50">
            <span className="font-mono text-xs">02</span>
            <h2 className="text-2xl md:text-4xl font-black uppercase mt-2">Video</h2>
            <ul className="mt-6 space-y-2 text-sm">
              <li>Commercial & Spot</li>
              <li>Corporate Video</li>
              <li>Documentary</li>
              <li>Music Video</li>
            </ul>
            <div className="mt-8">
              <BrutalImage src={IMAGES.video} alt="Video" aspect="aspect-[4/3]" />
            </div>
          </div>
        </section>

        <section className="p-8 md:p-16">
          <h2 className="text-2xl font-black uppercase mb-8">Gallery</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {[IMAGES.photo, IMAGES.video, IMAGES.team, IMAGES.office, IMAGES.abstract1, IMAGES.abstract2].map((src, i) => (
              <BrutalImage key={i} src={src} alt={`Gallery ${i}`} delay={i * 0.1} aspect={i === 0 || i === 5 ? 'aspect-[3/4]' : 'aspect-video'} />
            ))}
          </div>
        </section>
      </div>
    )
  },

  'Siti Web': {
    title: 'WEB DEVELOPMENT',
    url: 'etereastudio.com/siti-web',
    content: (
      <div className="bg-white text-black">
        <section className="min-h-[80vh] border-b-2 border-black">
          <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[80vh]">
            <div className="flex flex-col justify-center p-8 md:p-16 border-r-2 border-black">
              <motion.div initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }}>
                <span className="font-mono text-xs border border-black px-3 py-1 inline-block mb-6">WEB</span>
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-black uppercase leading-none">Siti Web<br /><span className="text-gray-300">Performanti</span></h1>
                <p className="text-sm mt-6 max-w-lg leading-relaxed">
                  Design moderno, performance ottimali, esperienze utente memorabili.
                </p>
              </motion.div>
            </div>
            <div className="relative">
              <BrutalImage src={IMAGES.web} alt="Web" aspect="h-full" className="h-full" />
            </div>
          </div>
        </section>

        <section className="p-8 md:p-16 border-b-2 border-black">
          <h2 className="text-2xl md:text-4xl font-black uppercase mb-8">Tech Stack</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {['React', 'Next.js', 'Vue', 'Node.js', 'TypeScript', 'Tailwind', 'Three.js', 'Framer'].map((tech, i) => (
              <div key={tech} className="p-4 border border-black hover:bg-black hover:text-white transition-colors cursor-pointer group">
                <div className="aspect-video mb-2 overflow-hidden">
                  <img src={[IMAGES.code, IMAGES.abstract1, IMAGES.abstract2, IMAGES.abstract3, IMAGES.texture, IMAGES.design, IMAGES.motion, IMAGES.workspace][i]} alt={tech} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all" />
                </div>
                <span className="text-xs font-mono uppercase opacity-50">{['Frontend', 'Framework', 'Frontend', 'Backend', 'Language', 'CSS', '3D', 'Animation'][i]}</span>
                <p className="font-bold">{tech}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-3">
          {[
            { title: 'Landing Page', price: 'Da €2.500', img: IMAGES.abstract1 },
            { title: 'Sito Corporate', price: 'Da €5.000', img: IMAGES.workspace },
            { title: 'E-commerce', price: 'Da €8.000', img: IMAGES.product }
          ].map((s, i) => (
            <div key={s.title} className={`p-8 ${i < 2 ? 'border-r-2 border-black' : ''} ${i === 1 ? 'bg-gray-50' : ''}`}>
              <BrutalImage src={s.img} alt={s.title} aspect="aspect-video" className="mb-4" />
              <span className="font-black text-2xl">{s.price}</span>
              <h3 className="text-xl font-black uppercase mt-4">{s.title}</h3>
            </div>
          ))}
        </section>
      </div>
    )
  },

  'Social Media': {
    title: 'SOCIAL MEDIA',
    url: 'etereastudio.com/social',
    content: (
      <div className="bg-white text-black">
        <section className="min-h-[70vh] bg-black text-white">
          <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[70vh]">
            <div className="flex flex-col justify-center p-8 md:p-16">
              <motion.h1 initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-5xl md:text-7xl lg:text-8xl font-black uppercase leading-none">Social<br />First</motion.h1>
              <p className="text-sm mt-6 max-w-lg text-gray-400 leading-relaxed">
                Strategia, contenuti e gestione per costruire community autentiche.
              </p>
            </div>
            <div className="relative">
              <BrutalImage src={IMAGES.social} alt="Social" aspect="h-full" className="h-full border-l-2 border-white" />
            </div>
          </div>
        </section>

        <section className="grid grid-cols-2 md:grid-cols-4 border-b-2 border-black">
          {['Instagram', 'TikTok', 'LinkedIn', 'YouTube'].map((p, i) => (
            <div key={p} className={`p-6 border-r-2 border-black last:border-r-0 ${i % 2 === 1 ? 'bg-gray-50' : ''}`}>
              <h3 className="text-lg font-black uppercase">{p}</h3>
              <p className="font-mono text-xs mt-2">@eterea.studio</p>
            </div>
          ))}
        </section>

        <section className="p-8 md:p-16 border-b-2 border-black">
          <h2 className="text-2xl md:text-4xl font-black uppercase mb-8">Servizi</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { title: 'Content Strategy', desc: 'Pianificazione editoriale basata su dati.', img: IMAGES.workspace },
              { title: 'Content Creation', desc: 'Copywriting, grafiche, foto, video.', img: IMAGES.creative },
              { title: 'Community Management', desc: 'Risposta a commenti e DM.', img: IMAGES.team },
              { title: 'Paid Advertising', desc: 'Meta Ads, TikTok Ads, LinkedIn Ads.', img: IMAGES.abstract2 }
            ].map((s, i) => (
              <div key={s.title} className="border-2 border-black overflow-hidden group cursor-pointer hover:bg-black hover:text-white transition-colors">
                <div className="aspect-video overflow-hidden">
                  <img src={s.img} alt={s.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all" />
                </div>
                <div className="p-4">
                  <span className="text-xs font-mono opacity-50">0{i + 1}</span>
                  <h3 className="text-lg font-black uppercase mt-2">{s.title}</h3>
                  <p className="text-sm mt-2">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="p-8 md:p-16">
          <h2 className="text-2xl font-black uppercase mb-8">Packages</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {['Starter', 'Pro', 'Enterprise'].map((pkg, i) => (
              <div key={pkg} className={`p-6 border-2 border-black ${i === 1 ? 'bg-black text-white' : ''}`}>
                <h3 className="text-xl font-black uppercase">{pkg}</h3>
                <p className="text-2xl font-bold mt-2">{['€800', '€1.500', 'Custom'][i]}/mese</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    )
  },

  'Video': {
    title: 'VIDEO PRODUCTION',
    url: 'etereastudio.com/video',
    content: (
      <div className="bg-black text-white">
        <section className="min-h-screen flex flex-col justify-center items-center relative overflow-hidden">
          <div className="absolute inset-0">
            <img src={IMAGES.video} alt="Background" className="w-full h-full object-cover opacity-30 grayscale" />
          </div>
          <motion.h1 initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} className="text-6xl md:text-8xl lg:text-9xl font-black uppercase text-center relative z-10">
            VIDEO
          </motion.h1>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 border-y-2 border-white">
          {['Commercial', 'Documentary', 'Motion', 'Social'].map((c, i) => (
            <div key={c} className={`p-8 md:p-12 border-r-2 border-b-2 border-white ${i % 2 === 1 ? 'border-r-0' : ''} ${i > 1 ? 'border-b-0' : ''}`}>
              <div className="aspect-video mb-6 overflow-hidden">
                <img src={[IMAGES.video, IMAGES.team, IMAGES.motion, IMAGES.social][i]} alt={c} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500" />
              </div>
              <h2 className="text-2xl md:text-4xl font-black uppercase">{c}</h2>
              <p className="text-sm mt-4 text-gray-400">Contenuti video professionali per ogni piattaforma.</p>
            </div>
          ))}
        </section>

        <section className="p-8 md:p-16">
          <h2 className="text-2xl md:text-4xl font-black uppercase mb-8">Specs</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {['4K / 6K / 8K', '24 / 30 / 60 / 120', 'HDR / LOG / RAW', 'Any format'].map((spec, i) => (
              <div key={spec} className="text-center">
                <div className="text-2xl md:text-4xl font-black">{spec}</div>
                <div className="font-mono text-xs text-gray-500 mt-2 uppercase">{['Resolution', 'Frame Rate', 'Color', 'Delivery'][i]}</div>
              </div>
            ))}
          </div>
        </section>
      </div>
    )
  }
};

export function getFolderContent(folderName) {
  return folderContents[folderName] || {
    title: folderName.toUpperCase(),
    url: 'etereastudio.com',
    content: (
      <div className="min-h-screen bg-white flex flex-col justify-center items-center p-8">
        <h1 className="text-4xl md:text-6xl font-black uppercase">{folderName}</h1>
        <p className="text-lg font-bold mt-4">Coming Soon</p>
      </div>
    )
  };
}
