import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  // Schema.org BreadcrumbList JSON-LD
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://etereastudio.it',
      },
      ...items.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 2,
        name: item.label,
        item: item.href ? `https://etereastudio.it${item.href}` : undefined,
      })),
    ],
  };

  return (
    <>
      {/* Schema.org JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      
      {/* Visual Breadcrumb */}
      <nav aria-label="Breadcrumb" className="py-4 px-4 sm:px-6 lg:px-12 xl:px-20 bg-eterea-cream/50">
        <ol className="flex items-center flex-wrap gap-2 text-sm">
          <li>
            <a 
              href="#home" 
              className="flex items-center gap-1 text-eterea-gray hover:text-eterea-dark transition-colors"
            >
              <Home className="w-4 h-4" />
              <span className="sr-only">Home</span>
            </a>
          </li>
          
          {items.map((item, index) => (
            <li key={index} className="flex items-center gap-2">
              <ChevronRight className="w-4 h-4 text-eterea-gray" />
              {item.href ? (
                <a 
                  href={item.href}
                  className="text-eterea-gray hover:text-eterea-dark transition-colors"
                >
                  {item.label}
                </a>
              ) : (
                <span className="text-eterea-dark font-medium" aria-current="page">
                  {item.label}
                </span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
