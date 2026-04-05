import { motion } from "motion/react";


export function Header({ title, theme = "dark" }: { title: string; theme?: "dark" | "light" }) {
  const isLight = theme === "light";
  
  return (
    <header className="flex items-center justify-between w-full px-12 py-6 shrink-0">
      {/* Intervue Logo */}
      <img
        src="/black_logo.svg"
        alt="Intervue"
        className="h-6 w-auto object-contain"
        style={{ filter: !isLight ? 'brightness(0) invert(1)' : 'brightness(0)' }}
      />

      {/* Slide Title */}
      <div className={`text-xs font-bold tracking-[0.2em] uppercase ${isLight ? "text-gray-500" : "text-gray-400"}`}>
        {title}
      </div>
    </header>
  );
}