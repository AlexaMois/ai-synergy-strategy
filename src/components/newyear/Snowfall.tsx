import React, { useMemo } from 'react';

interface Snowflake {
  id: number;
  left: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
  rotation: number;
}

// SVG Snowflake component
const SnowflakeIcon: React.FC<{ size: number; opacity: number }> = ({ size, opacity }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    style={{ opacity }}
  >
    <path
      d="M12 2v20M2 12h20M4.93 4.93l14.14 14.14M19.07 4.93L4.93 19.07M12 6l-2-2M12 6l2-2M12 18l-2 2M12 18l2 2M6 12l-2-2M6 12l-2 2M18 12l2-2M18 12l2 2"
      stroke="#78C5E8"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

const Snowfall: React.FC = () => {
  const snowflakes = useMemo<Snowflake[]>(() => {
    return Array.from({ length: 35 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: 10 + Math.random() * 14, // 10-24px
      duration: 12 + Math.random() * 18,
      delay: Math.random() * 12,
      opacity: 0.2 + Math.random() * 0.4,
      rotation: Math.random() * 360,
    }));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {snowflakes.map((flake) => (
        <div
          key={flake.id}
          className="absolute snowflake"
          style={{
            left: `${flake.left}%`,
            animationDuration: `${flake.duration}s`,
            animationDelay: `${flake.delay}s`,
          }}
        >
          <div
            style={{
              animation: `spin ${8 + Math.random() * 8}s linear infinite`,
              transform: `rotate(${flake.rotation}deg)`,
            }}
          >
            <SnowflakeIcon size={flake.size} opacity={flake.opacity} />
          </div>
        </div>
      ))}
      
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default Snowfall;
