import React from 'react';

const NeuralTree: React.FC = () => {
  // Tree structure: points (nodes) - more compact for single screen
  const nodes = [
    // Top
    { x: 150, y: 25, size: 6, delay: 0 },
    // Layer 1
    { x: 120, y: 65, size: 4, delay: 0.5 },
    { x: 180, y: 65, size: 5, delay: 1 },
    // Layer 2
    { x: 90, y: 110, size: 5, delay: 1.5 },
    { x: 135, y: 105, size: 3, delay: 2 },
    { x: 165, y: 108, size: 4, delay: 0.3 },
    { x: 210, y: 110, size: 5, delay: 0.8 },
    // Layer 3
    { x: 60, y: 155, size: 4, delay: 1.2 },
    { x: 105, y: 148, size: 3, delay: 1.8 },
    { x: 150, y: 152, size: 5, delay: 0.6 },
    { x: 195, y: 148, size: 3, delay: 2.2 },
    { x: 240, y: 155, size: 4, delay: 0.4 },
    // Layer 4
    { x: 35, y: 200, size: 5, delay: 0.9 },
    { x: 82, y: 193, size: 3, delay: 1.4 },
    { x: 127, y: 197, size: 4, delay: 2.5 },
    { x: 173, y: 193, size: 3, delay: 0.2 },
    { x: 218, y: 197, size: 4, delay: 1.7 },
    { x: 265, y: 200, size: 5, delay: 0.7 },
    // Layer 5 (bottom)
    { x: 20, y: 245, size: 4, delay: 1.1 },
    { x: 67, y: 238, size: 3, delay: 2.1 },
    { x: 112, y: 242, size: 5, delay: 0.5 },
    { x: 150, y: 248, size: 6, delay: 1.6 },
    { x: 188, y: 242, size: 5, delay: 2.3 },
    { x: 233, y: 238, size: 3, delay: 0.8 },
    { x: 280, y: 245, size: 4, delay: 1.3 },
  ];

  // Garland connections (index pairs)
  const garlands = [
    // From top
    [0, 1], [0, 2],
    // Layer 1 to 2
    [1, 3], [1, 4], [2, 5], [2, 6],
    // Layer 2 to 3
    [3, 7], [3, 8], [4, 8], [4, 9], [5, 9], [5, 10], [6, 10], [6, 11],
    // Layer 3 to 4
    [7, 12], [7, 13], [8, 13], [8, 14], [9, 14], [9, 15], [10, 15], [10, 16], [11, 16], [11, 17],
    // Layer 4 to 5
    [12, 18], [12, 19], [13, 19], [13, 20], [14, 20], [14, 21], [15, 21], [15, 22], [16, 22], [16, 23], [17, 23], [17, 24],
    // Cross connections for more density
    [4, 5], [8, 9], [9, 10], [13, 14], [14, 15], [15, 16], [19, 20], [20, 21], [21, 22], [22, 23],
  ];

  return (
    <div className="relative w-[200px] sm:w-[240px] lg:w-[280px] animate-breathe">
      {/* Soft shadow underneath */}
      <div 
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-6 blur-xl rounded-full"
        style={{ backgroundColor: 'hsl(var(--primary) / 0.15)' }}
      />
      
      <svg
        viewBox="0 0 300 270"
        className="w-full h-auto relative"
        style={{ 
          filter: 'drop-shadow(0 8px 24px hsl(var(--primary) / 0.25)) drop-shadow(0 4px 12px hsl(var(--foreground) / 0.06))' 
        }}
      >
        <defs>
          {/* Gradient for garland lines - brand primary */}
          <linearGradient id="garlandGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.3" />
            <stop offset="50%" stopColor="hsl(var(--primary))" stopOpacity="0.6" />
            <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.3" />
          </linearGradient>
          
          {/* Light glow filter for nodes */}
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Radial gradient for nodes */}
          <radialGradient id="nodeGradient" cx="30%" cy="30%">
            <stop offset="0%" stopColor="hsl(var(--primary-light))" />
            <stop offset="100%" stopColor="hsl(var(--primary))" />
          </radialGradient>
        </defs>

        {/* Garland lines - static, elegant */}
        {garlands.map(([from, to], index) => {
          const fromNode = nodes[from];
          const toNode = nodes[to];
          
          return (
            <line
              key={`garland-${index}`}
              x1={fromNode.x}
              y1={fromNode.y}
              x2={toNode.x}
              y2={toNode.y}
              stroke="url(#garlandGradient)"
              strokeWidth="1"
              strokeLinecap="round"
              opacity="0.7"
            />
          );
        })}

        {/* Nodes (neural network points) */}
        {nodes.map((node, index) => (
          <g key={`node-${index}`} filter="url(#glow)">
            {/* Outer glow */}
            <circle
              cx={node.x}
              cy={node.y}
              r={node.size + 4}
              fill="hsl(var(--primary))"
              opacity="0.2"
              style={{
                animation: `twinkle ${2 + (index % 3)}s ease-in-out infinite`,
                animationDelay: `${node.delay}s`,
              }}
            />
            {/* Main node */}
            <circle
              cx={node.x}
              cy={node.y}
              r={node.size}
              fill="url(#nodeGradient)"
              opacity="0.9"
              style={{
                animation: `twinkle ${1.5 + (index % 2)}s ease-in-out infinite`,
                animationDelay: `${node.delay}s`,
              }}
            />
            {/* Inner bright core */}
            <circle
              cx={node.x}
              cy={node.y}
              r={node.size * 0.4}
              fill="hsl(var(--primary))"
              opacity="1"
            />
          </g>
        ))}

        {/* Star on top */}
        <g filter="url(#glow)" style={{ animation: 'twinkle 3s ease-in-out infinite' }}>
          <polygon
            points="150,5 154,16 166,16 156,23 160,34 150,27 140,34 144,23 134,16 146,16"
            fill="hsl(var(--primary-light))"
            opacity="0.95"
          />
          <polygon
            points="150,8 152,14 159,14 154,18 156,26 150,21 144,26 146,18 141,14 148,14"
            fill="hsl(var(--primary))"
          />
        </g>
      </svg>
    </div>
  );
};

export default NeuralTree;
