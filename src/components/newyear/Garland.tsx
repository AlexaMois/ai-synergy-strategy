import React from 'react';

const Garland: React.FC = () => {
  // Define light positions along a wavy path
  const lights = [
    { x: 5, y: 8, color: 'primary', delay: 0 },
    { x: 12, y: 5, color: 'amber', delay: 0.3 },
    { x: 20, y: 9, color: 'rose', delay: 0.6 },
    { x: 28, y: 4, color: 'primary', delay: 0.2 },
    { x: 36, y: 10, color: 'emerald', delay: 0.5 },
    { x: 44, y: 5, color: 'amber', delay: 0.1 },
    { x: 52, y: 8, color: 'rose', delay: 0.4 },
    { x: 60, y: 4, color: 'primary', delay: 0.7 },
    { x: 68, y: 9, color: 'emerald', delay: 0.2 },
    { x: 76, y: 5, color: 'amber', delay: 0.5 },
    { x: 84, y: 8, color: 'rose', delay: 0.3 },
    { x: 92, y: 6, color: 'primary', delay: 0.6 },
  ];

  const getColor = (colorName: string) => {
    switch (colorName) {
      case 'primary': return 'hsl(var(--primary))';
      case 'amber': return '#F59E0B';
      case 'rose': return '#F43F5E';
      case 'emerald': return '#10B981';
      default: return 'hsl(var(--primary))';
    }
  };

  const getGlowColor = (colorName: string) => {
    switch (colorName) {
      case 'primary': return 'rgba(73, 190, 216, 0.6)';
      case 'amber': return 'rgba(245, 158, 11, 0.6)';
      case 'rose': return 'rgba(244, 63, 94, 0.6)';
      case 'emerald': return 'rgba(16, 185, 129, 0.6)';
      default: return 'rgba(73, 190, 216, 0.6)';
    }
  };

  return (
    <div className="absolute inset-x-0 top-16 h-20 pointer-events-none overflow-hidden z-0">
      <svg
        viewBox="0 0 100 20"
        preserveAspectRatio="none"
        className="w-full h-full"
      >
        {/* Garland wire */}
        <path
          d="M 0 10 Q 10 5, 20 10 T 40 10 T 60 10 T 80 10 T 100 10"
          fill="none"
          stroke="hsl(var(--foreground) / 0.15)"
          strokeWidth="0.3"
        />
        
        {/* Light bulbs */}
        {lights.map((light, index) => (
          <g key={index}>
            {/* Glow effect */}
            <circle
              cx={light.x}
              cy={light.y}
              r="2.5"
              fill={getGlowColor(light.color)}
              className="animate-pulse"
              style={{ 
                animationDelay: `${light.delay}s`,
                animationDuration: '2s'
              }}
            />
            {/* Main bulb */}
            <circle
              cx={light.x}
              cy={light.y}
              r="1"
              fill={getColor(light.color)}
              className="animate-twinkle"
              style={{ 
                animationDelay: `${light.delay}s`,
                filter: `drop-shadow(0 0 3px ${getGlowColor(light.color)})`
              }}
            />
          </g>
        ))}
      </svg>
    </div>
  );
};

export default Garland;
