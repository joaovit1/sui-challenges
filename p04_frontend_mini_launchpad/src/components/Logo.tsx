export function Logo({ className = "w-10 h-10" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="neonGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#06b6d4" />
          <stop offset="100%" stopColor="#a855f7" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      
      {/* Outer glow circle */}
      <circle
        cx="50"
        cy="50"
        r="45"
        fill="none"
        stroke="url(#neonGradient)"
        strokeWidth="2"
        opacity="0.3"
        filter="url(#glow)"
      />
      
      {/* Main drop shape */}
      <path
        d="M50 10 C55 15, 70 35, 70 50 C70 63.8, 63.8 75, 50 75 C36.2 75, 25 63.8, 25 50 C25 35, 45 15, 50 10 Z"
        fill="url(#neonGradient)"
        filter="url(#glow)"
      />
      
      {/* Inner highlight */}
      <ellipse
        cx="45"
        cy="45"
        rx="8"
        ry="12"
        fill="white"
        opacity="0.4"
      />
      
      {/* Small particle dots */}
      <circle cx="30" cy="40" r="2" fill="#06b6d4" opacity="0.8" filter="url(#glow)" />
      <circle cx="70" cy="45" r="1.5" fill="#a855f7" opacity="0.8" filter="url(#glow)" />
      <circle cx="55" cy="25" r="1" fill="#06b6d4" opacity="0.8" filter="url(#glow)" />
    </svg>
  );
}
