import { ModeToggle } from "./mode-toggle";

export default function Header({ children }: any) {
  return (
    <header className="p-5">
        <div className="container mx-auto">
            <div className="flex items-center justify-between">
                {/* Left: Logo and Title */}
                <div className="flex items-center gap-2">
                    <h2 className="text-lg font-semibold">FlashCards</h2>
                </div>

                {/* Right: Dark Mode Toggle */}
                <ModeToggle />
            </div>

            {/* Center: Navigation (appears at bottom on small screens) */}
            <nav className="flex gap-3 justify-center sm:mt-2 md:mt-[-2em]">
                {children}
            </nav>
        </div>
    </header>
  );
}
