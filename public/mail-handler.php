<?php
/**
 * Eterea Studio - Contact Form Handler
 * Riceve i dati dal form e invia email a info@etereastudio.it
 */

// Configurazione
$to = 'info@etereastudio.it';
$subject = 'Nuova richiesta di contatto da Eterea Studio';
$thankYouPage = '/thank-you';
$errorPage = '/error';

// Validazione CSRF - controlla header referer
$allowedHosts = ['etereastudio.it', 'www.etereastudio.it', 'localhost'];
$referer = $_SERVER['HTTP_REFERER'] ?? '';
$validReferer = false;

foreach ($allowedHosts as $host) {
    if (strpos($referer, $host) !== false) {
        $validReferer = true;
        break;
    }
}

// Per localhost in sviluppo, permetti anche senza referer
if (empty($referer) && ($_SERVER['HTTP_HOST'] ?? '') === 'localhost') {
    $validReferer = true;
}

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
    // Bot rilevato, simula successo ma non inviare
    header("Location: $thankYouPage");
    exit;
}

// Se ci sono errori, reindirizza alla pagina di errore
if (!empty($errors)) {
    header("Location: $errorPage?error=" . urlencode(implode(', ', $errors)));
    exit;
}

// Prepara l'email
$headers = "From: $name <$email>" . "\r\n";
$headers .= "Reply-To: $email" . "\r\n";
$headers .= "Content-Type: text/html; charset=UTF-8" . "\r\n";
$headers .= "X-Mailer: PHP/" . phpversion();

// Data e ora
$date = date('d/m/Y H:i:s');

// Corpo dell'email in HTML
$emailBody = <<<HTML
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #2D3142; color: white; padding: 20px; text-align: center; }
        .content { background: #f9f9f9; padding: 20px; border-radius: 5px; }
        .field { margin-bottom: 15px; }
        .label { font-weight: bold; color: #2D3142; }
        .value { margin-top: 5px; }
        .footer { text-align: center; margin-top: 20px; font-size: 12px; color: #666; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h2>📧 Nuova Richiesta di Contatto</h2>
        </div>
        <div class="content">
            <div class="field">
                <div class="label">Data:</div>
                <div class="value">$date</div>
            </div>
            <div class="field">
                <div class="label">Nome:</div>
                <div class="value">$name</div>
            </div>
            <div class="field">
                <div class="label">Email:</div>
                <div class="value"><a href="mailto:$email">$email</a></div>
            </div>
            <div class="field">
                <div class="label">Azienda:</div>
                <div class="value">" . ($company ?: "Non specificata") . "</div>
            </div>
            <div class="field">
                <div class="label">Servizio di interesse:</div>
                <div class="value">" . ($service ?: "Non specificato") . "</div>
            </div>
            <div class="field">
                <div class="label">Messaggio:</div>
                <div class="value">" . nl2br(htmlspecialchars($message)) . "</div>
            </div>
        </div>
        <div class="footer">
            <p>Questa email è stata inviata dal form di contatto di Eterea Studio</p>
            <p><a href="https://etereastudio.it">etereastudio.it</a></p>
        </div>
    </div>
</body>
</html>
HTML;

// Versione plain text per compatibilità
$emailBodyPlain = "Nuova richiesta di contatto da Eterea Studio\n\n";
$emailBodyPlain .= "Data: $date\n";
$emailBodyPlain .= "Nome: $name\n";
$emailBodyPlain .= "Email: $email\n";
$emailBodyPlain .= "Azienda: " . ($company ?: "Non specificata") . "\n";
$emailBodyPlain .= "Servizio: " . ($service ?: "Non specificato") . "\n\n";
$emailBodyPlain .= "Messaggio:\n$message\n\n";
$emailBodyPlain .= "---\nInviato da etereastudio.it";

// Boundary per multipart email
$boundary = md5(time());
$headers = "From: Eterea Studio <noreply@etereastudio.it>\r\n";
$headers .= "Reply-To: $email\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: multipart/alternative; boundary=\"$boundary\"\r\n";

// Corpo multipart (plain text + HTML)
$body = "--$boundary\r\n";
$body .= "Content-Type: text/plain; charset=UTF-8\r\n";
$body .= "Content-Transfer-Encoding: 7bit\r\n\r\n";
$body .= $emailBodyPlain . "\r\n\r\n";
$body .= "--$boundary\r\n";
$body .= "Content-Type: text/html; charset=UTF-8\r\n";
$body .= "Content-Transfer-Encoding: 7bit\r\n\r\n";
$body .= $emailBody . "\r\n\r\n";
$body .= "--$boundary--";

// Invia l'email
$mailSent = mail($to, $subject, $body, $headers);

// Reindirizza in base all'esito
if ($mailSent) {
    header("Location: $thankYouPage");
} else {
    header("Location: $errorPage?error=invio_fallito");
}
exit;
