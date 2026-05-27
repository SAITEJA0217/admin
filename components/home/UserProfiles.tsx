import Image from "next/image";
import founder from "../../public/homeImages/founder.png";
import investor from "../../public/homeImages/investor.png";
import manufacturer from "../../public/homeImages/manufacturer.png";

const UserProfiles = () => {
    const cardStyle =
        "flex-1 rounded-xl overflow-hidden bg-[#0f172a] border border-purple-900/40 flex flex-col transition hover:scale-[1.02] hover:-translate-y-1";

    const overlayStyle =
        "absolute bottom-0 left-0 w-full px-5 py-4 bg-gradient-to-t from-black/80 to-transparent";

    const buttonStyle =
        "mt-auto py-3 rounded-full bg-gradient-to-r from-purple-600 to-purple-400 text-white font-medium flex items-center justify-center gap-2 hover:from-purple-500 hover:to-purple-300 transition";

    return (
        <section className="flex items-center justify-center w-full min-h-screen bg-black text-white py-16 px-4 md:px-6 lg:px-8">

            <div className="w-full max-w-6xl mx-auto flex flex-col gap-12">

                {/* Heading */}
                <div className="max-w-2xl space-y-2">
                    <h1 className="text-3xl md:text-4xl font-bold leading-tight">
                        Built for every stage of your
                    </h1>
                    <h1 className="text-3xl md:text-4xl font-bold leading-tight">
                        startup journey
                    </h1>
                </div>

                {/* Cards */}
                <div className="flex flex-col md:flex-row gap-6">

                    {/* Founder */}
                    <div className={cardStyle}>
                        <div className="relative w-full h-[320px]">
                            <Image
                                src={founder}
                                alt="Founder"
                                fill
                                className="object-cover"
                            />

                            <div className={overlayStyle}>
                                <h2 className="text-lg font-semibold">Founder</h2>
                                <p className="text-sm text-white/70">
                                    Raise smarter, faster
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-col gap-4 px-5 py-5 flex-1">
                            <p className="text-sm text-white/80">
                                Get matched with the right investors, improve your pitch &
                                readiness, and access real opportunities.
                            </p>

                            <button className={buttonStyle}>
                                Join as Founder <span>→</span>
                            </button>
                        </div>
                    </div>

                    {/* Investor */}
                    <div className={cardStyle}>
                        <div className="relative w-full h-[320px]">
                            <Image
                                src={investor}
                                alt="Investor"
                                fill
                                className="object-cover"
                            />

                            <div className={overlayStyle}>
                                <h2 className="text-lg font-semibold">Investor</h2>
                                <p className="text-sm text-white/70">
                                    Discover high-quality startups
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-col gap-4 px-5 py-5 flex-1">
                            <p className="text-sm text-white/80">
                                Curated deal flow, save time with smart insights, and invest
                                with confidence.
                            </p>

                            <button className={buttonStyle}>
                                Join as Investor <span>→</span>
                            </button>
                        </div>
                    </div>

                    {/* Manufacturer */}
                    <div className={cardStyle}>
                        <div className="relative w-full h-[320px]">
                            <Image
                                src={manufacturer}
                                alt="Manufacturer"
                                fill
                                className="object-cover"
                            />

                            <div className={overlayStyle}>
                                <h2 className="text-lg font-semibold">Manufacturers</h2>
                                <p className="text-sm text-white/70">
                                    Find real business opportunities
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-col gap-4 px-5 py-5 flex-1">
                            <p className="text-sm text-white/80">
                                Connect with startups & brands, get verified leads, and scale
                                your production.
                            </p>

                            <button className={buttonStyle}>
                                Join as Manufacturer <span>→</span>
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default UserProfiles;
