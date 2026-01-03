import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';

// Whitelist of allowed redirect domains
const ALLOWED_DOMAINS = [
  'aleksamois.ru',
  'telegram.me',
  't.me',
  'chat.openai.com',
  'chatgpt.com',
  'yandex.ru',
  'youtube.com',
  'youtu.be',
  'vk.com',
  'vc.ru',
  'habr.com',
];

const isValidRedirectUrl = (url: string): boolean => {
  try {
    const parsed = new URL(url);
    // Only allow https
    if (parsed.protocol !== 'https:') {
      return false;
    }
    // Check if hostname matches allowed domains
    return ALLOWED_DOMAINS.some(domain => 
      parsed.hostname === domain || 
      parsed.hostname.endsWith('.' + domain)
    );
  } catch {
    return false;
  }
};

const Redirect = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const target = searchParams.get('to');
  const [isValid, setIsValid] = useState<boolean | null>(null);

  useEffect(() => {
    if (!target) {
      navigate('/', { replace: true });
      return;
    }

    const valid = isValidRedirectUrl(target);
    setIsValid(valid);

    if (!valid) {
      console.warn('Blocked redirect to untrusted domain:', target);
      // Redirect to home after showing error
      setTimeout(() => {
        navigate('/', { replace: true });
      }, 3000);
      return;
    }

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

    return () => {
      // Cleanup meta tags if component unmounts
      if (meta.parentNode) meta.parentNode.removeChild(meta);
      if (referrerMeta.parentNode) referrerMeta.parentNode.removeChild(referrerMeta);
    };
  }, [target, navigate]);

  if (isValid === false) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center p-8">
          <p className="text-destructive font-medium mb-2">Недопустимый адрес перенаправления</p>
          <p className="text-foreground/70 text-sm">Перенаправление на главную страницу...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <p className="text-foreground/70">Переход...</p>
    </div>
  );
};

export default Redirect;
