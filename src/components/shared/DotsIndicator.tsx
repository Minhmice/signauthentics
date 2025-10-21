/**
 * DotsIndicator - Pagination dots for carousels
 * Shows current position and allows navigation
 */

type DotsIndicatorProps = {
  total: number;
  current: number;
  onSelect: (index: number) => void;
  className?: string;
  size?: "sm" | "md" | "lg";
  showOnMobile?: boolean;
};

export function DotsIndicator({ 
  total, 
  current, 
  onSelect, 
  className = "",
  size = "md",
  showOnMobile = true 
}: DotsIndicatorProps) {
  const sizeClasses = {
    sm: "w-2 h-2",
    md: "w-2.5 h-2.5",
    lg: "w-3 h-3"
  };
  
  const visibilityClass = showOnMobile 
    ? "flex" 
    : "hidden md:flex";

  return (
    <div className={`${visibilityClass} items-center justify-center gap-0 ${className}`}>
      {Array.from({ length: total }).map((_, index) => (
        <button 
          key={index} 
          onClick={() => onSelect(index)} 
          className="p-1.5"
          aria-label={`Go to slide ${index + 1}`}
        >
          <span 
            className={`inline-block ${sizeClasses[size]} bg-white dark:bg-zinc-400 rounded-full transition-opacity ${
              current === index ? 'opacity-100' : 'opacity-30'
            }`} 
          />
        </button>
      ))}
    </div>
  );
}

