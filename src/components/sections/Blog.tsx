import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Clock, Calendar, User, BookOpen, TrendingUp, Lightbulb, Palette } from 'lucide-react';

const categories = ['Tutti', 'Design', 'Tecnologia', 'Branding', 'Tutorial'];

const blogPosts = [
  {
    id: 1,
    title: 'I trend del design web che domineranno il 2025',
    excerpt: 'Scopri le tendenze visive e interattive che definiranno l\'esperienza utente nei prossimi anni, dalla AI generativa al neomorfismo evoluto.',
    category: 'Design',
    image: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800&q=80',
    author: 'Giulia Bianchi',
    date: '15 Gen 2025',
    readTime: '5 min',
    featured: true,
  },
  {
    id: 2,
    title: 'Come creare una brand identity memorabile',
    excerpt: 'Guida completa alla costruzione di un\'identità di marca che risuona con il pubblico e differenzia dal competitors.',
    category: 'Branding',
    image: 'https://images.unsplash.com/photo-1558655146-d09347e92766?w=800&q=80',
    author: 'Marco Rossi',
    date: '10 Gen 2025',
    readTime: '8 min',
    featured: false,
  },
  {
    id: 3,
    title: 'React vs Vue: quale framework scegliere nel 2025',
    excerpt: 'Analisi comparativa dei due framework più popolari per lo sviluppo frontend, con casi d\'uso e considerazioni pratiche.',
    category: 'Tecnologia',
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80',
    author: 'Alessandro Verdi',
    date: '5 Gen 2025',
    readTime: '6 min',
    featured: false,
  },
  {
    id: 4,
    title: 'Color Psychology: come i colori influenzano le decisioni',
    excerpt: 'Esploriamo l\'impatto psicologico dei colori nel design e come sfruttarli per migliorare conversioni e percezione del brand.',
    category: 'Design',
    image: 'https://images.unsplash.com/photo-1502691876148-a84978e59af8?w=800&q=80',
    author: 'Sofia Neri',
    date: '28 Dic 2024',
    readTime: '4 min',
    featured: false,
  },
  {
    id: 5,
    title: 'Tutorial: Animazioni fluide con Framer Motion',
    excerpt: 'Guida pratica per creare animazioni professionali nelle tue applicazioni React, dalle basi alle tecniche avanzate.',
    category: 'Tutorial',
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&q=80',
    author: 'Alessandro Verdi',
    date: '20 Dic 2024',
    readTime: '10 min',
    featured: false,
  },
  {
    id: 6,
    title: 'Il futuro del mobile design: beyond the screen',
    excerpt: 'Dalle interfacce vocali all\'AR, esploriamo come il design mobile sta evolvendo oltre i tradizionali schermi touch.',
    category: 'Tecnologia',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80',
    author: 'Giulia Bianchi',
    date: '15 Dic 2024',
    readTime: '7 min',
    featured: false,
  },
];

const categoryIcons: Record<string, React.ElementType> = {
  'Design': Palette,
  'Tecnologia': TrendingUp,
  'Branding': BookOpen,
  'Tutorial': Lightbulb,
};

