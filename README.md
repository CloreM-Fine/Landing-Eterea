# Eterea Studio - Homepage Finder macOS

Una homepage interattiva in stile Finder macOS per Eterea Studio, con tema personalizzabile, app Note funzionante e design pixel-perfect.

## 🎨 Preview

L'interfaccia replica fedelmente il look del Finder macOS con:
- Sidebar con Preferiti e Posizioni
- Griglia cartelle servizi
- App Note funzionante con salvataggio
- Color picker per personalizzare il tema
- Popup email stile Apple

## 🚀 Installazione

```bash
# Installa le dipendenze
npm install

# Avvia il server di sviluppo
npm run dev
```

L'applicazione sarà disponibile su `http://localhost:5173`

## 🛠 Stack Tecnico

- **React 18** - UI Library
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Framer Motion** - Animazioni
- **Lucide React** - Icone
- **date-fns** - Formattazione date (italiano)

## 📁 Struttura Progetto

```
src/
  components/
    TopBar.jsx          # Logo + color picker + email
    Sidebar.jsx         # Preferiti + Posizioni + Contatti
    FinderWindow.jsx    # Finestra Finder con cartelle
    NoteWindow.jsx      # App Note con data/ora
    ColorPicker.jsx     # Selettore colore tema
    EmailPopup.jsx      # Popup stile Apple
    CopyrightText.jsx   # Scritta verticale
  hooks/
    useTheme.js         # Gestione tema e colori
    useNote.js          # Gestione note e localStorage
  data/
    folders.js          # Array cartelle servizi
    sidebarItems.js     # Preferiti e posizioni
  App.jsx
  index.css
  main.jsx
```

## ✨ Funzionalità

### Tema Personalizzabile
- Clicca sul cerchio accanto al logo "ETEREA" per aprire il color picker
- Il colore di sfondo si adatta automaticamente
- UI si inverte automaticamente per mantenere contrasto ottimale

### App Note
- Data e ora in tempo reale (formattazione italiana)
- Salvataggio automatico in localStorage
- Pulsante "Salva" apre popup email

### Popup Email
- Stile modale Apple
- Validazione email
- Simulazione invio con toast di conferma

### Responsive
- Desktop: Layout completo con sidebar, finder e note affiancati
- Tablet: Layout adattivo
- Mobile: Stack verticale

## 📝 Note

- Il salvataggio delle note avviene automaticamente ogni secondo dopo l'ultima modifica
- Le cartelle sono statiche (visualizzazione demo)
- I link nella sidebar sono placeholder

## 📄 Licenza

© 2026 Eterea Studio - Tutti i diritti riservati
# Deploy test Sun Feb 22 02:02:44 CET 2026
