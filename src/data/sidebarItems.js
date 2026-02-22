import { 
  Users,
  Link, 
  Image, 
  Film,
  MapPin,
  Phone,
  Mail,
} from 'lucide-react';

export const favorites = [
  { id: 'chisiamo', name: 'Chi siamo', icon: Users, href: '#chi-siamo' },
  { id: 'colombini', name: 'colombinilelio.it', icon: Link, href: 'https://colombinilelio.it' },
  { id: 'danda', name: 'dandawinebar.it', icon: Link, href: 'https://dandawinebar.it' },
  { id: 'welln', name: 'welln.it', icon: Link, href: 'https://welln.it' },
  { id: 'gestionale1', name: 'Gestionale Progetti', icon: Link, href: '#' },
  { id: 'gestionale2', name: 'Gestionale CRM', icon: Link, href: '#' },
  { id: 'images', name: 'Immagini', icon: Image, href: '#', type: 'media' },
  { id: 'video', name: 'Video', icon: Film, href: '#', type: 'media' },
];

// POSIZIONI contiene i contatti
export const posizioni = [
  { id: 'lucca', name: 'Lucca, Toscana', icon: MapPin },
  { id: 'phone1', name: '+39 333 1234567', icon: Phone },
  { id: 'email', name: 'info@etereastudio.com', icon: Mail },
  { id: 'contacts', name: 'Contatti', icon: Users },
];
