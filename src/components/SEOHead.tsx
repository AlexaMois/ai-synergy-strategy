import { Helmet } from 'react-helmet';
import { useLocation } from 'react-router-dom';
import { seoConfig } from '@/config/seoConfig';

export const SEOHead = () => {
  const location = useLocation();
  const path = location.pathname;
  const config = seoConfig[path] || seoConfig['/'];

  return (
    <Helmet>
      <title>{config.title}</title>
      <meta name="description" content={config.description} />
      <link rel="canonical" href={config.canonical} />
      <meta property="og:title" content={config.ogTitle} />
      <meta property="og:description" content={config.ogDescription} />
      <meta property="og:url" content={config.canonical} />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={config.ogTitle} />
      <meta name="twitter:description" content={config.ogDescription} />
    </Helmet>
  );
};
