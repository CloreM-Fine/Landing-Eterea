import React from 'react';
import { favorites, posizioni } from '../data/sidebarItems';

export function Sidebar({ colors, onClose, onMaximize, onItemClick, onOpenMaps }) {
  return (
    <div 
      className="w-[200px] h-full flex flex-col"
      style={{ backgroundColor: colors.sidebarBg }}
    >
      {/* Traffic Lights in alto */}
      <div className="flex items-center gap-2 px-4 py-3 h-[46px]">
        <button 
          onClick={onClose}
          className="traffic-light traffic-light-red hover:brightness-110 transition-all cursor-pointer"
          title="Chiudi"
        />
        <div 
          className="traffic-light traffic-light-yellow"
          title="Minimizza"
        />
        <button 
          onClick={onMaximize}
          className="traffic-light traffic-light-green hover:brightness-110 transition-all cursor-pointer"
          title="Massimizza"
        />
      </div>

      {/* Content scrollable */}
      <div className="flex-1 overflow-y-auto px-4 pb-4">
        {/* Preferiti Section */}
        <div className="mb-6">
          <h3 
            className="text-[11px] font-semibold uppercase mb-3 px-2 tracking-wide"
            style={{ color: colors.sidebarHeader }}
          >
            Preferiti
          </h3>
          <nav className="space-y-0.5">
            {favorites.map((item) => {
              const Icon = item.icon;
              const handleClick = (e) => {
                e.preventDefault();
                if (onItemClick) {
                  if (item.name === 'Chi siamo') {
                    onItemClick('Chi siamo');
                  } else if (item.name === 'Contatti') {
                    onItemClick('Contatti');
                  } else if (item.name === 'Immagini' || item.name === 'Musica' || item.name === 'Filmati') {
                    // Non fare nulla per ora
                    return;
                  } else {
                    // Per gli altri elementi, apri una pagina generica o specifica
                    onItemClick(item.name);
                  }
                }
              };
              
              return (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={handleClick}
                  className="flex items-center gap-3 px-2 py-1.5 rounded-md text-[13px] transition-colors cursor-pointer"
                  style={{ color: colors.sidebarText }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = colors.sidebarHover;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                >
                  <Icon size={16} className="shrink-0" style={{ color: '#3b82f6' }} />
                  <span className="truncate">{item.name}</span>
                </a>
              );
            })}
          </nav>
        </div>

        {/* Posizioni Section */}
        <div className="mb-6">
          <h3 
            className="text-[11px] font-semibold uppercase mb-3 px-2 tracking-wide"
            style={{ color: colors.sidebarHeader }}
          >
            Posizioni
          </h3>
          <nav className="space-y-0.5">
            {posizioni.map((item) => {
              const Icon = item.icon;
              
              const handleClick = (e) => {
                e.preventDefault();
                
                if (item.name.includes('Via Roma')) {
                  // Apri Google Maps in una nuova finestra EtereaOS
                  if (onOpenMaps) {
                    onOpenMaps();
                  }
                } else if (item.name.startsWith('+39')) {
                  // Chiama il numero
                  window.location.href = `tel:${item.name.replace(/\s/g, '')}`;
                } else if (item.name.includes('@')) {
                  // Invia email
                  window.location.href = `mailto:${item.name}`;
                } else if (item.name === 'Contatti') {
                  if (onItemClick) {
                    onItemClick('Contatti');
                  }
                } else {
                  if (onItemClick) {
                    onItemClick(item.name);
                  }
                }
              };
              
              return (
                <a
                  key={item.id}
                  href="#"
                  onClick={handleClick}
                  className="flex items-center gap-3 px-2 py-1.5 rounded-md text-[13px] transition-colors cursor-pointer"
                  style={{ color: colors.sidebarText }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = colors.sidebarHover;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                >
                  <Icon size={16} className="shrink-0" style={{ color: '#3b82f6' }} />
                  <span className="truncate">{item.name}</span>
                </a>
              );
            })}
          </nav>
        </div>
      </div>
    </div>
  );
}
