<?php
/**
 * Eterea Studio - Contact Form Handler
 * Invia email a info@etereastudio.it e conferma al cliente
 */

// Imposta fuso orario italiano (Roma)
date_default_timezone_set('Europe/Rome');

// Configurazione
$toAdmin = 'info@etereastudio.it';
$thankYouPage = '/thank-you';
$errorPage = '/error';

// Ricevi e pulisci i dati
$name = isset($_POST['name']) ? trim(strip_tags($_POST['name'])) : '';
$email = isset($_POST['email']) ? trim(strip_tags($_POST['email'])) : '';
$company = isset($_POST['company']) ? trim(strip_tags($_POST['company'])) : '';
$service = isset($_POST['service']) ? trim(strip_tags($_POST['service'])) : '';
$message = isset($_POST['message']) ? trim(strip_tags($_POST['message'])) : '';

// Validazione
$errors = [];

if (empty($name)) {
    $errors[] = 'Il nome è obbligatorio';
}

if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $errors[] = 'Email non valida';
}

if (empty($message)) {
    $errors[] = 'Il messaggio è obbligatorio';
}

// Check honeypot (campo nascosto per bot)
if (!empty($_POST['website'])) {
    header("Location: $thankYouPage");
    exit;
}

// Se ci sono errori, reindirizza alla pagina di errore
if (!empty($errors)) {
    header("Location: $errorPage?error=" . urlencode(implode(', ', $errors)));
    exit;
}

// Data e ora
$date = date('d/m/Y H:i:s');
$companyDisplay = empty($company) ? 'Non specificata' : $company;
$serviceDisplay = empty($service) ? 'Non specificato' : $service;
$messageHtml = nl2br(htmlspecialchars($message));
$messagePlain = $message;

// ============================================
// EMAIL AD ADMIN (info@etereastudio.it)
// ============================================
$subjectAdmin = 'Nuova richiesta di contatto da ' . $name;

// Header per admin
$boundaryAdmin = md5(time() . 'admin');
$headersAdmin = "From: Eterea Studio <noreply@etereastudio.it>\r\n";
$headersAdmin .= "Reply-To: " . $email . "\r\n";
$headersAdmin .= "MIME-Version: 1.0\r\n";
$headersAdmin .= "Content-Type: multipart/alternative; boundary=\"$boundaryAdmin\"\r\n";

// Plain text per admin
$bodyAdminPlain = "Nuova richiesta di contatto da Eterea Studio\n\n";
$bodyAdminPlain .= "Data: $date\n";
$bodyAdminPlain .= "Nome: $name\n";
$bodyAdminPlain .= "Email: $email\n";
$bodyAdminPlain .= "Azienda: $companyDisplay\n";
$bodyAdminPlain .= "Servizio: $serviceDisplay\n\n";
$bodyAdminPlain .= "Messaggio:\n$messagePlain\n\n";
$bodyAdminPlain .= "---\nInviato da etereastudio.it";

