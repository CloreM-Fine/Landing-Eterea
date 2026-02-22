import React from 'react';
import { motion } from 'framer-motion';

const IMAGES = {
  team: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop',
  office: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=1200&h=800&fit=crop',
  workspace: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1200&h=800&fit=crop',
  meeting: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&h=600&fit=crop',
  abstract1: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=600&h=800&fit=crop',
  abstract2: 'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=800&h=600&fit=crop',
};

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

export function ChiSiamoPage() {
  const team = [
    { name: 'Lorenzo P.', role: 'Creative Director', img: IMAGES.abstract1 },
    { name: 'Marco B.', role: 'Lead Developer', img: IMAGES.abstract2 },
    { name: 'Giulia R.', role: 'UI Designer', img: IMAGES.meeting },
    { name: 'Andrea M.', role: 'Motion Designer', img: IMAGES.abstract1 },
    { name: 'Sofia L.', role: 'Project Manager', img: IMAGES.abstract2 },
    { name: 'Davide C.', role: 'Frontend Dev', img: IMAGES.meeting },
  ];

  return (
    <div className="bg-white text-black min-h-screen">
      {/* HERO */}
      <section className="min-h-screen bg-black text-white flex flex-col justify-center relative overflow-hidden">
        <div className="absolute right-8 top-1/2 -translate-y-1/2 hidden md:block opacity-30">
          <div className="text-xs font-mono tracking-widest uppercase" style={{ writingMode: 'vertical-rl' }}>
            About Us — Our Story
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
          <div className="flex flex-col justify-center p-8 md:p-16">
            <motion.h1
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-5xl md:text-7xl lg:text-8xl font-black uppercase leading-none"
            >
              Chi<br />Siamo
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-sm mt-6 max-w-lg text-gray-400 leading-relaxed"
            >
              Un team di creativi, sviluppatori e strategisti uniti dalla passione per il design 
              e la tecnologia. Creiamo esperienze digitali che lasciano il segno.
            </motion.p>
          </div>
          <div className="relative">
            <motion.img
              src={IMAGES.team}
              alt="Team"
              className="w-full h-full object-cover grayscale"
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1 }}
            />
            <div className="absolute inset-0 border-l-2 border-white" />
          </div>
        </div>
      </section>

      {/* STORY */}
      <section className="p-8 md:p-16 border-b-2 border-black">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <span className="font-mono text-xs border border-black px-3 py-1 inline-block mb-6">LA NOSTRA STORIA</span>
              <p className="text-lg leading-relaxed">
                <TextReveal text="Eterea Studio nasce nel 2020 dalla fusione di due menti creative con una visione comune: 
                rompere le regole del design tradizionale. Partiti da un garage a Lucca, oggi siamo un team 
                di 12 persone appassionate che lavorano con clienti in tutta Italia." />
              </p>
              <p className="text-sm mt-6 leading-relaxed text-gray-600">
                Designer, sviluppatori, strategisti. Ognuno porta una prospettiva unica, ma tutti condividiamo 
                la stessa ossessione per la perfezione e la voglia di sperimentare.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <motion.img
                src={IMAGES.office}
                alt="Office"
                className="w-full aspect-square object-cover border-2 border-black grayscale hover:grayscale-0 transition-all"
                whileHover={{ scale: 1.02 }}
              />
              <motion.img
                src={IMAGES.workspace}
                alt="Workspace"
                className="w-full aspect-square object-cover border-2 border-black grayscale hover:grayscale-0 transition-all mt-8"
                whileHover={{ scale: 1.02 }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="border-b-2 border-black">
        <div className="grid grid-cols-1 md:grid-cols-3">
          {[
            { title: 'Innovazione', desc: 'Esploriamo costantemente nuove tecnologie e approcci.' },
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

      {/* TEAM */}
      <section className="p-8 md:p-16">
        <h2 className="text-2xl font-black uppercase mb-12">Il Team</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {team.map((member, i) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="group"
            >
              <div className="aspect-[3/4] overflow-hidden border-2 border-black mb-3">
                <img
                  src={member.img}
                  alt={member.name}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                />
              </div>
              <h4 className="font-bold text-sm uppercase">{member.name}</h4>
              <p className="font-mono text-xs text-gray-500">{member.role}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="min-h-[50vh] bg-black text-white flex flex-col justify-center items-center p-8">
        <h2 className="text-3xl md:text-5xl font-black uppercase text-center">
          Unisciti al team
        </h2>
        <p className="text-sm text-gray-400 mt-4">Siamo sempre alla ricerca di talenti</p>
        <motion.a
          href="mailto:jobs@etereastudio.com"
          whileHover={{ scale: 1.05 }}
          className="mt-8 bg-white text-black px-10 py-5 text-sm font-black uppercase tracking-widest"
        >
          Scrivici
        </motion.a>
      </section>
    </div>
  );
}
