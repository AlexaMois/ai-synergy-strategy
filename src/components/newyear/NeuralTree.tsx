import React from 'react';
const NeuralTree: React.FC = () => {
  // Tree structure: points (nodes) - more compact for single screen
  const nodes = [
  // Top
  {
    x: 150,
    y: 25,
    size: 6,
    delay: 0
  },
  // Layer 1
  {
    x: 120,
    y: 65,
    size: 4,
    delay: 0.5
  }, {
    x: 180,
    y: 65,
    size: 5,
    delay: 1
  },
  // Layer 2
  {
    x: 90,
    y: 110,
    size: 5,
    delay: 1.5
  }, {
    x: 135,
    y: 105,
    size: 3,
    delay: 2
  }, {
    x: 165,
    y: 108,
    size: 4,
    delay: 0.3
  }, {
    x: 210,
    y: 110,
    size: 5,
    delay: 0.8
  },
  // Layer 3
  {
    x: 60,
    y: 155,
    size: 4,
    delay: 1.2
  }, {
    x: 105,
    y: 148,
    size: 3,
    delay: 1.8
  }, {
    x: 150,
    y: 152,
    size: 5,
    delay: 0.6
  }, {
    x: 195,
    y: 148,
    size: 3,
    delay: 2.2
  }, {
    x: 240,
    y: 155,
    size: 4,
    delay: 0.4
  },
  // Layer 4
  {
    x: 35,
    y: 200,
    size: 5,
    delay: 0.9
  }, {
    x: 82,
    y: 193,
    size: 3,
    delay: 1.4
  }, {
    x: 127,
    y: 197,
    size: 4,
    delay: 2.5
  }, {
    x: 173,
    y: 193,
    size: 3,
    delay: 0.2
  }, {
    x: 218,
    y: 197,
    size: 4,
    delay: 1.7
  }, {
    x: 265,
    y: 200,
    size: 5,
    delay: 0.7
  },
  // Layer 5 (bottom)
  {
    x: 20,
    y: 245,
    size: 4,
    delay: 1.1
  }, {
    x: 67,
    y: 238,
    size: 3,
    delay: 2.1
  }, {
    x: 112,
    y: 242,
    size: 5,
    delay: 0.5
  }, {
    x: 150,
    y: 248,
    size: 6,
    delay: 1.6
  }, {
    x: 188,
    y: 242,
    size: 5,
    delay: 2.3
  }, {
    x: 233,
    y: 238,
    size: 3,
    delay: 0.8
  }, {
    x: 280,
    y: 245,
    size: 4,
    delay: 1.3
  }];

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
  [4, 5], [8, 9], [9, 10], [13, 14], [14, 15], [15, 16], [19, 20], [20, 21], [21, 22], [22, 23]];
  return (
    <div 
      className="relative w-[200px] sm:w-[240px] lg:w-[280px] animate-breathe"
      style={{ filter: 'drop-shadow(0 0 25px hsl(var(--primary) / 0.4))' }}
    >
      {/* Soft shadow underneath */}
      <div 
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-8 blur-2xl rounded-full" 
        style={{ backgroundColor: 'hsl(var(--primary) / 0.25)' }} 
      />
      
      <svg viewBox="0 0 300 280" className="w-full h-auto">
        {/* Garland connections */}
        {garlands.map(([from, to], index) => (
          <line
            key={`garland-${index}`}
            x1={nodes[from].x}
            y1={nodes[from].y}
            x2={nodes[to].x}
            y2={nodes[to].y}
            stroke="hsl(var(--primary) / 0.3)"
            strokeWidth="1.5"
            className="animate-garlandMove"
            style={{ animationDelay: `${index * 0.05}s` }}
          />
        ))}
        
        {/* Nodes */}
        {nodes.map((node, index) => (
          <g key={`node-${index}`}>
            {/* Glow circle */}
            <circle
              cx={node.x}
              cy={node.y}
              r={node.size * 2}
              fill="hsl(var(--primary) / 0.15)"
              className="animate-pulse"
              style={{ animationDelay: `${node.delay}s` }}
            />
            {/* Main node */}
            <circle
              cx={node.x}
              cy={node.y}
              r={node.size}
              fill="hsl(var(--primary))"
              className="animate-twinkle"
              style={{ animationDelay: `${node.delay}s` }}
            />
          </g>
        ))}
        
        {/* Star on top */}
        <polygon
          points="150,5 153,18 166,18 156,26 160,40 150,32 140,40 144,26 134,18 147,18"
          fill="hsl(var(--primary))"
          className="animate-twinkle"
          style={{ filter: 'drop-shadow(0 0 8px hsl(var(--primary) / 0.8))' }}
        />
      </svg>
    </div>
  );
};
export default NeuralTree;