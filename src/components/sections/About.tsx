import { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { Heart, Lightbulb, Users, Target, Award, Sparkles, Zap, Globe } from 'lucide-react';
import { Logo } from '../ui/Logo';

const stats = [
  { number: '3', label: 'Founder', icon: Target },
  { number: '360°', label: 'Soluzioni integrate', icon: Zap },
  { number: '∞', label: 'Passione per il design', icon: Heart },
  { number: '100%', label: 'Focus sui risultati', icon: Award },
];

const values = [
  {
    icon: Lightbulb,
    title: 'Innovazione',
    description: 'Esploriamo sempre nuove tecnologie e approcci creativi per offrire soluzioni all\'avanguardia.',
    color: '#A8D0E6',
  },
  {
    icon: Heart,
    title: 'Passione',
    description: 'Amiamo ciò che facciamo e questo si riflette in ogni progetto che realizziamo.',
    color: '#F4C2A1',
  },
  {
    icon: Users,
    title: 'Collaborazione',
    description: 'Lavoriamo a stretto contatto con i nostri clienti, trasformando le loro visioni in realtà.',
    color: '#B5C7A6',
  },
];



export function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const isStatsInView = useInView(statsRef, { once: true, margin: '-100px' });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section id="chi-siamo" ref={containerRef} className="relative py-24 lg:py-32 bg-white overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 -left-20 w-96 h-96 rounded-full opacity-20"
          style={{ background: 'linear-gradient(135deg, #A8D0E6, #C5B9CD)' }}
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{ duration: 30, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-20 -right-20 w-80 h-80 rounded-full opacity-15"
          style={{ background: 'linear-gradient(135deg, #F4C2A1, #E8E4A0)' }}
          animate={{ 
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
          }}
          transition={{ duration: 25, repeat: Infinity }}
        />
      </div>

      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-12 xl:px-20">
        {/* Hero Section */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-24 lg:mb-32">
          {/* Content */}
          <div>
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-eterea-cream mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-sm font-medium text-eterea-dark">Chi siamo</span>
            </motion.div>

            <motion.h2
              className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-eterea-dark mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              Siamo <span className="gradient-text">Eterea</span>
            </motion.h2>

            <motion.p
              className="text-lg text-eterea-gray mb-6 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              Nati dalla passione per il design e la tecnologia, siamo uno studio creativo 
              che crede nella potenza delle idee semplici. Il nostro nome deriva dall'etereo, 
              quel qualcosa di leggero e impalpabile che trasforma il comune in straordinario.
            </motion.p>

            <motion.p
              className="text-eterea-gray mb-8 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              Ogni progetto è per noi un'opportunità di creare qualcosa di unico, 
              che emozioni e lasci il segno. Non seguiamo trend, li creiamo.
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-eterea-blue/20">
                <span className="w-2 h-2 rounded-full bg-eterea-blue animate-pulse" />
                <span className="text-sm font-medium text-eterea-dark">Disponibili per nuovi progetti</span>
              </div>
            </motion.div>
          </div>

          {/* Visual */}
          <motion.div
            className="relative"
            style={{ y }}
          >
            <div className="relative aspect-square max-w-lg mx-auto">
              {/* Main circle */}
              <motion.div
                className="absolute inset-0 rounded-full overflow-hidden"
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <div className="w-full h-full bg-gradient-to-br from-eterea-blue via-eterea-lilac to-eterea-peach p-1">
                  <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                    <div className="hidden sm:block">
                      <Logo size="xl" animated={true} />
                    </div>
                    <div className="sm:hidden scale-90">
                      <Logo size="md" animated={true} />
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Floating elements */}
              <motion.div
                className="absolute -top-4 -right-4 w-24 h-24 rounded-2xl bg-eterea-sage flex items-center justify-center shadow-lg"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <Lightbulb className="w-10 h-10 text-white" />
              </motion.div>

              <motion.div
                className="absolute -bottom-4 -left-4 w-20 h-20 rounded-2xl bg-eterea-peach flex items-center justify-center shadow-lg"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                <Heart className="w-8 h-8 text-white" />
              </motion.div>

              <motion.div
                className="absolute top-1/2 -right-8 w-16 h-16 rounded-full bg-eterea-lemon flex items-center justify-center shadow-lg"
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 2.5, repeat: Infinity }}
              >
                <Sparkles className="w-6 h-6 text-eterea-dark" />
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Stats */}
        <div 
          ref={statsRef}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-24 lg:mb-32"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="relative p-6 lg:p-8 rounded-3xl bg-eterea-cream overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              animate={isStatsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1 }}
            >
              <stat.icon className="w-8 h-8 text-eterea-gray mb-4" />
              <motion.div
                className="text-4xl lg:text-5xl font-serif font-bold text-eterea-dark mb-2"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={isStatsInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: index * 0.1 + 0.2, type: 'spring' }}
              >
                {stat.number}
              </motion.div>
              <div className="text-sm text-eterea-gray">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Values */}
        <div className="mb-2 lg:mb-4">
          <motion.h3
            className="text-2xl lg:text-3xl font-serif font-bold text-eterea-dark text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            I nostri valori
          </motion.h3>

          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                className="text-center p-8 rounded-3xl bg-white border border-gray-100 hover:shadow-xl transition-shadow"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <motion.div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6"
                  style={{ backgroundColor: `${value.color}30` }}
                  whileHover={{ rotate: [0, -10, 10, 0] }}
                  transition={{ duration: 0.5 }}
                >
                  <value.icon className="w-8 h-8" style={{ color: value.color }} />
                </motion.div>
                <h4 className="text-xl font-bold text-eterea-dark mb-3">{value.title}</h4>
                <p className="text-eterea-gray">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>


      </div>
    </section>
  );
}


