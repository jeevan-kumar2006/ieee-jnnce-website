import { useState, useCallback } from 'react';

const COLS = 20;
const ROWS = 20;
const RADIUS = 2; // Radius 2 means a 5x5 grid (center + 2 steps in each direction)

export default function DotGridBackground() {
  const [hoveredCell, setHoveredCell] = useState<{ row: number; col: number } | null>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const col = Math.floor((x / rect.width) * COLS);
    const row = Math.floor((y / rect.height) * ROWS);

    setHoveredCell({ row, col });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setHoveredCell(null);
  }, []);

  return (
    <div 
      className="fixed inset-0 z-0 bg-[#f3f3f3]"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="grid w-full h-full" style={{ gridTemplateColumns: `repeat(${COLS}, 1fr)`, gridTemplateRows: `repeat(${ROWS}, 1fr)` }}>
        {Array.from({ length: COLS * ROWS }).map((_, i) => {
          const row = Math.floor(i / COLS);
          const col = i % COLS;

          let scale = 1;
          let opacity = 0.4;

          if (hoveredCell) {
            const distance = Math.sqrt(Math.pow(row - hoveredCell.row, 2) + Math.pow(col - hoveredCell.col, 2));
            
            if (distance <= RADIUS) {
              // Center dot (distance 0) gets scale 2.5, furthest ring (distance 2) gets scale 1.5
              scale = 2.5 - (distance * 0.5);
              // Center dot opacity 1, furthest ring opacity 0.6
              opacity = 1 - (distance * 0.2);
            }
          }

          return (
            <div key={i} className="flex items-center justify-center">
              <div
                className="rounded-full bg-[#a9c9ff] transition-all duration-100 ease-out"
                style={{
                  width: '4px',
                  height: '4px',
                  transform: `scale(${scale})`,
                  opacity: opacity,
                }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
