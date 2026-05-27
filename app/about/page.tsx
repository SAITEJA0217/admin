
const values = [
  {
    title: "Founder-First Thinking",
    description:
      "We build tools that reduce noise and accelerate the path from idea to execution.",
  },
  {
    title: "High-Trust Collaboration",
    description:
      "Investors, manufacturers, and founders work from shared context, not fragmented messages.",
  },
  {
    title: "Practical Velocity",
    description:
      "We prioritize shipping, validation, and measurable progress over vanity milestones.",
  },
];

const milestones = [
  {
    year: "2024",
    title: "The Gap Became Obvious",
    detail:
      "We saw early-stage teams lose months finding reliable manufacturing and capital partners.",
  },
  {
    year: "2025",
    title: "Venture Launcher Prototype",
    detail:
      "The first version proved that one trusted network can replace disconnected startup workflows.",
  },
  {
    year: "2026",
    title: "Unified Growth Platform",
    detail:
      "We are scaling a single ecosystem where ideas can be built, funded, and launched faster.",
  },
];

const metrics = [
  { value: "3x", label: "faster partner discovery" },
  { value: "60%", label: "shorter fundraising prep" },
  { value: "24/7", label: "global collaboration window" },
  { value: "1", label: "connected venture ecosystem" },
];

export default function AboutPage() {
  return (
    <section className="relative isolate overflow-hidden py-16 md:py-24">
      <div className="pointer-events-none absolute -left-24 top-10 h-64 w-64 rounded-full bg-cyan-500/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 bottom-10 h-72 w-72 rounded-full bg-green-400/15 blur-3xl" />

      <div className="mx-auto flex w-full max-w-6xl flex-col gap-20">
        <header className="relative rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900/80 via-slate-950/80 to-cyan-950/50 p-8 md:p-12">
          <p className="mb-4 inline-flex rounded-full border border-cyan-300/30 bg-cyan-400/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-200">
            About Venture Launcher
          </p>

          <h1 className="max-w-4xl text-4xl font-bold leading-tight text-white md:text-6xl">
            We help ambitious builders turn momentum into companies.
          </h1>

          <p className="mt-6 max-w-3xl text-base text-slate-300 md:text-lg">
            Venture Launcher brings founders, investors, and manufacturers into one coordinated space so teams can go from concept to market without losing time in disconnected systems.
          </p>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 md:grid-cols-4">
            {metrics.map((item) => (
              <div
                key={item.label}
                className="rounded-2xl border border-white/10 bg-white/5 p-4 transition duration-300 hover:-translate-y-1 hover:border-cyan-300/50"
              >
                <p className="text-3xl font-extrabold text-cyan-200">{item.value}</p>
                <p className="mt-1 text-sm uppercase tracking-[0.14em] text-slate-300">{item.label}</p>
              </div>
            ))}
          </div>
        </header>

        <section className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <article className="rounded-3xl border border-white/10 bg-slate-900/60 p-8 md:p-10">
            <h2 className="text-2xl font-bold text-white md:text-3xl">Our Mission</h2>
            <p className="mt-4 text-slate-300">
              We exist to remove friction from startup growth. Instead of juggling fragmented contacts, tools, and timelines, teams on Venture Launcher get one structured path to connect, execute, and scale.
            </p>
            <p className="mt-4 text-slate-300">
              The goal is simple: help builders spend less time coordinating and more time launching products people truly want.
            </p>
          </article>

          <article className="rounded-3xl border border-cyan-400/30 bg-cyan-950/20 p-8 md:p-10">
            <h2 className="text-2xl font-bold text-white md:text-3xl">What Makes Us Different</h2>
            <ul className="mt-5 space-y-3 text-slate-200">
              <li className="rounded-xl border border-white/10 bg-white/5 p-3">Single platform for founder, investor, and manufacturer alignment.</li>
              <li className="rounded-xl border border-white/10 bg-white/5 p-3">Decision-ready context for faster introductions and approvals.</li>
              <li className="rounded-xl border border-white/10 bg-white/5 p-3">A workflow designed for execution, not just networking.</li>
            </ul>
          </article>
        </section>

        <section>
          <h2 className="text-center text-2xl font-bold text-white md:text-3xl">Our Core Values</h2>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {values.map((value) => (
              <article
                key={value.title}
                className="group rounded-2xl border border-white/10 bg-slate-900/60 p-6 transition duration-300 hover:-translate-y-1 hover:border-green-300/50"
              >
                <h3 className="text-lg font-semibold text-white transition group-hover:text-green-200">{value.title}</h3>
                <p className="mt-3 text-sm text-slate-300">{value.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="rounded-3xl border border-white/10 bg-slate-900/60 p-8 md:p-10">
          <h2 className="text-2xl font-bold text-white md:text-3xl">How We Got Here</h2>
          <div className="mt-8 space-y-5">
            {milestones.map((milestone) => (
              <div key={milestone.year} className="grid gap-2 rounded-2xl border border-white/10 bg-black/20 p-5 md:grid-cols-[100px_1fr] md:gap-6">
                <p className="text-sm font-semibold uppercase tracking-[0.15em] text-cyan-200">{milestone.year}</p>
                <div>
                  <h3 className="text-lg font-semibold text-white">{milestone.title}</h3>
                  <p className="mt-2 text-sm text-slate-300">{milestone.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-3xl border border-green-300/30 bg-gradient-to-r from-green-900/30 to-cyan-900/30 p-8 text-center md:p-12">
          <h2 className="text-3xl font-bold text-white md:text-4xl">Build with the Right Partners</h2>
          <p className="mx-auto mt-4 max-w-2xl text-slate-200">
            Whether you are validating your first prototype or scaling production, Venture Launcher helps you connect with the people and systems that move your business forward.
          </p>
          <button className="mt-8 rounded-xl bg-green-400 px-7 py-3 font-semibold text-slate-950 transition duration-300 hover:-translate-y-0.5 hover:bg-green-300">
            Join Venture Launcher
          </button>
        </section>
      </div>
    </section>
  );
}
