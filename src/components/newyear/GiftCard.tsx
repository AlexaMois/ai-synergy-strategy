import React from 'react';

interface GiftCardProps {
  name: string;
  description: string;
  url: string;
}

const GiftCard: React.FC<GiftCardProps> = ({ name, description, url }) => {
  const redirectUrl = `/redirect?to=${encodeURIComponent(url)}`;

  return (
    <a
      href={redirectUrl}
      className="group block h-full"
    >
      <div className="bg-gradient-to-br from-primary/10 via-primary/15 to-primary/5 border border-primary/30 rounded-xl p-4 shadow-[0_4px_16px_rgba(73,190,216,0.15),0_8px_32px_rgba(73,190,216,0.1)] transition-all duration-300 hover:shadow-[0_8px_24px_rgba(73,190,216,0.3),0_16px_48px_rgba(73,190,216,0.15)] hover:-translate-y-1 hover:from-primary/15 hover:via-primary/20 hover:to-primary/10 hover:border-primary/50 h-full flex flex-col min-h-[88px] backdrop-blur-sm">
        <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
          {name}
        </h3>
        <p className="text-sm text-muted-foreground flex-1">
          {description}
        </p>
      </div>
    </a>
  );
};

export default GiftCard;
