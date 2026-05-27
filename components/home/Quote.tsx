import bgImage from "../../public/homeImages/quoteBg.png"

const Quote = () => {
    const gradientText = "bg-gradient-to-r from-purple-400 to-white bg-clip-text text-transparent font-normal";

    return (
        <section className="w-screen min-h-screen flex items-center justify-self-center">

            <div className="min-h-[70vh]  min-w-screen flex items-center justify-center text-center bg-black bg-cover bg-center"
                style={{ backgroundImage: `url(${bgImage.src})` }}>

                <div className="flex flex-col gap-9">
                    <h1 className="text-6xl font-bold ">
                        The Sky is the limit.
                    </h1>

                    <div className="flex flex-col gap-2">
                        <p className={gradientText}>
                            We help great ideas find the people who believe in them.
                        </p>

                        <p className={gradientText}>
                            Smart matching, real opportunities, faster growth.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Quote
