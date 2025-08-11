import { ModeToggle } from "./mode-toggle";

export default function Header({ children }: any) {
  return (
    <header className="relative z-10 p-6 bg-gradient-to-r from-transparent via-white/10 to-transparent backdrop-blur-sm border-b border-white/20">
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          {/* Left: Logo and Title */}
          <div className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
              <span className="text-white font-bold text-lg">F</span>
            </div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-400 dark:to-blue-400 bg-clip-text text-transparent hover:scale-105 transition-transform duration-300 cursor-default">
              FlashCards
            </h2>
          </div>

          {/* Right: Dark Mode Toggle */}
          <div className="transform hover:scale-110 transition-transform duration-300">
            <ModeToggle />
          </div>
        </div>

        {/* Center: Navigation */}
        <nav className="flex gap-4 justify-center mt-3 md:mt-4">
          <div className="flex gap-3 p-2 rounded-2xl bg-white/10 dark:bg-black/20 backdrop-blur-sm border border-white/20 dark:border-white/10 shadow-lg">
            {children}
          </div>
        </nav>
      </div>
    </header>
  );
}
