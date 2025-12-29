import React from 'react';
import { ExternalLink } from 'lucide-react';

interface GiftCardProps {
  name: string;
  description: string;
  url: string;
  emoji: string;
}

const GiftCard: React.FC<GiftCardProps> = ({ name, description, url, emoji }) => {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="group block"
    >
      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-6 sm:p-8 transition-all duration-500 hover:border-[#49BED8]/50 hover:bg-white/10 hover:-translate-y-1 hover:shadow-[0_0_40px_rgba(73,190,216,0.3)]">
        {/* Glow effect on hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-[#49BED8]/10 via-transparent to-transparent" />
        
        <div className="relative z-10">
          {/* Emoji */}
          <div className="text-4xl sm:text-5xl mb-4">{emoji}</div>
          
          {/* Name */}
          <h3 className="text-xl sm:text-2xl font-semibold text-white mb-2">
            {name}
          </h3>
          
          {/* Description */}
          <p className="text-white/70 text-sm sm:text-base mb-6">
            {description}
          </p>
          
          {/* Button */}
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#49BED8]/20 border border-[#49BED8]/40 text-[#49BED8] text-sm font-medium transition-all duration-300 group-hover:bg-[#49BED8] group-hover:text-white group-hover:border-[#49BED8]">
            Забрать
            <ExternalLink className="w-4 h-4" />
          </div>
        </div>
      </div>
    </a>
  );
};

export default GiftCard;
