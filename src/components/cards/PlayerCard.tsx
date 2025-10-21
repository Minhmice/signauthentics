import * as React from "react";
import Image from "next/image";

type PlayerCardProps = {
  src: string; // path under public, e.g. /PlayerImages/foo.jpg
  name?: string;
  position?: string;
  club?: string;
  number?: string;
  className?: string;
};

export function PlayerCard({ 
  src, 
  name = "Player Name", 
  position = "HẬU VỆ",
  club = "Club Name",
  number = "10",
  className = ""
}: PlayerCardProps) {
  return (
    <div className={`group relative w-64 h-80 rounded-2xl overflow-hidden bg-gradient-to-br from-zinc-800 to-zinc-900 border border-zinc-700 hover:border-zinc-500 transition-all duration-300 hover:scale-105 hover:shadow-2xl ${className}`}>
      {/* Player Image */}
      <div className="relative w-full h-48 overflow-hidden">
        <Image 
          src={src} 
          alt={name} 
          fill 
          sizes="(max-width:768px) 50vw, 256px" 
          className="object-cover group-hover:scale-110 transition-transform duration-500" 
        />
        {/* Player Number Overlay */}
        <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-sm rounded-full w-12 h-12 flex items-center justify-center">
          <span className="text-white font-bold text-lg">{number}</span>
        </div>
        {/* Position Badge */}
        <div className="absolute top-4 right-4 bg-zinc-900/80 backdrop-blur-sm px-3 py-1 rounded-full">
          <span className="text-white text-xs font-medium">{position}</span>
        </div>
      </div>
      
      {/* Player Info */}
      <div className="p-4 space-y-2">
        <h3 className="text-white font-semibold text-lg line-clamp-1 group-hover:text-zinc-200 transition-colors">
          {name}
        </h3>
        <p className="text-zinc-400 text-sm line-clamp-1 group-hover:text-zinc-300 transition-colors">
          {club}
        </p>
      </div>
      
      {/* Hover Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </div>
  );
}

export default PlayerCard;


