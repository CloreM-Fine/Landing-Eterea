# 📊 SEO & Marketing Configuration Guide

## 1. 🔍 Google Tag Manager (GTM)

### Configurazione
1. Vai su [Google Tag Manager](https://tagmanager.google.com/)
2. Crea un nuovo account: **Eterea Studio**
3. Crea un container: **Sito Web**
4. Ottieni il tuo ID: `GTM-XXXXXXX`

### Inserimento ID
Nel file `index.html`, sostituisci:
```javascript
GTM-XXXXXXX  // ← Sostituire con il tuo ID reale
```

In 2 posti:
- Nello script nell'`<head>`
- Nel `<noscript>` nel `<body>`

---

## 2. 📈 Google Analytics 4 (GA4)

### Configurazione
1. Vai su [Google Analytics](https://analytics.google.com/)
2. Crea una proprietà: **Eterea Studio**
3. Ottieni il tuo Measurement ID: `G-XXXXXXXXXX`

### Inserimento ID
Nel file `index.html`, sostituisci:
```javascript
gtag('config', 'G-XXXXXXXXXX');  // ← Sostituire con il tuo ID reale
```

### Eventi tracciati automaticamente
- Page views
- Form submissions
- Scroll depth
- Outbound clicks

---

## 3. 📧 Email Automatiche (Netlify Forms)

### Configurazione Form
Il form è già configurato per Netlify con questi attributi:
```html
<form 
  name="contatto"
  method="POST"
  data-netlify="true"
  data-netlify-honeypot="bot-field"
  action="/thank-you"
>
```

### Configurazione Email Notification
1. Fai deploy su Netlify
2. Vai su **Site settings** → **Forms** → **Notifications**
3. Aggiungi le email di notifica:
   - **Email per te**: `info@etereastudio.it`
   - **Email per il cliente**: abilita "Outgoing notifications"

### Email al Cliente (Auto-reply)
Nel pannello Netlify Forms, configura l'auto-reply con questo template:

```
Oggetto: ✅ Abbiamo ricevuto il tuo messaggio - Eterea Studio

Ciao {{name}},

Grazie per averci contattato! Abbiamo ricevuto il tuo messaggio e ti risponderemo entro 24 ore lavorative.

Ecco un riepilogo di ciò che ci hai inviato:
• Nome: {{name}}
• Email: {{email}}
• Servizio richiesto: {{service}}
• Budget: {{budget}}

Nel frattempo, dai un'occhiata ai nostri lavori su https://etereastudio.it/#lavori

A presto!
Il team di Eterea Studio

---
Eterea Studio di Puccetti Lorenzo
P.IVA: 02758150466
info@etereastudio.it
https://etereastudio.it
```

---

## 4. 🎨 Favicon

### File da inserire in `/public/favicon/`

| File | Dimensione | Descrizione |
|------|------------|-------------|
| `favicon.svg` | vettoriale | Favicon principale (moderno) |
| `favicon-32x32.png` | 32x32 | Browser standard |
| `favicon-16x16.png` | 16x16 | Browser piccolo |
| `favicon.ico` | multi | Legacy browsers |
| `apple-touch-icon.png` | 180x180 | iPhone/iPad |
| `apple-touch-icon-152x152.png` | 152x152 | iPad |
| `apple-touch-icon-120x120.png` | 120x120 | iPhone |
| `apple-touch-icon-76x76.png` | 76x76 | iPad mini |
| `safari-pinned-tab.svg` | vettoriale | Safari pinned tabs |
| `android-chrome-192x192.png` | 192x192 | Android homescreen |
| `android-chrome-512x512.png` | 512x512 | Android splash |

### Generatore consigliato
[RealFaviconGenerator](https://realfavicongenerator.net/)

---

## 5. 🖼️ Open Graph Image

### File da inserire
`/public/images/og/og-image.jpg`

**Specifiche:**
- Dimensione: **1200x630px**
- Formato: JPG o PNG
- Peso: < 1MB
- Contenuto: Logo Eterea + tagline + background

### Template suggerito
```
┌────────────────────────────────────────────┐
│                                            │
│     [LOGO ETEREA COLORATO]                 │
│                                            │
│     Eterea Studio                          │
│     Dove l'essenziale prende forma         │
│                                            │
│     Studio creativo italiano               │
│                                            │
└────────────────────────────────────────────┘
```

---

## 6. 🚀 Meta Tags SEO

I seguenti meta tag sono già configurati in `index.html`:

### Base
- `description`
- `keywords`
- `author`
- `robots`
- `canonical`

### Social
- `og:title`
- `og:description`
- `og:image`
- `og:url`
- `twitter:card`
- `twitter:image`

### Structured Data (JSON-LD)
- Organization
- WebSite
- LocalBusiness

---

## 7. ✅ Checklist Pre-Launch

### Google
- [ ] GTM ID inserito
- [ ] GA4 ID inserito
- [ ] Test in modalità Preview

### Favicon
- [ ] Tutti i file favicon generati
- [ ] SVG principale creato
- [ ] Apple touch icons presenti

### Immagini
- [ ] `og-image.jpg` 1200x630px
- [ ] Logo PNG per schema.org

### Netlify
- [ ] Form submissions testato
- [ ] Email notifications configurate
- [ ] Auto-reply al cliente attivo

### SEO
- [ ] Sitemap.xml generato
- [ ] Robots.txt configurato
- [ ] Test su [Google Rich Results](https://search.google.com/test/rich-results)

---

## 8. 🔗 Link Utili

- [Google Search Console](https://search.google.com/search-console)
- [Google Tag Assistant](https://tagassistant.google.com/)
- [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
- [Twitter Card Validator](https://cards-dev.twitter.com/validator)
- [Schema.org Validator](https://validator.schema.org/)

---

## 📞 Supporto

Per problemi o domande:
- Email: info@etereastudio.it
- Area riservata: https://gestionale.etereastudio.it
