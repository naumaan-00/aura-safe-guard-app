
import React, { useState } from 'react';

interface EmergencyButtonProps {
  onActivate: () => void;
}

const EmergencyButton: React.FC<EmergencyButtonProps> = ({ onActivate }) => {
  const [isPressed, setIsPressed] = useState(false);
  const [pressTimer, setPressTimer] = useState<number | null>(null);
  
  const handlePressStart = () => {
    setIsPressed(true);
    const timer = window.setTimeout(() => {
      onActivate();
      setIsPressed(false);
    }, 3000) as unknown as number;
    setPressTimer(timer);
  };
  
  const handlePressEnd = () => {
    if (pressTimer) {
      clearTimeout(pressTimer);
      setPressTimer(null);
    }
    setIsPressed(false);
  };

  return (
    <div className="relative flex justify-center">
      <div className={`absolute inset-0 rounded-full bg-destructive/60 transition-transform duration-3000 ${isPressed ? 'scale-100' : 'scale-0'}`} />
      <div className={`absolute -inset-4 rounded-full ${isPressed ? 'animate-pulse-ring' : ''}`} />
      <button
        className={`relative w-32 h-32 rounded-full font-bold text-primary-foreground transition-all 
                   ${isPressed ? 'bg-destructive scale-95' : 'bg-primary scale-100 hover:bg-primary/90'}`}
        onTouchStart={handlePressStart}
        onMouseDown={handlePressStart}
        onTouchEnd={handlePressEnd}
        onMouseUp={handlePressEnd}
        onMouseLeave={handlePressEnd}
      >
        {isPressed ? 'Hold...' : 'SOS'}
        {isPressed && (
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
            <circle 
              className="text-primary stroke-current" 
              strokeWidth="3" 
              stroke="currentColor" 
              fill="transparent" 
              r="48" 
              cx="50" 
              cy="50" 
              style={{
                strokeDasharray: "301.59",
                strokeDashoffset: "301.59",
                transition: "stroke-dashoffset 3s linear",
                animation: isPressed ? "countdown 3s linear forwards" : "none"
              }}
            />
          </svg>
        )}
      </button>
      <style jsx>{`
        @keyframes countdown {
          to {
            stroke-dashoffset: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default EmergencyButton;
