export default function HeroSection({ title, paragraph }: any) {
    return (
        <section className="relative py-16 px-5 overflow-hidden mb-10">      
            {/* Floating orbs */}
            <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full opacity-20 blur-xl floating"></div>
            <div className="absolute top-40 right-20 w-48 h-48 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full opacity-15 blur-2xl floating" style={{animationDelay: '2s'}}></div>
            <div className="absolute bottom-20 left-1/3 w-24 h-24 bg-gradient-to-br from-pink-400 to-blue-400 rounded-full opacity-25 blur-xl floating" style={{animationDelay: '4s'}}></div>
            
            <div className="relative z-10 max-w-4xl mx-auto text-center">
                <h1 className="text-6xl md:text-7xl lg:text-8xl font-extrabold mb-8 leading-tight">
                    <span className="gradient-text block">
                        {title}
                    </span>
                </h1>
                
                <div className="relative">
                    <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
                        {paragraph}
                    </p>
                    
                    {/* Decorative line */}
                    <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto mt-8 rounded-full"></div>
                </div>
                
                {/* Subtle animation indicators */}
                <div className="flex justify-center items-center mt-12 space-x-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
                    <div className="w-2 h-2 bg-pink-500 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
                </div>
            </div>
        </section>
    );
}