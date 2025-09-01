import React, { useState, useRef, useEffect } from 'react';

interface TooltipProps {
  children: React.ReactNode;
  content: string;
  position?: 'top' | 'bottom' | 'left' | 'right';
  delay?: number;
}

export const Tooltip: React.FC<TooltipProps> = ({ 
  children, 
  content, 
  position = 'top',
  delay = 500 
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  const showTooltip = () => {
    const id = setTimeout(() => {
      setIsVisible(true);
    }, delay);
    setTimeoutId(id);
  };

  const hideTooltip = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
      setTimeoutId(null);
    }
    setIsVisible(false);
  };

  const getTooltipPosition = () => {
    if (!tooltipRef.current || !triggerRef.current) return {};

    const triggerRect = triggerRef.current.getBoundingClientRect();
    const tooltipRect = tooltipRef.current.getBoundingClientRect();
    const gap = 8;

    switch (position) {
      case 'top':
        return {
          bottom: '100%',
          left: '50%',
          transform: 'translateX(-50%)',
          marginBottom: gap,
          minWidth: 'max-content',
          position: 'absolute'
        };
      case 'bottom':
        return {
          top: '100%',
          left: '50%',
          transform: 'translateX(-50%)',
          marginTop: gap,
          minWidth: 'max-content',
          position: 'absolute'
        };
      case 'left':
        return {
          right: '100%',
          top: '50%',
          transform: 'translateY(-50%)',
          marginRight: gap,
          position: 'absolute'
        };
      case 'right':
        return {
          left: '100%',
          top: '50%',
          transform: 'translateY(-50%)',
          marginLeft: gap,
          position: 'absolute'
        };
      default:
        return {};
    }
  };

  const getArrowPosition = () => {
    switch (position) {
      case 'top':
        return 'top-full left-1/2 transform -translate-x-1/2 border-l-transparent border-r-transparent border-b-transparent border-t-gruvbox-dark-bg2';
      case 'bottom':
        return 'bottom-full left-1/2 transform -translate-x-1/2 border-l-transparent border-r-transparent border-t-transparent border-b-gruvbox-dark-bg2';
      case 'left':
        return 'left-full top-1/2 transform -translate-y-1/2 border-t-transparent border-b-transparent border-r-transparent border-l-gruvbox-dark-bg2';
      case 'right':
        return 'right-full top-1/2 transform -translate-y-1/2 border-t-transparent border-b-transparent border-l-transparent border-r-gruvbox-dark-bg2';
      default:
        return '';
    }
  };

  return (
    <div 
      ref={triggerRef}
      className="relative inline-block w-full"
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip}
      onFocus={showTooltip}
      onBlur={hideTooltip}
    >
      {children}
      
      {isVisible && (
        <div
          ref={tooltipRef}
          className="absolute z-[9999] px-4 py-2 text-sm font-medium text-gruvbox-light-fg bg-gruvbox-dark-bg2 border border-gruvbox-dark-bg3 rounded-lg shadow-lg whitespace-nowrap text-center"
          style={{
            ...getTooltipPosition(),
            left: '50%',
            transform: 'translateX(-50%)'
          }}
        >
          {content}
          {/* Arrow */}
          <div 
            className={`absolute w-0 h-0 border-4 ${getArrowPosition()}`}
          />
        </div>
      )}
    </div>
  );
};
