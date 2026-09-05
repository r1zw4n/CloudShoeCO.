import React from 'react';
import { ShoeModelId } from '../types';

interface ShoeIllustrationProps {
  model: ShoeModelId;
  className?: string;
  isRevealed?: boolean;
}

export const ShoeIllustration: React.FC<ShoeIllustrationProps> = ({ model, className = 'w-full h-44', isRevealed = false }) => {
  if (model === 'CloudWALK') {
    return (
      <div className={`relative flex items-center justify-center overflow-hidden rounded-xl border border-[#2a2a2a] bg-gradient-to-br from-[#1c1c1c] via-[#161616] to-[#0f141d] p-4 transition-transform duration-300 ${className}`}>
        <svg
          viewBox="0 0 340 180"
          className="w-full h-full drop-shadow-lg transition-transform duration-300 hover:scale-105"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Shadow */}
          <ellipse cx="170" cy="155" rx="130" ry="12" fill="#000000" fillOpacity="0.6" />

          {/* Cloud Pod Sole Base */}
          <g filter="drop-shadow(0px 2px 2px rgba(0,0,0,0.08))">
            {/* 6 Cloud Pod Cushions */}
            <circle cx="70" cy="138" r="14" fill="#ffffff" stroke="#cbd5e1" strokeWidth="3" />
            <circle cx="106" cy="140" r="14" fill="#ffffff" stroke="#cbd5e1" strokeWidth="3" />
            <circle cx="144" cy="142" r="14" fill="#ffffff" stroke="#cbd5e1" strokeWidth="3" />
            <circle cx="184" cy="142" r="14" fill="#ffffff" stroke="#cbd5e1" strokeWidth="3" />
            <circle cx="224" cy="140" r="14" fill="#ffffff" stroke="#cbd5e1" strokeWidth="3" />
            <circle cx="264" cy="136" r="14" fill="#ffffff" stroke="#cbd5e1" strokeWidth="3" />

            {/* Inner cloud hole accents */}
            <ellipse cx="70" cy="138" rx="6" ry="4" fill="#e2e8f0" />
            <ellipse cx="106" cy="140" rx="6" ry="4" fill="#e2e8f0" />
            <ellipse cx="144" cy="142" rx="6" ry="4" fill="#e2e8f0" />
            <ellipse cx="184" cy="142" rx="6" ry="4" fill="#e2e8f0" />
            <ellipse cx="224" cy="140" rx="6" ry="4" fill="#e2e8f0" />
            <ellipse cx="264" cy="136" rx="6" ry="4" fill="#e2e8f0" />
          </g>

          {/* Midsole platform */}
          <path
            d="M 52 132 C 80 134 260 134 282 128 C 285 124 280 120 270 122 C 240 125 90 125 54 125 C 48 125 46 129 52 132 Z"
            fill="#3b82f6"
          />

          {/* Shoe Upper - Lifestyle CloudWALK (Clean, minimal, urban navy-slate with white trim) */}
          <path
            d="M 52 126 C 48 118 46 95 62 82 C 78 70 102 76 118 78 C 132 80 156 58 178 52 C 196 47 218 56 226 72 C 238 78 266 94 282 110 C 288 116 288 126 278 126 C 240 126 90 126 52 126 Z"
            fill="#1e293b"
          />

          {/* Collar / Ankle opening */}
          <path
            d="M 172 54 C 182 51 202 55 214 66 C 206 72 190 75 178 72 C 172 68 170 60 172 54 Z"
            fill="#e2e8f0"
          />

          {/* Lifestyle Walking Accent Pattern (Smooth wave) */}
          <path
            d="M 85 110 C 130 90 200 115 260 105"
            stroke="#60a5fa"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          <path
            d="M 95 118 C 140 98 210 122 250 114"
            stroke="#93c5fd"
            strokeWidth="2"
            strokeLinecap="round"
          />

          {/* Laces */}
          <path d="M 148 76 L 166 64" stroke="#f8fafc" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M 160 84 L 178 72" stroke="#f8fafc" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M 172 92 L 190 80" stroke="#f8fafc" strokeWidth="2.5" strokeLinecap="round" />

          {/* Toe cap guard */}
          <path
            d="M 264 104 C 276 112 282 120 280 126 C 265 126 250 120 244 114 Z"
            fill="#334155"
          />

          {/* Logo badge */}
          <circle cx="120" cy="98" r="8" fill="#3b82f6" />
          <path d="M 116 98 C 117 95 120 95 121 96 C 122 94 125 94 126 98" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" />
        </svg>

        {isRevealed && (
          <div className="absolute top-2 right-2 rounded-full border border-blue-500/30 bg-blue-500/20 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-blue-300 backdrop-blur-xs">
            LifeStyle
          </div>
        )}
      </div>
    );
  }

  // CloudRUN illustration
  return (
    <div className={`relative flex items-center justify-center overflow-hidden rounded-xl border border-[#2a2a2a] bg-gradient-to-br from-[#1c1c1c] via-[#1a1512] to-[#150e0a] p-4 transition-transform duration-300 ${className}`}>
      <svg
        viewBox="0 0 340 180"
        className="w-full h-full drop-shadow-lg transition-transform duration-300 hover:scale-105"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Shadow */}
        <ellipse cx="170" cy="155" rx="130" ry="12" fill="#000000" fillOpacity="0.6" />

        {/* Dynamic Aggressive CloudRUN Pods */}
        <g filter="drop-shadow(0px 2px 2px rgba(0,0,0,0.08))">
          <circle cx="68" cy="136" r="14" fill="#ffffff" stroke="#ea580c" strokeWidth="3" />
          <circle cx="104" cy="139" r="14" fill="#ffffff" stroke="#ea580c" strokeWidth="3" />
          <circle cx="142" cy="141" r="14" fill="#ffffff" stroke="#ea580c" strokeWidth="3" />
          <circle cx="182" cy="142" r="14" fill="#ffffff" stroke="#ea580c" strokeWidth="3" />
          <circle cx="224" cy="140" r="14" fill="#ffffff" stroke="#ea580c" strokeWidth="3" />
          <circle cx="266" cy="134" r="14" fill="#ffffff" stroke="#ea580c" strokeWidth="3" />

          {/* High rebound core */}
          <circle cx="68" cy="136" r="6" fill="#fed7aa" />
          <circle cx="104" cy="139" r="6" fill="#fed7aa" />
          <circle cx="142" cy="141" r="6" fill="#fed7aa" />
          <circle cx="182" cy="142" r="6" fill="#fed7aa" />
          <circle cx="224" cy="140" r="6" fill="#fed7aa" />
          <circle cx="266" cy="134" r="6" fill="#fed7aa" />
        </g>

        {/* Speedboard propulsion plate */}
        <path
          d="M 50 131 C 80 133 260 133 286 123 C 288 120 282 117 270 119 C 240 123 90 123 52 123 C 46 123 44 128 50 131 Z"
          fill="#ea580c"
        />

        {/* Performance Upper - Aerodynamic athletic styling (Fiery Coral / Charcoal) */}
        <path
          d="M 50 124 C 44 114 44 90 60 76 C 76 64 100 70 120 74 C 140 76 168 50 192 44 C 210 40 228 48 236 64 C 248 70 274 88 288 104 C 294 110 292 120 282 122 C 240 122 90 122 50 124 Z"
          fill="#0f172a"
        />

        {/* Neon Speed Accents */}
        <path
          d="M 70 106 L 140 78 L 220 72 L 270 98"
          stroke="#f97316"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <path
          d="M 90 114 L 160 86 L 240 80 L 260 104"
          stroke="#fbbf24"
          strokeWidth="2"
          strokeLinecap="round"
        />

        {/* Collar & Tongue */}
        <path
          d="M 186 46 C 196 42 216 48 226 60 C 218 64 200 66 190 62 Z"
          fill="#f97316"
        />

        {/* Dynamic Lacing system */}
        <path d="M 160 68 L 180 54" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M 174 76 L 194 62" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M 188 84 L 208 70" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" />

        {/* Reflective Heel Counter */}
        <path
          d="M 50 110 C 48 96 56 82 64 78 C 68 90 66 106 64 118 Z"
          fill="#f97316"
        />
      </svg>

      {isRevealed && (
        <div className="absolute top-2 right-2 rounded-full border border-orange-500/30 bg-orange-500/20 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-orange-300 backdrop-blur-xs">
          Sports / Running
        </div>
      )}
    </div>
  );
};
