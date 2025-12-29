import React from 'react';
import { ExternalLink, Bot } from 'lucide-react';

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
      <div className="relative overflow-hidden rounded-2xl bg-white p-6 shadow-soft transition-all duration-300 hover:shadow-card hover:-translate-y-0.5">
        {/* Icon */}
        <div className="w-12 h-12 rounded-xl bg-[#78C5E8]/10 flex items-center justify-center mb-4">
          <Bot className="w-6 h-6 text-[#78C5E8]" />
        </div>
        
        {/* Name */}
        <h3 className="text-lg font-semibold text-[#2A2D31] mb-1">
          {name}
        </h3>
        
        {/* Description */}
        <p className="text-[#2A2D31]/70 text-sm mb-5">
          {description}
        </p>
        
        {/* Button */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#78C5E8] text-white text-sm font-medium transition-all duration-300 group-hover:bg-[#5eb5d8]">
          Забрать
          <ExternalLink className="w-4 h-4" />
        </div>
      </div>
    </a>
  );
};

export default GiftCard;
