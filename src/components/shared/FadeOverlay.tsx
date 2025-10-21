/**
 * FadeOverlay - Gradient fade overlay for horizontal scrollers
 * Creates smooth fade effect on left/right edges
 */

type FadeOverlayProps = {
  width?: string;
  zIndex?: string;
};

export function FadeOverlay({ width = "w-8", zIndex = "z-20" }: FadeOverlayProps) {
  const baseClass = `absolute top-0 bottom-0 ${width} pointer-events-none ${zIndex}`;
  
  return (
    <>
      {/* Left fade */}
      <div 
        className={`${baseClass} left-0 bg-gradient-to-r from-white to-transparent dark:from-zinc-900 dark:to-transparent`}
      />
      {/* Right fade */}
      <div 
        className={`${baseClass} right-0 bg-gradient-to-l from-white to-transparent dark:from-zinc-900 dark:to-transparent`}
      />
    </>
  );
}

