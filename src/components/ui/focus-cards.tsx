"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";

interface CardProps {
  title: string;
  content: string;
}

export const Card = React.memo(
  ({
    card,
    index,
    hovered,
    setHovered,
  }: {
    card: CardProps;
    index: number;
    hovered: number | null;
    setHovered: React.Dispatch<React.SetStateAction<number | null>>;
  }) => (
    <div
      onMouseEnter={() => setHovered(index)}
      onMouseLeave={() => setHovered(null)}
      className={cn(
        "rounded-xl relative bg-neutral-900/50 border border-white/[0.1] overflow-hidden h-40 w-full transition-all duration-300 ease-out p-6 group hover:border-blue-500/20",
        hovered !== null && hovered !== index && "opacity-50 blur-[2px] scale-[0.95]"
      )}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <div className="relative z-10 h-full flex flex-col justify-between">
        <div>
          <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors">
            {card.title}
          </h3>
          <p className="text-sm text-white/70 line-clamp-2 group-hover:line-clamp-none transition-all">
            {card.content}
          </p>
        </div>
        
        <div className="flex items-center space-x-2 text-white/50 text-xs opacity-0 group-hover:opacity-100 transition-opacity pt-2 border-t border-white/[0.1]">
          <span className="group-hover:text-blue-400">Learn more</span>
          <svg
            className="w-4 h-4 group-hover:translate-x-1 transition-transform"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>
      </div>
    </div>
  )
);

Card.displayName = "Card";

export function FocusCards({ cards }: { cards: CardProps[] }) {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto md:px-8 w-full">
      {cards.map((card, index) => (
        <Card
          key={card.title}
          card={card}
          index={index}
          hovered={hovered}
          setHovered={setHovered}
        />
      ))}
    </div>
  );
}

