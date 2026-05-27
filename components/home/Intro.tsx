import Image from "next/image";
import image from "../../public/homeImages/intro.png";

const Intro = () => {
    const pStyle = "font-thin text-sm text-[var(--text-primary)]";
    const h1Style = "font-normal text-2xl md:text-3xl";
    const divStyle = "flex flex-col gap-3 text-[var(--text-primary)]";

    return (
<section className="min-h-screen flex w-full items-center justify-center bg-black px-4 md:px-8 lg:px-12">
            <div className="w-[80%] max-w-6xl flex flex-col gap-12">

                {/* Heading */}
                <h1 className="font-bold text-3xl md:text-4xl text-white">
                    Meet Venture Launcher
                </h1>

                {/* Content */}
                <div className="flex flex-col lg:flex-row items-center justify-between gap-10">

                    {/* Image */}
                    <div className="relative h-[300px] w-full max-w-[500px] lg:h-[400px]">
                        <Image
                            src={image}
                            alt="Intro Image"
                            fill
                            className="object-cover rounded-xl shadow-lg border border-white/10"
                        />
                    </div>

                    {/* Text Content */}
                    <div className="flex flex-col justify-between gap-8 w-full lg:w-[50%]">

                        <div className={divStyle}>
                            <h2 className={h1Style}>Get matched, not ignored</h2>
                            <p className={pStyle}>
                                We connect you with investors who actually align with your stage, sector, and ambition so that you can skip cold emails. Focus on scaling while we find your right backers.
                            </p>
                        </div>

                        <div className={divStyle}>
                            <h2 className={h1Style}>Invest with confidence</h2>
                            <p className={pStyle}>
                                Back founders who match your vision, backed by real data insights. No noise. Only startups that fit your investment DNA.
                            </p>
                        </div>

                        <div className={divStyle}>
                            <h2 className={h1Style}>Collaborate & grow</h2>
                            <p className={pStyle}>
                                Get matched with startups that need your infrastructure and expertise. Then turn ideas into real products through strategic partnerships.
                            </p>
                        </div>

                    </div>
                </div>

            </div>
        </section>
    );
};

export default Intro;
