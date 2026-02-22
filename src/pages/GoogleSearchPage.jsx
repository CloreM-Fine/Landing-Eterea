import React from 'react';
import { motion } from 'framer-motion';

export function GoogleSearchPage() {
  return (
    <div className="min-h-full bg-white">
      {/* HEADER */}
      <div className="bg-gray-100 p-4 border-b-4 border-black">
        <div className="flex items-center gap-4">
          <div className="flex gap-0.5">
            <span className="text-blue-500 text-3xl font-bold">G</span>
            <span className="text-red-500 text-3xl font-bold">o</span>
            <span className="text-yellow-500 text-3xl font-bold">o</span>
            <span className="text-blue-500 text-3xl font-bold">g</span>
            <span className="text-green-500 text-3xl font-bold">l</span>
            <span className="text-red-500 text-3xl font-bold">e</span>
          </div>
          <div className="flex-1 bg-white rounded-full px-4 py-2 border-2 border-gray-200 flex items-center shadow-sm">
            <span className="text-gray-500">eterea studio</span>
            <span className="ml-auto">🔍</span>
          </div>
        </div>
      </div>

      {/* SEARCH RESULTS */}
      <div className="p-4">
        <p className="text-gray-500 text-sm mb-4">Circa 42.000 risultati (0.32 secondi)</p>
        
        {/* Result 1 */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="mb-6 p-4 border-2 border-gray-200 rounded-lg hover:border-blue-500 transition-colors"
        >
          <div className="text-green-700 text-sm">https://eterea.studio</div>
          <h3 className="text-blue-700 text-xl font-medium hover:underline cursor-pointer">
            Eterea Studio - Design & Development
          </h3>
          <p className="text-gray-600 mt-1">
            Eterea Studio è un'agenzia creativa specializzata in web design, sviluppo e branding.
          </p>
        </motion.div>

        {/* Result 2 */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="mb-6 p-4 border-2 border-gray-200 rounded-lg hover:border-blue-500 transition-colors"
        >
          <div className="text-green-700 text-sm">https://instagram.com/eterea.studio</div>
          <h3 className="text-blue-700 text-xl font-medium hover:underline cursor-pointer">
            Eterea Studio (@eterea.studio) • Instagram
          </h3>
          <p className="text-gray-600 mt-1">
            Segui i nostri progetti più recenti su Instagram.
          </p>
        </motion.div>

        {/* Result 3 */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-6 p-4 border-2 border-gray-200 rounded-lg hover:border-blue-500 transition-colors"
        >
          <div className="text-green-700 text-sm">https://linkedin.com/company/eterea-studio</div>
          <h3 className="text-blue-700 text-xl font-medium hover:underline cursor-pointer">
            Eterea Studio | LinkedIn
          </h3>
          <p className="text-gray-600 mt-1">
            Scopri di più sulla nostra azienda e i nostri servizi.
          </p>
        </motion.div>

        {/* Related searches */}
        <div className="mt-8 p-4 bg-gray-50 rounded-lg">
          <h4 className="font-bold mb-3">Ricerche correlate</h4>
          <div className="flex flex-wrap gap-2">
            {['web design roma', 'agenzia creativa', 'branding', 'sviluppo app'].map((term) => (
              <span key={term} className="px-3 py-1 bg-white border rounded-full text-sm hover:bg-gray-100 cursor-pointer">
                {term}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
