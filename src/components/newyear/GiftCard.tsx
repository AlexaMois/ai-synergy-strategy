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
      className="group block"
    >
      <div className="bg-card border border-border rounded-xl p-4 shadow-soft transition-all duration-300 hover:shadow-card hover:-translate-y-0.5 hover:border-primary/30">
        <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
          {name}
        </h3>
        <p className="text-sm text-muted-foreground">
          {description}
        </p>
      </div>
    </a>
  );
};

export default GiftCard;
