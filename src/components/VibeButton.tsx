import React from 'react';
import { Button } from '@/components/ui/button';
import { useVibe } from '@/contexts/VibeContext';
import { Sparkles } from 'lucide-react';

export function VibeButton() {
  const { isVibeMode, toggleVibeMode, currentEmoji } = useVibe();

  return (
    <Button
      onClick={toggleVibeMode}
      variant={isVibeMode ? "default" : "outline"}
      size="icon"
      className={`relative ${isVibeMode ? 'vibe-button' : ''}`}
    >
      <Sparkles className={`w-5 h-5 ${isVibeMode ? 'hidden' : ''}`} />
      <span className={`text-lg ${!isVibeMode ? 'hidden' : ''}`}>
        {currentEmoji}
      </span>
      {isVibeMode && (
        <span className="absolute -top-1 -right-1 text-xs animate-bounce">
          ✨
        </span>
      )}
    </Button>
  );
} 