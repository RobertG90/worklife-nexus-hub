
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface NavigationButtonsProps {
  showBack?: boolean;
  showHome?: boolean;
  onSectionChange?: (section: string) => void;
  className?: string;
}

export function NavigationButtons({ 
  showBack = true, 
  showHome = true, 
  onSectionChange,
  className = "" 
}: NavigationButtonsProps) {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  const handleHome = () => {
    if (onSectionChange) {
      onSectionChange('dashboard');
    } else {
      navigate('/');
    }
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {showBack && (
        <Button
          variant="outline"
          size="sm"
          onClick={handleBack}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </Button>
      )}
      {showHome && (
        <Button
          variant="outline"
          size="sm"
          onClick={handleHome}
          className="flex items-center gap-2"
        >
          <Home className="w-4 h-4" />
          Home
        </Button>
      )}
    </div>
  );
}