// HTML per admin - Stile Eterea
$bodyAdminHtml = '<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Nuova Richiesta di Contatto</title>
</head>
<body style="margin: 0; padding: 0; font-family: \'Inter\', -apple-system, BlinkMacSystemFont, sans-serif; background-color: #F5F1E8;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #F5F1E8; padding: 40px 20px;">
        <tr>
            <td align="center">
                <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 24px; overflow: hidden; box-shadow: 0 4px 20px rgba(45,49,66,0.08);">
                    <!-- Header -->
                    <tr>
                        <td style="background: linear-gradient(135deg, #2D3142 0%, #4A4D5E 100%); padding: 40px 30px; text-align: center;">
                            <h1 style="color: #F5F1E8; margin: 0; font-size: 24px; font-weight: 600; font-family: \'Playfair Display\', Georgia, serif;">Nuova Richiesta di Contatto</h1>
                            <p style="color: #A8D0E6; margin: 10px 0 0 0; font-size: 14px;">Ricevuta il ' . $date . '</p>
                        </td>
                    </tr>
                    
                    <!-- Content -->
                    <tr>
                        <td style="padding: 40px 30px;">
                            <table width="100%" cellpadding="0" cellspacing="0">
                                <tr>
                                    <td style="padding-bottom: 20px;">
                                        <p style="margin: 0 0 8px 0; color: #6B7280; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Nome</p>
                                        <p style="margin: 0; color: #2D3142; font-size: 18px; font-weight: 600;">' . htmlspecialchars($name) . '</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding-bottom: 20px;">
                                        <p style="margin: 0 0 8px 0; color: #6B7280; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Email</p>
                                        <p style="margin: 0;"><a href="mailto:' . $email . '" style="color: #A8D0E6; font-size: 16px; text-decoration: none; font-weight: 500;">' . $email . '</a></p>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding-bottom: 20px;">
                                        <p style="margin: 0 0 8px 0; color: #6B7280; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Azienda</p>
                                        <p style="margin: 0; color: #2D3142; font-size: 16px;">' . htmlspecialchars($companyDisplay) . '</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding-bottom: 20px;">
                                        <p style="margin: 0 0 8px 0; color: #6B7280; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Servizio Richiesto</p>
                                        <p style="margin: 0; color: #2D3142; font-size: 16px;">' . htmlspecialchars($serviceDisplay) . '</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="background-color: #F5F1E8; border-radius: 16px; padding: 20px;">
                                        <p style="margin: 0 0 12px 0; color: #6B7280; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Messaggio</p>
                                        <p style="margin: 0; color: #2D3142; font-size: 15px; line-height: 1.6;">' . $messageHtml . '</p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    
                    <!-- Footer -->
                    <tr>
                        <td style="background-color: #2D3142; padding: 30px; text-align: center;">
                            <p style="margin: 0 0 15px 0; color: #F5F1E8; font-size: 14px;">Eterea Studio | Design & Sviluppo Digitale</p>
                            <p style="margin: 0; color: #A8D0E6; font-size: 12px;"><a href="https://etereastudio.it" style="color: #A8D0E6; text-decoration: none;">etereastudio.it</a></p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>';

// Corpo multipart admin
$bodyAdmin = "--$boundaryAdmin\r\n";
$bodyAdmin .= "Content-Type: text/plain; charset=UTF-8\r\n";
$bodyAdmin .= "Content-Transfer-Encoding: 7bit\r\n\r\n";
$bodyAdmin .= $bodyAdminPlain . "\r\n\r\n";
$bodyAdmin .= "--$boundaryAdmin\r\n";
$bodyAdmin .= "Content-Type: text/html; charset=UTF-8\r\n";
$bodyAdmin .= "Content-Transfer-Encoding: 7bit\r\n\r\n";
$bodyAdmin .= $bodyAdminHtml . "\r\n\r\n";
$bodyAdmin .= "--$boundaryAdmin--";

// ============================================
// EMAIL AL CLIENTE (conferma)
// ============================================
$subjectClient = 'Abbiamo ricevuto il tuo messaggio! 🎨';

// Header per cliente
$boundaryClient = md5(time() . 'client');
$headersClient = "From: Eterea Studio <info@etereastudio.it>\r\n";
$headersClient .= "Reply-To: info@etereastudio.it\r\n";
$headersClient .= "MIME-Version: 1.0\r\n";
$headersClient .= "Content-Type: multipart/alternative; boundary=\"$boundaryClient\"\r\n";

// Plain text per cliente
$bodyClientPlain = "Ciao $name!\n\n";
$bodyClientPlain .= "Grazie per averci contattato. Abbiamo ricevuto il tuo messaggio e ti risponderemo entro 24 ore lavorative.\n\n";
$bodyClientPlain .= "Ecco un riepilogo di quanto ci hai inviato:\n";
$bodyClientPlain .= "Servizio richiesto: $serviceDisplay\n";
$bodyClientPlain .= "Messaggio: $messagePlain\n\n";
$bodyClientPlain .= "Nel frattempo, seguici su Instagram per vedere i nostri ultimi lavori:\n";
$bodyClientPlain .= "https://www.instagram.com/eterea.studio.lucca/\n\n";
$bodyClientPlain .= "Oppure scopri le nostre app gratuite:\n";
$bodyClientPlain .= "https://app.etereastudio.it\n\n";
$bodyClientPlain .= "A presto!\nIl team di Eterea Studio\n\n";
$bodyClientPlain .= "---\nEterea Studio | Design & Sviluppo Digitale\ninfo@etereastudio.it | https://etereastudio.it";

