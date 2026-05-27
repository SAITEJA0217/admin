export default function Hero() {
    return (
        <section
            className="relative min-h-[90vh] flex items-center justify-center text-white px-4 bg-cover bg-center"
            style={{ backgroundImage: "url('/homeImages/heroBg.png')" }}
        >
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/60"></div>

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center gap-6 text-center max-w-4xl">

                <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                    Connect. Build. Fund. Scale.
                </h1>

                <p className="text-sm md:text-base lg:text-lg text-white/80">
                    The all-in-one platform where founders, investors, and manufacturers come together to turn ideas into successful businesses.
                </p>

                <button className="flex items-center justify-center gap-2 font-semibold rounded bg-purple-600 text-white px-6 py-3 md:px-8 md:py-4 hover:bg-purple-500 transition">
                    Start Your Journey <span className="text-lg md:text-xl">→</span>
                </button>

            </div>
        </section>
    );
}
