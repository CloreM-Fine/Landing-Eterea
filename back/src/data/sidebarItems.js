import { 
  Users,
  Link, 
  Image, 
  Music, 
  Film,
  MapPin,
  Phone,
  Mail,
} from 'lucide-react';

export const favorites = [
  { id: 'chisiamo', name: 'Chi siamo', icon: Users, href: '#chi-siamo' },
  { id: 'apps', name: 'Progetto Alpha', icon: Link, href: 'https://example.com/alpha' },
  { id: 'desktop', name: 'Brand XYZ', icon: Link, href: 'https://example.com/xyz' },
  { id: 'documents', name: 'Campagna Social', icon: Link, href: 'https://example.com/social' },
  { id: 'downloads', name: 'E-commerce Lux', icon: Link, href: 'https://example.com/lux' },
  { id: 'user', name: 'Restyling Beta', icon: Link, href: 'https://example.com/beta' },
  { id: 'images', name: 'Immagini', icon: Image, href: '#' },
  { id: 'music', name: 'Musica', icon: Music, href: '#' },
  { id: 'movies', name: 'Filmati', icon: Film, href: '#' },
];

// POSIZIONI contiene i contatti
export const posizioni = [
  { id: 'address', name: 'Via Roma 123, 55100 Lucca', icon: MapPin },
  { id: 'phone1', name: '+39 333 1234567', icon: Phone },
  { id: 'phone2', name: '+39 333 7654321', icon: Phone },
  { id: 'phone3', name: '+39 333 1122334', icon: Phone },
  { id: 'email', name: 'info@etereastudio.com', icon: Mail },
  { id: 'contacts', name: 'Contatti', icon: Users },
];
