# 🚀 Guida al Deploy su SiteGround

## Preparazione

1. **Build del progetto**
   ```bash
   npm run build
   ```

2. **Verifica la cartella `dist/`**
   - Assicurati che contenga `index.html` e la cartella `assets/`

## Deploy via FTP

### Metodo 1: FTP Client (FileZilla, Cyberduck)

1. **Scarica e installa FileZilla** (o qualsiasi client FTP)

2. **Credenziali FTP SiteGround** (trovi nel tuo pannello SiteGround):
   - **Host**: ftp.tuodominio.com (o IP del server)
   - **Username**: il tuo username FTP
   - **Password**: la tua password FTP
   - **Porta**: 21 (o 22 per SFTP)

3. **Connessione**:
   - Inserisci le credenziali in FileZilla
   - Clicca "Connessione rapida"

4. **Upload dei file**:
   - Nella colonna di sinistra (locale), naviga in `eterea-studio/dist/`
   - Nella colonna di destra (remoto), naviga in `/public_html/`
   - Seleziona tutti i file nella cartella `dist/` e trascinali in `/public_html/`
   - Sovrascrivi i file esistenti se richiesto

### Metodo 2: File Manager SiteGround

1. **Accedi al tuo pannello SiteGround**

2. **Vai su**: Sito Web > File Manager

3. **Naviga in**: `/public_html/`

4. **Carica i file**:
   - Clicca su "Carica file" o "Upload"
   - Seleziona tutti i file dalla cartella `dist/` del tuo computer
   - Attendi il caricamento

## Deploy via Git (se SiteGround lo supporta)

```bash
# Aggiungi il remote di SiteGround
git remote add siteground ssh://username@ftp.tuodominio.com:22/~/public_html

# Push della cartella dist
git push siteground main
```

## Verifica post-deploy

1. **Visita il tuo dominio** (es. https://tuodominio.com)
2. **Verifica che**:
   - ✅ Il sito si carichi correttamente
   - ✅ Tutte le immagini siano visibili
   - ✅ I link di navigazione funzionino
   - ✅ Il form contatti invii correttamente (configura backend)

## Risoluzione problemi

### 404 su refresh pagina
Se ottieni 404 quando ricarichi una pagina (es. /chi-siamo):

1. Crea un file `.htaccess` nella cartella `public_html/`:
```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

### Immagini non caricate
- Verifica che i path siano corretti (relativi `./`)
- Controlla che le immagini siano nella cartella `dist/assets/`

## Configurazione Form Contatti

Il form contatti è attualmente simulato. Per renderlo funzionante:

### Opzione 1: Formspree (Consigliata - Gratuita)
1. Registrati su https://formspree.io
2. Crea un nuovo form
3. Sostituisci nel file `Contact.tsx`:
```tsx
<form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
```

### Opzione 2: Netlify Forms
1. Aggiungi `netlify` attribute al form:
```tsx
<form name="contact" netlify>
```

### Opzione 3: Backend PHP su SiteGround
Crea un file `send-email.php`:
```php
<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = htmlspecialchars($_POST['name']);
    $email = htmlspecialchars($_POST['email']);
    $message = htmlspecialchars($_POST['message']);
    
    $to = "ciao@eterea.studio";
    $subject = "Nuovo messaggio da $name";
    $headers = "From: $email";
    
    mail($to, $subject, $message, $headers);
    echo "Messaggio inviato!";
}
?>
```

## Configurazione Dominio

### DNS (se gestito esternamente)
- **A Record**: `@` → IP del server SiteGround
- **CNAME**: `www` → `tuodominio.com`

### SSL/HTTPS
1. Nel pannello SiteGround: Sicurezza > SSL
2. Attiva Let's Encrypt (gratuito)
3. Forza HTTPS nelle impostazioni

## Ottimizzazioni

### Compressione Gzip (già attiva su SiteGround)
Verifica in `.htaccess`:
```apache
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/css text/javascript application/javascript
</IfModule>
```

### Cache
- Attiva la cache da SiteGround > Velocità > Caching

## Contatti Supporto

- **SiteGround Support**: https://www.siteground.com/support.htm
- **Knowledge Base**: https://www.siteground.com/kb/

---

🎨 **Eterea Studio** - Fatto con passione in Italia
