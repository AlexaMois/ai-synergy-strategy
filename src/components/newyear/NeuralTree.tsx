import React from 'react';

const NeuralTree: React.FC = () => {
  // Tree structure: points (nodes) and lines (garlands)
  const nodes = [
    // Top
    { x: 200, y: 30, size: 8, delay: 0 },
    // Layer 1
    { x: 160, y: 80, size: 5, delay: 0.5 },
    { x: 240, y: 80, size: 6, delay: 1 },
    // Layer 2
    { x: 120, y: 140, size: 6, delay: 1.5 },
    { x: 180, y: 130, size: 4, delay: 2 },
    { x: 220, y: 135, size: 5, delay: 0.3 },
    { x: 280, y: 140, size: 6, delay: 0.8 },
    // Layer 3
    { x: 80, y: 200, size: 5, delay: 1.2 },
    { x: 140, y: 190, size: 4, delay: 1.8 },
    { x: 200, y: 195, size: 7, delay: 0.6 },
    { x: 260, y: 190, size: 4, delay: 2.2 },
    { x: 320, y: 200, size: 5, delay: 0.4 },
    // Layer 4
    { x: 50, y: 260, size: 6, delay: 0.9 },
    { x: 110, y: 250, size: 4, delay: 1.4 },
    { x: 170, y: 255, size: 5, delay: 2.5 },
    { x: 230, y: 250, size: 4, delay: 0.2 },
    { x: 290, y: 255, size: 5, delay: 1.7 },
    { x: 350, y: 260, size: 6, delay: 0.7 },
    // Layer 5 (bottom)
    { x: 30, y: 320, size: 5, delay: 1.1 },
    { x: 90, y: 310, size: 4, delay: 2.1 },
    { x: 150, y: 315, size: 6, delay: 0.5 },
    { x: 200, y: 320, size: 8, delay: 1.6 },
    { x: 250, y: 315, size: 6, delay: 2.3 },
    { x: 310, y: 310, size: 4, delay: 0.8 },
    { x: 370, y: 320, size: 5, delay: 1.3 },
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
    <div className="relative w-full max-w-[280px] lg:max-w-[320px] animate-breathe">
      <svg
        viewBox="0 0 400 350"
        className="w-full h-auto"
        style={{ filter: 'drop-shadow(0 0 40px rgba(120, 197, 232, 0.35))' }}
      >
        <defs>
          {/* Gradient for garland lines - icy blue */}
          <linearGradient id="garlandGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#78C5E8" stopOpacity="0.6" />
            <stop offset="50%" stopColor="#a8daf0" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#78C5E8" stopOpacity="0.6" />
          </linearGradient>
          
          {/* Light glow filter for nodes */}
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Garland lines with running lights effect */}
        {garlands.map(([from, to], index) => {
          const fromNode = nodes[from];
          const toNode = nodes[to];
          const length = Math.sqrt(
            Math.pow(toNode.x - fromNode.x, 2) + Math.pow(toNode.y - fromNode.y, 2)
          );
          
          return (
            <g key={`garland-${index}`}>
              {/* Base line with glow */}
              <line
                x1={fromNode.x}
                y1={fromNode.y}
                x2={toNode.x}
                y2={toNode.y}
                stroke="url(#garlandGradient)"
                strokeWidth="1.5"
                strokeLinecap="round"
                opacity="0.5"
              />
              {/* Animated running light */}
              <line
                x1={fromNode.x}
                y1={fromNode.y}
                x2={toNode.x}
                y2={toNode.y}
                stroke="#78C5E8"
                strokeWidth="2"
                strokeLinecap="round"
                strokeDasharray={`4 ${length - 4}`}
                opacity="0.8"
                style={{
                  animation: `garlandMove ${2 + (index % 3)}s linear infinite`,
                  animationDelay: `${(index * 0.15) % 2}s`,
                }}
              />
            </g>
          );
        })}

        {/* Nodes (neural network points / light bulbs) */}
        {nodes.map((node, index) => (
          <g key={`node-${index}`} filter="url(#glow)">
            {/* Outer glow - icy blue */}
            <circle
              cx={node.x}
              cy={node.y}
              r={node.size + 5}
              fill="#78C5E8"
              opacity="0.25"
              style={{
                animation: `twinkle ${2 + (index % 3)}s ease-in-out infinite`,
                animationDelay: `${node.delay}s`,
              }}
            />
            {/* Main bulb - lighter blue */}
            <circle
              cx={node.x}
              cy={node.y}
              r={node.size}
              fill="#a8daf0"
              opacity="0.85"
              style={{
                animation: `twinkle ${1.5 + (index % 2)}s ease-in-out infinite`,
                animationDelay: `${node.delay}s`,
              }}
            />
            {/* Inner bright core */}
            <circle
              cx={node.x}
              cy={node.y}
              r={node.size * 0.5}
              fill="#78C5E8"
              opacity="1"
            />
          </g>
        ))}

        {/* Star on top */}
        <g filter="url(#glow)" style={{ animation: 'twinkle 3s ease-in-out infinite' }}>
          <polygon
            points="200,5 205,20 220,20 208,30 213,45 200,35 187,45 192,30 180,20 195,20"
            fill="#a8daf0"
            opacity="0.95"
          />
          <polygon
            points="200,10 203,18 213,18 205,24 208,35 200,28 192,35 195,24 187,18 197,18"
            fill="#78C5E8"
          />
        </g>
      </svg>
    </div>
  );
};

export default NeuralTree;