export function Blog() {
  const [activeCategory, setActiveCategory] = useState('Tutti');
  const [hoveredPost, setHoveredPost] = useState<number | null>(null);

  const filteredPosts = activeCategory === 'Tutti' 
    ? blogPosts 
    : blogPosts.filter(post => post.category === activeCategory);

  const featuredPost = blogPosts.find(post => post.featured);
  const regularPosts = filteredPosts.filter(post => !post.featured || activeCategory !== 'Tutti');

  return (
    <section id="blog" className="relative py-24 lg:py-32 bg-white overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 -right-40 w-96 h-96 rounded-full opacity-10"
          style={{ background: 'linear-gradient(135deg, #A8D0E6, #C5B9CD)' }}
          animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
          transition={{ duration: 25, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-20 -left-40 w-80 h-80 rounded-full opacity-10"
          style={{ background: 'linear-gradient(135deg, #F4C2A1, #E8E4A0)' }}
          animate={{ scale: [1.2, 1, 1.2], rotate: [0, -45, 0] }}
          transition={{ duration: 20, repeat: Infinity }}
        />
      </div>

      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-12 xl:px-20">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-eterea-cream mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <BookOpen className="w-4 h-4 text-eterea-peach" />
            <span className="text-sm font-medium text-eterea-dark">Blog</span>
          </motion.div>

          <motion.h2
            className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-eterea-dark mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            Insights e <span className="gradient-text">ispirazioni</span>
          </motion.h2>

          <motion.p
            className="text-lg text-eterea-gray"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Esploriamo insieme il mondo del design, della tecnologia e della creatività. 
            Articoli, guide e riflessioni dal nostro studio.
          </motion.p>
        </div>

        {/* Category Filter */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          {categories.map((category) => {
            const Icon = categoryIcons[category] || BookOpen;
            return (
              <motion.button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                  activeCategory === category
                    ? 'bg-eterea-dark text-white'
                    : 'bg-eterea-cream text-eterea-gray hover:text-eterea-dark'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {category !== 'Tutti' && <Icon className="w-4 h-4" />}
                {category}
              </motion.button>
            );
          })}
        </motion.div>

        {/* Featured Post (only when showing all) */}
        {activeCategory === 'Tutti' && featuredPost && (
          <motion.article
            className="mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <div 
              className="group relative overflow-hidden rounded-3xl bg-white border border-gray-100 cursor-pointer"
              onMouseEnter={() => setHoveredPost(featuredPost.id)}
              onMouseLeave={() => setHoveredPost(null)}
            >
              <div className="grid lg:grid-cols-2">
                {/* Image */}
                <div className="relative aspect-[4/3] lg:aspect-auto overflow-hidden">
                  <motion.img
                    src={featuredPost.image}
                    alt={featuredPost.title}
                    className="w-full h-full object-cover"
                    animate={{ scale: hoveredPost === featuredPost.id ? 1.05 : 1 }}
                    transition={{ duration: 0.6 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent lg:bg-gradient-to-r" />
                  
                  {/* Category Badge */}
                  <div className="absolute top-6 left-6">
                    <span className="px-4 py-1.5 rounded-full bg-white/90 text-eterea-dark text-sm font-medium">
                      {featuredPost.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-8 lg:p-12 flex flex-col justify-center">
                  <div className="flex items-center gap-4 text-sm text-eterea-gray mb-4">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {featuredPost.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {featuredPost.readTime}
                    </span>
                  </div>

                  <h3 className="text-2xl lg:text-3xl font-serif font-bold text-eterea-dark mb-4 group-hover:text-eterea-gray transition-colors">
                    {featuredPost.title}
                  </h3>

                  <p className="text-eterea-gray mb-6 line-clamp-3">
                    {featuredPost.excerpt}
                  </p>

                  <div className="flex items-center justify-between mt-auto">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-eterea-cream flex items-center justify-center">
                        <User className="w-5 h-5 text-eterea-gray" />
                      </div>
                      <span className="text-sm font-medium text-eterea-dark">{featuredPost.author}</span>
                    </div>

                    <motion.div
                      className="flex items-center gap-2 text-eterea-dark font-medium"
                      animate={{ x: hoveredPost === featuredPost.id ? 5 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      Leggi articolo
                      <ArrowUpRight className="w-5 h-5" />
                    </motion.div>
                  </div>
                </div>
              </div>
            </div>
          </motion.article>
        )}

        {/* Posts Grid */}
        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          layout
        >
          <AnimatePresence mode="popLayout">
            {regularPosts.map((post, index) => (
              <motion.article
                key={post.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: index * 0.1 }}
                className="group cursor-pointer"
                onMouseEnter={() => setHoveredPost(post.id)}
                onMouseLeave={() => setHoveredPost(null)}
              >
                <div className="relative overflow-hidden rounded-2xl bg-white border border-gray-100 h-full flex flex-col">
                  {/* Image */}
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <motion.img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover"
                      animate={{ scale: hoveredPost === post.id ? 1.08 : 1 }}
                      transition={{ duration: 0.6 }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    {/* Category Badge */}
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 rounded-full bg-white/90 text-eterea-dark text-xs font-medium">
                        {post.category}
                      </span>
                    </div>

                    {/* Hover overlay */}
                    <motion.div
                      className="absolute inset-0 flex items-center justify-center"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: hoveredPost === post.id ? 1 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <span className="w-14 h-14 rounded-full bg-white flex items-center justify-center">
                        <ArrowUpRight className="w-6 h-6 text-eterea-dark" />
                      </span>
                    </motion.div>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center gap-3 text-xs text-eterea-gray mb-3">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {post.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {post.readTime}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-eterea-dark mb-2 group-hover:text-eterea-gray transition-colors line-clamp-2">
                      {post.title}
                    </h3>

                    <p className="text-sm text-eterea-gray line-clamp-2 mb-4 flex-1">
                      {post.excerpt}
                    </p>

                    <div className="flex items-center gap-2 pt-4 border-t border-gray-100">
                      <div className="w-8 h-8 rounded-full bg-eterea-cream flex items-center justify-center">
                        <User className="w-4 h-4 text-eterea-gray" />
                      </div>
                      <span className="text-sm text-eterea-gray">{post.author}</span>
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* View All CTA */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <motion.button
            className="inline-flex items-center gap-2 px-8 py-4 border-2 border-eterea-dark text-eterea-dark rounded-full font-medium hover:bg-eterea-dark hover:text-white transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Vedi tutti gli articoli
            <ArrowUpRight className="w-5 h-5" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
