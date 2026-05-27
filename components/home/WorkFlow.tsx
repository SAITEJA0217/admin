
import { User, Settings, Maximize2 } from "lucide-react";

const stepStyle = "flex flex-col items-center text-center gap-3 max-w-xs";
const iconStyle =
    "w-12 h-12 flex items-center justify-center rounded-full border border-white/20 text-white/70";

const WorkFlow = () => {
    return (
        <section className="w-full min-h-screen bg-black text-white flex items-center justify-center py-20">

            <div className="w-full max-w-6xl mx-auto px-4 md:px-6 lg:px-8 flex flex-col items-center gap-20">

                {/* Heading */}
                <div className="text-center flex flex-col gap-3">
                    <h1 className="text-3xl md:text-4xl font-bold">
                        How We Work
                    </h1>
                    <p className="text-white/60 text-sm md:text-base">
                        Simple steps to engage and grow your business.
                    </p>
                </div>

                {/* Step 1 (center) */}
                <div className={stepStyle}>
                    <div className={iconStyle}>
                        <User size={20} />
                    </div>

                    <h2 className="text-lg md:text-xl font-semibold text-white/90">
                        Step 1: Create Your Profile
                    </h2>

                    <p className="text-white/60 text-sm">
                        Tell us about your startup, investment focus, or capabilities.
                    </p>
                </div>

                {/* Bottom Steps */}
                <div className="w-full flex flex-col md:flex-row justify-between items-center gap-12">

                    {/* Step 3 (left) */}
                    <div className={stepStyle}>
                        <div className={iconStyle}>
                            <Maximize2 size={20} />
                        </div>

                        <h2 className="text-lg md:text-xl font-semibold text-white/90">
                            Step 3: Connect & Grow
                        </h2>

                        <p className="text-white/60 text-sm">
                            Start conversations, close deals, and scale faster.
                        </p>
                    </div>

                    {/* Step 2 (right) */}
                    <div className={stepStyle}>
                        <div className={iconStyle}>
                            <Settings size={20} />
                        </div>

                        <h2 className="text-lg md:text-xl font-semibold text-white/90">
                            Step 2: Get Smart Matches
                        </h2>

                        <p className="text-white/60 text-sm">
                            Our system connects you with the most relevant people.
                        </p>
                    </div>

                </div>

            </div>
        </section>
    );
};

export default WorkFlow;
