import DevCard from "@/components/DevCard";

export default function Home() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center p-6 overflow-hidden">
      {/* Background gradient blobs */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {/* Top-left cyan glow */}
        <div className="absolute -top-1/4 -left-1/4 w-1/2 h-1/2 rounded-full bg-cyan-500/20 blur-[120px] animate-float" />
        {/* Bottom-right purple glow */}
        <div
          className="absolute -bottom-1/4 -right-1/4 w-1/2 h-1/2 rounded-full bg-purple-500/20 blur-[120px] animate-float"
          style={{ animationDelay: "-3s" }}
        />
        {/* Center pink glow */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/3 h-1/3 rounded-full bg-pink-500/10 blur-[100px] animate-pulse-slow"
        />
      </div>

      {/* DevCard Component */}
      <DevCard
        name="Orhan Unuszade"
        role="Senior Frontend Engineer"
        avatarUrl=""
        isAvailable={true}
        techStack={[
          "React",
          "Next.js",
          "TypeScript",
          "Tailwind CSS",
          "Node.js",
          "PostgreSQL",
        ]}
        stats={{
          performance: 98,
          seo: 100,
          experience: 5,
        }}
        links={{
          github: "https://github.com/orhanunuszade",
          telegram: "https://t.me/orhanunuszade",
          portfolio: "https://orhanunuszade.dev",
          email: "hello@orhanunuszade.dev",
        }}
      />

      {/* Footer attribution */}
      <p className="absolute bottom-6 text-center text-[11px] font-mono text-neutral-600">
        Built with{" "}
        <span className="text-cyan-500/60">Next.js</span>
        {" "}·{" "}
        <span className="text-purple-500/60">TypeScript</span>
        {" "}·{" "}
        <span className="text-pink-500/60">Tailwind CSS</span>
      </p>
    </main>
  );
}