// HTML per cliente - Stile Eterea con social e apps
$bodyClientHtml = '<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Abbiamo ricevuto il tuo messaggio!</title>
</head>
<body style="margin: 0; padding: 0; font-family: \'Inter\', -apple-system, BlinkMacSystemFont, sans-serif; background-color: #F5F1E8;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #F5F1E8; padding: 40px 20px;">
        <tr>
            <td align="center">
                <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 24px; overflow: hidden; box-shadow: 0 4px 20px rgba(45,49,66,0.08);">
                    <!-- Header -->
                    <tr>
                        <td style="background: linear-gradient(135deg, #A8D0E6 0%, #C5B9CD 100%); padding: 50px 30px; text-align: center;">
                            <div style="width: 80px; height: 80px; background: rgba(255,255,255,0.3); border-radius: 50%; margin: 0 auto 20px; display: flex; align-items: center; justify-content: center; font-size: 40px;">✨</div>
                            <h1 style="color: #2D3142; margin: 0; font-size: 26px; font-weight: 600; font-family: \'Playfair Display\', Georgia, serif;">Grazie ' . htmlspecialchars($name) . '!</h1>
                            <p style="color: #2D3142; margin: 15px 0 0 0; font-size: 16px; opacity: 0.9;">Abbiamo ricevuto il tuo messaggio</p>
                        </td>
                    </tr>
                    
                    <!-- Content -->
                    <tr>
                        <td style="padding: 40px 30px;">
                            <p style="margin: 0 0 25px 0; color: #2D3142; font-size: 16px; line-height: 1.6;">
                                Ti risponderemo entro <strong>24 ore lavorative</strong> con una proposta personalizzata per il tuo progetto.
                            </p>
                            
                            <!-- Riepilogo -->
                            <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #F5F1E8; border-radius: 16px; margin-bottom: 30px;">
                                <tr>
                                    <td style="padding: 25px;">
                                        <p style="margin: 0 0 15px 0; color: #6B7280; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; font-weight: 600;">Riepilogo richiesta</p>
                                        <p style="margin: 0 0 8px 0; color: #2D3142; font-size: 14px;"><strong>Servizio:</strong> ' . htmlspecialchars($serviceDisplay) . '</p>
                                        <p style="margin: 0; color: #2D3142; font-size: 14px;"><strong>Messaggio:</strong> ' . substr(strip_tags($messagePlain), 0, 100) . (strlen($messagePlain) > 100 ? '...' : '') . '</p>
                                    </td>
                                </tr>
                            </table>
                            
                            <!-- Instagram Section -->
                            <table width="100%" cellpadding="0" cellspacing="0" style="background: linear-gradient(135deg, #E8B4B8 0%, #F4C2A1 100%); border-radius: 16px; margin-bottom: 20px;">
                                <tr>
                                    <td style="padding: 25px; text-align: center;">
                                        <p style="margin: 0 0 10px 0; font-size: 30px;">📸</p>
                                        <p style="margin: 0 0 15px 0; color: #2D3142; font-size: 18px; font-weight: 600;">Seguici su Instagram</p>
                                        <p style="margin: 0 0 20px 0; color: #2D3142; font-size: 14px; opacity: 0.9;">Scopri i nostri ultimi lavori e progetti creativi</p>
                                        <a href="https://www.instagram.com/eterea.studio.lucca/" style="display: inline-block; background-color: #2D3142; color: #F5F1E8; padding: 12px 30px; border-radius: 30px; text-decoration: none; font-weight: 600; font-size: 14px;">@eterea.studio.lucca</a>
                                    </td>
                                </tr>
                            </table>
                            
                            <!-- Apps Section -->
                            <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #B5C7A6; border-radius: 16px;">
                                <tr>
                                    <td style="padding: 25px; text-align: center;">
                                        <p style="margin: 0 0 10px 0; font-size: 30px;">🛠️</p>
                                        <p style="margin: 0 0 15px 0; color: #2D3142; font-size: 18px; font-weight: 600;">Prova le nostre App Gratuite</p>
                                        <p style="margin: 0 0 20px 0; color: #2D3142; font-size: 14px; opacity: 0.9;">QR Code Generator, WebP Converter e altri strumenti utili</p>
                                        <a href="https://app.etereastudio.it" style="display: inline-block; background-color: #2D3142; color: #F5F1E8; padding: 12px 30px; border-radius: 30px; text-decoration: none; font-weight: 600; font-size: 14px;">Scopri le App</a>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    
                    <!-- Footer -->
                    <tr>
                        <td style="background-color: #2D3142; padding: 30px; text-align: center;">
                            <p style="margin: 0 0 10px 0; color: #F5F1E8; font-size: 16px; font-family: \'Playfair Display\', Georgia, serif;">Eterea Studio</p>
                            <p style="margin: 0 0 20px 0; color: #A8D0E6; font-size: 13px;">Design & Sviluppo Digitale</p>
                            
                            <!-- Social Icons -->
                            <table cellpadding="0" cellspacing="0" style="margin: 0 auto;">
                                <tr>
                                    <td style="padding: 0 10px;">
                                        <a href="https://www.instagram.com/eterea.studio.lucca/" style="display: block; width: 40px; height: 40px; background-color: rgba(255,255,255,0.1); border-radius: 50%; text-align: center; line-height: 40px; text-decoration: none; color: #F5F1E8; font-size: 18px;">📷</a>
                                    </td>
                                    <td style="padding: 0 10px;">
                                        <a href="https://www.linkedin.com/in/lorenzo-puccetti-66931b21a/" style="display: block; width: 40px; height: 40px; background-color: rgba(255,255,255,0.1); border-radius: 50%; text-align: center; line-height: 40px; text-decoration: none; color: #F5F1E8; font-size: 18px;">💼</a>
                                    </td>
                                    <td style="padding: 0 10px;">
                                        <a href="https://app.etereastudio.it" style="display: block; width: 40px; height: 40px; background-color: rgba(255,255,255,0.1); border-radius: 50%; text-align: center; line-height: 40px; text-decoration: none; color: #F5F1E8; font-size: 18px;">🚀</a>
                                    </td>
                                </tr>
                            </table>
                            
                            <p style="margin: 20px 0 0 0; color: #6B7280; font-size: 12px;">
                                <a href="mailto:info@etereastudio.it" style="color: #A8D0E6; text-decoration: none;">info@etereastudio.it</a> | 
                                <a href="https://etereastudio.it" style="color: #A8D0E6; text-decoration: none;">etereastudio.it</a>
                            </p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>';

// Corpo multipart cliente
$bodyClient = "--$boundaryClient\r\n";
$bodyClient .= "Content-Type: text/plain; charset=UTF-8\r\n";
$bodyClient .= "Content-Transfer-Encoding: 7bit\r\n\r\n";
$bodyClient .= $bodyClientPlain . "\r\n\r\n";
$bodyClient .= "--$boundaryClient\r\n";
$bodyClient .= "Content-Type: text/html; charset=UTF-8\r\n";
$bodyClient .= "Content-Transfer-Encoding: 7bit\r\n\r\n";
$bodyClient .= $bodyClientHtml . "\r\n\r\n";
$bodyClient .= "--$boundaryClient--";

// ============================================
// INVIO EMAIL
// ============================================
$mailAdmin = mail($toAdmin, $subjectAdmin, $bodyAdmin, $headersAdmin);
$mailClient = mail($email, $subjectClient, $bodyClient, $headersClient);

// Reindirizza in base all'esito
if ($mailAdmin && $mailClient) {
    header("Location: $thankYouPage");
} else {
    header("Location: $errorPage?error=invio_fallito");
}
exit;
