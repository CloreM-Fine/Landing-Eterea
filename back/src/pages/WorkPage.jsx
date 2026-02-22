import React from 'react';
import { motion } from 'framer-motion';

// Placeholder images per il portfolio
const PORTFOLIO_ITEMS = [
  {
    id: 1,
    title: 'BRAND REFRESH',
    client: 'TechCorp',
    category: 'Branding',
    year: '2024',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1200&h=800&fit=crop',
    link: '#',
  },
  {
    id: 2,
    title: 'E-COMMERCE PLATFORM',
    client: 'Fashion Brand',
    category: 'Web Development',
    year: '2024',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=800&fit=crop',
    link: '#',
  },
  {
    id: 3,
    title: 'MOBILE APP',
    client: 'StartupXYZ',
    category: 'App Development',
    year: '2023',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1200&h=800&fit=crop',
    link: '#',
  },
  {
    id: 4,
    title: 'CORPORATE VIDEO',
    client: 'Industry Leader',
    category: 'Video Production',
    year: '2023',
    image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=1200&h=800&fit=crop',
    link: '#',
  },
  {
    id: 5,
    title: '3D PRODUCT VISUALIZATION',
    client: 'Product Co',
    category: '3D & Motion',
    year: '2023',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&h=800&fit=crop',
    link: '#',
  },
  {
    id: 6,
    title: 'SOCIAL CAMPAIGN',
    client: 'Lifestyle Brand',
    category: 'Social Media',
    year: '2024',
    image: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=1200&h=800&fit=crop',
    link: '#',
  },
  {
    id: 7,
    title: 'PHOTO SHOOT',
    client: 'Luxury Brand',
    category: 'Photography',
    year: '2024',
    image: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=1200&h=800&fit=crop',
    link: '#',
  },
  {
    id: 8,
    title: 'WEB APP DASHBOARD',
    client: 'SaaS Company',
    category: 'Web Development',
    year: '2023',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=800&fit=crop',
    link: '#',
  },
  {
    id: 9,
    title: 'BRAND IDENTITY',
    client: 'Restaurant Chain',
    category: 'Branding',
    year: '2023',
    image: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=1200&h=800&fit=crop',
    link: '#',
  },
  {
    id: 10,
    title: 'MOTION GRAPHICS',
    client: 'Agency Partner',
    category: 'Motion',
    year: '2024',
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1200&h=800&fit=crop',
    link: '#',
  },
  {
    id: 11,
    title: 'CORPORATE SITE',
    client: 'Consulting Firm',
    category: 'Web Development',
    year: '2024',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&h=800&fit=crop',
    link: '#',
  },
  {
    id: 12,
    title: 'PRODUCT LAUNCH',
    client: 'Tech Startup',
    category: 'Campaign',
    year: '2024',
    image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=1200&h=800&fit=crop',
    link: '#',
  },
];

const PortfolioItem = ({ item, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ delay: index * 0.1 }}
    className="group border-b-2 border-black last:border-b-0"
  >
    <a href={item.link} target="_blank" rel="noopener noreferrer" className="block">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
        {/* Image */}
        <div className="lg:col-span-8 relative overflow-hidden">
          <div className="aspect-[16/9] lg:aspect-[21/9] overflow-hidden">
            <motion.img
              src={item.image}
              alt={item.title}
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
              whileHover={{ scale: 1.05 }}
            />
          </div>
          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
          {/* Border */}
          <div className="absolute inset-0 border-4 border-transparent group-hover:border-black transition-colors duration-300 pointer-events-none" />
        </div>
        
        {/* Info */}
        <div className="lg:col-span-4 p-6 md:p-8 flex flex-col justify-between border-l-2 border-black">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="font-mono text-xs border border-black px-2 py-1">{item.category}</span>
              <span className="font-mono text-xs">{item.year}</span>
            </div>
            <h3 className="text-2xl md:text-3xl font-black uppercase leading-tight group-hover:underline decoration-2 underline-offset-4">
              {item.title}
            </h3>
            <p className="text-sm text-gray-600 mt-2">{item.client}</p>
          </div>
          
          <div className="mt-6 flex items-center gap-2 text-xs font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
            <span>View Project</span>
            <span>→</span>
          </div>
        </div>
      </div>
    </a>
  </motion.div>
);

export function WorkPage() {
  return (
    <div className="bg-white text-black min-h-screen">
      {/* HERO */}
      <section className="min-h-[70vh] flex flex-col justify-center p-8 md:p-16 border-b-2 border-black relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl"
        >
          <span className="font-mono text-xs border border-black px-4 py-2 inline-block mb-8">
            SELECTED WORKS
          </span>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black uppercase leading-none tracking-tighter">
            Portfolio
          </h1>
          <p className="max-w-xl text-sm md:text-base mt-8 leading-relaxed">
            Una selezione dei progetti che hanno definito il nostro percorso. 
            Ogni lavoro rappresenta una sfida superata, un obiettivo raggiunto, una storia da raccontare.
          </p>
        </motion.div>
        
        {/* Decorative */}
        <div className="absolute right-8 bottom-8 text-6xl font-black text-gray-200 select-none hidden lg:block">
          {PORTFOLIO_ITEMS.length.toString().padStart(2, '0')}
        </div>
      </section>

      {/* FILTER BAR */}
      <section className="border-b-2 border-black sticky top-0 bg-white z-10">
        <div className="flex overflow-x-auto">
          {['All', 'Branding', 'Web', 'App', 'Video', 'Photo', 'Motion', '3D'].map((filter, i) => (
            <button
              key={filter}
              className={`px-6 py-4 text-xs font-black uppercase tracking-widest border-r-2 border-black last:border-r-0 whitespace-nowrap hover:bg-black hover:text-white transition-colors ${i === 0 ? 'bg-black text-white' : ''}`}
            >
              {filter}
            </button>
          ))}
        </div>
      </section>

      {/* PORTFOLIO LIST */}
      <section>
        {PORTFOLIO_ITEMS.map((item, index) => (
          <PortfolioItem key={item.id} item={item} index={index} />
        ))}
      </section>

      {/* LOAD MORE */}
      <section className="p-8 md:p-16 border-t-2 border-black text-center">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-10 py-5 border-2 border-black text-sm font-black uppercase tracking-widest hover:bg-black hover:text-white transition-colors"
        >
          Load More
        </motion.button>
      </section>

      {/* CTA */}
      <section className="min-h-[50vh] bg-black text-white flex flex-col justify-center items-center p-8">
        <h2 className="text-3xl md:text-5xl font-black uppercase text-center">
          Hai un progetto in mente?
        </h2>
        <motion.a
          href="mailto:info@etereastudio.com"
          whileHover={{ scale: 1.05 }}
          className="mt-8 bg-white text-black px-10 py-5 text-sm font-black uppercase tracking-widest"
        >
          Iniziamo →
        </motion.a>
      </section>
    </div>
  );
}
