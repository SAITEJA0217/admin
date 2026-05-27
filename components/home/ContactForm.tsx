
const container = "w-full max-w-6xl mx-auto px-4 md:px-6 lg:px-8";
const inputStyle =
    "w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder:text-white/40 outline-none focus:border-purple-400 transition";

const ContactForm = () => {
    return (
        <section className="w-full min-h-screen bg-black text-white flex items-center justify-center py-20">

            <div className={`${container} grid grid-cols-1 md:grid-cols-2 gap-16`}>

                {/* LEFT SIDE */}
                <div className="flex flex-col gap-6">

                    <h1 className="text-3xl md:text-4xl font-bold">
                        Get In-touch with us
                    </h1>

                    <p className="text-white/60 text-sm">
                        Have questions, feedback, or partnership ideas? We're here to help.
                    </p>

                    <div className="flex flex-col gap-4 text-white/70 text-sm">
                        <div>
                            <p className="text-white/50">Email:</p>
                            <p>venture_launcher@gmail.com</p>
                        </div>

                        <div>
                            <p className="text-white/50">Phone:</p>
                            <p>+0123456789</p>
                        </div>
                    </div>

                </div>

                {/* RIGHT SIDE (FORM) */}
                <form className="flex flex-col gap-6">

                    <input
                        type="text"
                        placeholder="Name"
                        className={inputStyle}
                    />

                    <input
                        type="email"
                        placeholder="E Mail"
                        className={inputStyle}
                    />

                    {/* RADIO GROUP */}
                    <div className="flex items-center gap-6 text-sm text-white/70">

                        <label className="flex items-center gap-2 cursor-pointer">
                            <input type="radio" name="role" className="accent-purple-500" />
                            Investor
                        </label>

                        <label className="flex items-center gap-2 cursor-pointer">
                            <input type="radio" name="role" className="accent-purple-500" />
                            Founder
                        </label>

                        <label className="flex items-center gap-2 cursor-pointer">
                            <input type="radio" name="role" className="accent-purple-500" />
                            Manufacturer
                        </label>

                    </div>

                    <textarea
                        placeholder="Message"
                        rows={5}
                        className={`${inputStyle} resize-none`}
                    />

                    <button
                        type="submit"
                        className="mt-2 w-full py-3 rounded-lg bg-gradient-to-r from-purple-500 to-purple-300 text-white font-medium hover:opacity-90 transition"
                    >
                        Send message
                    </button>

                </form>

            </div>
        </section>
    );
};

export default ContactForm;
