import placeholderImage from "../../public/homeImages/placeholder.png";
import Image from "next/image";

const container = "w-full max-w-6xl mx-auto px-4 md:px-6 lg:px-8";

/*
  offsetY:
  negative = above curve
  positive = below curve
  values follow M-shape rhythm
*/
const avatars = [
    { left: "5%", size: 85, offsetY: -60 },
    { left: "15%", size: 75, offsetY: 40 },
    { left: "30%", size: 90, offsetY: -70 },
    { left: "50%", size: 110, offsetY: 50 },
    { left: "70%", size: 90, offsetY: -70 },
    { left: "85%", size: 80, offsetY: 45 },
    { left: "95%", size: 70, offsetY: -50 },
];

const Testimonilals = () => {
    return (
        <section className="w-full min-h-screen bg-black text-white flex items-center justify-center py-20 overflow-hidden">

            <div className={`${container} flex flex-col items-center gap-16`}>

                {/* Heading */}
                <div className="text-center flex flex-col gap-3">
                    <h1 className="text-3xl md:text-4xl font-bold">
                        Trusted by Growing Startups <br /> & Investors
                    </h1>
                    <p className="text-white/60 text-sm md:text-base">
                        Helping founders connect with the right investors faster.
                    </p>
                </div>

                {/* Visual Area */}
                <div className="relative w-full h-[500px]">

                    {/* M SHAPE CURVE */}
                    <svg
                        className="absolute inset-0 w-full h-full drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]"
                        viewBox="0 0 1000 300"
                        fill="none"
                    >
                        <path
                            d="
                            M0 150
                            Q 125 0 250 150
                            T 500 150
                            T 750 150
                            T 1000 150
                            "
                            stroke="white"
                            strokeOpacity="0.7"
                            strokeWidth="3.5"
                            strokeDasharray="6 8"
                            fill="none"
                        />
                    </svg>

                    {/* Avatars aligned to curve */}
                    {avatars.map((avatar, i) => (
                        <div
                            key={i}
                            className="absolute rounded-full overflow-hidden border border-white/10 shadow-[0_0_20px_rgba(255,255,255,0.1)]"
                            style={{
                                top: "50%",
                                left: avatar.left,
                                transform: `translate(-50%, -50%) translateY(${avatar.offsetY}px)`,
                                width: avatar.size,
                                height: avatar.size,
                            }}
                        >
                            <Image
                                src={placeholderImage}
                                alt="User"
                                width={avatar.size}
                                height={avatar.size}
                                className="object-cover"
                            />
                        </div>
                    ))}

                </div>

            </div>
        </section>
    );
};

export default Testimonilals;
