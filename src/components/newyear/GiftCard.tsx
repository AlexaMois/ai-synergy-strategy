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
      <div className="bg-gradient-to-br from-primary/5 via-primary/10 to-primary/5 border border-primary/20 rounded-xl p-4 shadow-soft transition-all duration-300 hover:shadow-card hover:-translate-y-0.5 hover:from-primary/10 hover:via-primary/15 hover:to-primary/10 hover:border-primary/40 h-full flex flex-col min-h-[88px]">
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
