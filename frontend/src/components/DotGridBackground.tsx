export default function DotGridBackground() {
  return (
    <div className="fixed inset-0 z-0 bg-[#f3f3f3]">
      <div className="dot-grid w-full h-full">
        {Array.from({ length: 400 }).map((_, i) => (
          <div key={i} className="dot-cell"></div>
        ))}
      </div>
    </div>
  );
}
