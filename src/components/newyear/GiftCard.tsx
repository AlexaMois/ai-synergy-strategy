import React from 'react';

interface GiftCardProps {
  name: string;
  description: string;
  url: string;
}

const GiftCard: React.FC<GiftCardProps> = ({ name, description, url }) => {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="group block"
    >
      <div className="bg-white border border-[#2A2D31]/10 rounded-xl p-4 shadow-soft transition-all duration-300 hover:shadow-card hover:-translate-y-0.5">
        <h3 className="text-lg font-semibold text-[#2A2D31]">
          {name}
        </h3>
        <p className="text-sm text-[#2A2D31]/70">
          {description}
        </p>
      </div>
    </a>
  );
};

export default GiftCard;
