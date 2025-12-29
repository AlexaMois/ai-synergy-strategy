import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

const Redirect = () => {
  const [searchParams] = useSearchParams();
  const target = searchParams.get('to');

  useEffect(() => {
    if (target) {
      // Use meta refresh with no-referrer to clear the referrer header
      const meta = document.createElement('meta');
      meta.httpEquiv = 'refresh';
      meta.content = `0;url=${target}`;
      document.head.appendChild(meta);
      
      // Also set referrer policy
      const referrerMeta = document.createElement('meta');
      referrerMeta.name = 'referrer';
      referrerMeta.content = 'no-referrer';
      document.head.appendChild(referrerMeta);
      
      // Fallback: direct navigation after short delay
      setTimeout(() => {
        window.location.replace(target);
      }, 100);
    }
  }, [target]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <p className="text-foreground/70">Переход...</p>
    </div>
  );
};

export default Redirect;
