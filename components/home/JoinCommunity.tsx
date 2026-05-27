import { Users, Calendar, Layers } from "lucide-react";

const container = "w-full max-w-6xl mx-auto px-4 md:px-6 lg:px-8";

const iconWrapper =
    "w-14 h-14 flex items-center justify-center rounded-full border border-purple-500/40 text-purple-400";

const cardStyle =
    "flex flex-col items-center text-center gap-3 max-w-xs";

const JoinCommunity = () => {
    return (
        <section className="w-full min-h-screen bg-black text-white flex items-center justify-center py-20">

            <div className={`${container} flex flex-col items-center gap-20 md:gap-24`}>

                {/* Heading */}
                <div className="text-center flex flex-col gap-3">
                    <h1 className="text-3xl md:text-4xl font-bold">
                        Join our community
                    </h1>
                    <p className="text-white/60 text-sm md:text-base">
                        “Learn, Share, and Grow with the Ecosystem”
                    </p>
                </div>

                {/* Features */}
                <div className="w-full flex flex-col md:flex-row items-center justify-between gap-12">

                    {/* Active Discussions */}
                    <div className={cardStyle}>
                        <div className={iconWrapper}>
                            <Users size={22} />
                        </div>

                        <h2 className="text-lg font-semibold">
                            Active Discussions
                        </h2>

                        <p className="text-white/60 text-sm">
                            Ask questions, get answers from real founders & investors
                        </p>
                    </div>

                    {/* Upcoming Events */}
                    <div className={cardStyle}>
                        <div className={iconWrapper}>
                            <Calendar size={22} />
                        </div>

                        <h2 className="text-lg font-semibold">
                            Upcoming Events
                        </h2>

                        <p className="text-white/60 text-sm">
                            Join networking opportunities with industry leaders and peers
                        </p>
                    </div>

                    {/* Resource Library */}
                    <div className={cardStyle}>
                        <div className={iconWrapper}>
                            <Layers size={22} />
                        </div>

                        <h2 className="text-lg font-semibold">
                            Resource Library
                        </h2>

                        <p className="text-white/60 text-sm">
                            Access guides, playbooks, and expert advice
                        </p>
                    </div>

                </div>

                {/* Input + Button */}
                <div className="w-full px-4  flex justify-center  rounded mt-10"  >
                    <div className="flex items-center w-full max-w-xl bg-white/5 border border-white/10 rounded-xl px-2 py-2 md:py-3 focus-within:ring-1 focus-within:ring-purple-500/40">

                        <input
                            type="email"
                            placeholder="Enter your mail address"
                            className="flex-1 bg-transparent outline-none px-4 py-3 md:py-4 text-sm text-white placeholder:text-white/40"
                        />

                        <button className="px-5 py-3 md:py-2 rounded border border-purple-400 text-purple-300 hover:bg-purple-500/10 transition flex items-center gap-2">
                            Join the community <span>→</span>
                        </button>

                    </div>
                </div>

            </div>
        </section>
    );
};

export default JoinCommunity;
