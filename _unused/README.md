# 🎨 Eterea Studio - Landing Page

[![Vite](https://img.shields.io/badge/Vite-5.4+-646CFF?style=flat-square&logo=vite)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-18+-61DAFB?style=flat-square&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.0+-06B6D4?style=flat-square&logo=tailwindcss)](https://tailwindcss.com/)

Landing page ufficiale di **Eterea Studio**, studio creativo italiano specializzato in design e sviluppo digitale.

🌐 **Live Site:** [https://etereastudio.it](https://etereastudio.it)

---

## ✨ Caratteristiche

- ⚡ **Performance Ottimizzate** - Build Vite con lazy loading
- 🎨 **Design Moderno** - Animazioni Framer Motion e Tailwind CSS
- 📱 **Responsive** - Ottimizzato per mobile, tablet e desktop
- 🔍 **SEO Ready** - Meta tags, Schema.org, sitemap e robots.txt
- 🍪 **Cookie Banner** - GDPR compliant con gestione preferenze
- ♿ **Accessibilità** - ARIA labels e contrasti ottimizzati

---

## 🚀 Stack Tecnologico

| Tecnologia | Versione | Descrizione |
|------------|----------|-------------|
| React | 18.3+ | Libreria UI |
| TypeScript | 5.6+ | Typing |
| Vite | 5.4+ | Build tool |
| Tailwind CSS | 3.4+ | Styling |
| Framer Motion | 11.0+ | Animazioni |
| Lucide React | 0.460+ | Icone |

---

## 📁 Struttura Progetto

```
eterea-studio/
├── public/                 # Asset statici
│   ├── favicon/           # Icone multi formato
│   ├── images/            # Immagini (portfolio, og)
│   ├── 404.html           # Pagina errore
│   ├── 500.html           # Pagina errore server
│   ├── robots.txt         # Istruzioni crawler
│   └── sitemap.xml        # Mappa sito
├── src/
│   ├── components/
│   │   ├── layout/        # Header, Footer
│   │   ├── pages/         # Pagine legali, 404
│   │   ├── sections/      # Sezioni landing
│   │   └── ui/            # Componenti UI
│   ├── App.tsx            # Entry point
│   └── main.tsx           # Bootstrap
├── dist/                  # Build production
└── index.html             # Template HTML
```

---

## 🛠️ Installazione Locale

```bash
# Clona repository
git clone https://github.com/CloreM-Fine/Landing-Eterea.git
cd Landing-Eterea

# Installa dipendenze
npm install

# Avvia server sviluppo
npm run dev

# Build produzione
npm run build
```

---

## 📦 Deploy

### SiteGround (FTP)
1. Esegui `npm run build`
2. Carica contenuto cartella `dist/` via FTP
3. Assicurati che `.htaccess` sia presente nella root

### GitHub Actions (Auto-deploy)
Configurato workflow per deploy automatico su SiteGround.

---

## 🎨 Sezioni Landing

| Sezione | Descrizione |
|---------|-------------|
| **Hero** | Logo animato, CTA principali |
| **Servizi** | Brand, Web, App, Foto, Video, Marketing |
| **Portfolio** | Griglia progetti con modal |
| **Chi Siamo** | Storia, valori, team |
| **FAQ** | Domande frequenti |
| **Contatti** | Form, info, social |

---

## 🔧 Configurazione

### SEO
Modifica meta tags in `index.html`:
- Title
- Description
- OG Image (1200×630)

### Colori
Palette in `tailwind.config.js`:
```js
colors: {
  'eterea-blue': '#A8D0E6',
  'eterea-sage': '#B5C7A6',
  'eterea-lilac': '#C5B9CD',
  'eterea-peach': '#F4C2A1',
  'eterea-lemon': '#E8E4A0',
  'eterea-cream': '#FAF8F3',
  'eterea-dark': '#2D3142',
}
```

---

## 📱 Social

- 📷 [Instagram](https://www.instagram.com/eterea.studio.lucca/)
- 💼 [LinkedIn](https://www.linkedin.com/in/lorenzo-puccetti-66931b21a/)
- 🌐 [Website](https://etereastudio.it)

---

## 📄 License

© 2025 Eterea Studio di Puccetti Lorenzo - Tutti i diritti riservati

---

## 👥 Team

3 Founder | Design & Sviluppo Digitale | 📍 Lucca, Italia
