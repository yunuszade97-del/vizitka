"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Github,
  Send,
  Briefcase,
  Sparkles,
  Gauge,
  Search,
  Clock,
} from "lucide-react";

// =============================================================================
// TYPES & INTERFACES
// =============================================================================

interface DevCardProps {
  name: string;
  role: string;
  avatarUrl?: string;
  isAvailable?: boolean;
  techStack: string[];
  stats: {
    performance: number;
    seo: number;
    experience: number;
  };
  links: {
    github?: string;
    telegram?: string;
    portfolio?: string;
    email?: string;
  };
}

// =============================================================================
// SUBCOMPONENTS
// =============================================================================

/**
 * Avatar with gradient border and fallback
 */
function Avatar({
  src,
  name,
  isAvailable,
}: {
  src?: string;
  name: string;
  isAvailable?: boolean;
}) {
  const [hasError, setHasError] = useState(false);
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="relative">
      {/* Gradient border ring */}
      <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 opacity-75 blur-sm animate-pulse-slow" />
      <div className="relative w-24 h-24 rounded-full bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 p-[3px]">
        <div className="w-full h-full rounded-full bg-neutral-900 flex items-center justify-center overflow-hidden">
          {src && !hasError ? (
            <Image
              src={src}
              alt={name}
              width={96}
              height={96}
              className="w-full h-full object-cover rounded-full"
              onError={() => setHasError(true)}
            />
          ) : (
            <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
              {initials || "👨‍💻"}
            </span>
          )}
        </div>
      </div>

      {/* Status indicator */}
      {isAvailable && (
        <div className="absolute -bottom-1 -right-1 flex items-center justify-center">
          <span className="absolute inline-flex h-4 w-4 rounded-full bg-emerald-400 opacity-75 animate-ping" />
          <span className="relative inline-flex h-4 w-4 rounded-full bg-emerald-500 border-2 border-neutral-900" />
        </div>
      )}
    </div>
  );
}

/**
 * Status badge with pulse animation
 */
function StatusBadge({ isAvailable }: { isAvailable: boolean }) {
  if (!isAvailable) return null;

  return (
    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30">
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
      </span>
      <span className="text-xs font-medium text-emerald-400 tracking-wide">
        Open to work
      </span>
    </div>
  );
}

/**
 * Technology chip/badge
 */
function TechChip({ tech }: { tech: string }) {
  return (
    <span className="inline-flex items-center px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs font-mono text-neutral-300 hover:bg-white/10 hover:border-white/20 hover:text-white transition-all duration-200 cursor-default">
      {tech}
    </span>
  );
}

/**
 * Single stat block in Bento style
 */
function StatBlock({
  icon: Icon,
  label,
  value,
  suffix,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: number;
  suffix?: string;
}) {
  const getValueColor = (val: number, label: string) => {
    if (label === "Experience") return "text-cyan-400";
    if (val >= 95) return "text-emerald-400";
    if (val >= 80) return "text-yellow-400";
    return "text-orange-400";
  };

  return (
    <div className="group relative flex flex-col items-center justify-center p-4 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.06] hover:border-white/10 transition-all duration-300">
      {/* Glow effect on hover */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-cyan-500/0 to-purple-500/0 group-hover:from-cyan-500/5 group-hover:to-purple-500/5 transition-all duration-300" />

      <Icon className="w-5 h-5 text-neutral-500 mb-2 group-hover:text-neutral-400 transition-colors" />
      <span
        className={`text-2xl font-bold ${getValueColor(value, label)} tabular-nums`}
      >
        {value}
        {suffix}
      </span>
      <span className="text-[10px] font-medium text-neutral-500 uppercase tracking-wider mt-1">
        {label}
      </span>
    </div>
  );
}

/**
 * Primary CTA button
 */
function PrimaryButton({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      className="relative inline-flex items-center justify-center gap-2 w-full px-6 py-3 rounded-xl bg-white text-neutral-900 font-semibold text-sm tracking-wide overflow-hidden group transition-all duration-300 hover:shadow-[0_0_40px_rgba(255,255,255,0.15)]"
    >
      <span className="absolute inset-0 bg-gradient-to-r from-cyan-300 via-white to-purple-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <Briefcase className="relative w-4 h-4 group-hover:scale-110 transition-transform" />
      <span className="relative">{children}</span>
    </a>
  );
}

/**
 * Icon-only secondary button
 */
function IconButton({
  href,
  icon: Icon,
  label,
}: {
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="relative flex items-center justify-center w-12 h-12 rounded-xl bg-white/[0.05] border border-white/[0.08] text-neutral-400 hover:bg-white/[0.08] hover:border-white/15 hover:text-white hover:scale-105 active:scale-95 transition-all duration-200"
    >
      <Icon className="w-5 h-5" />
    </a>
  );
}

// =============================================================================
// MAIN COMPONENT
// =============================================================================

export default function DevCard({
  name,
  role,
  avatarUrl,
  isAvailable = true,
  techStack,
  stats,
  links,
}: DevCardProps) {
  return (
    <article className="relative w-full max-w-sm mx-auto group">
      {/* Background glow effects */}
      <div className="absolute -inset-px rounded-3xl bg-gradient-to-b from-white/[0.08] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-30 blur-2xl transition-all duration-700 pointer-events-none" />

      {/* Main card container */}
      <div className="relative flex flex-col gap-6 p-6 rounded-3xl bg-neutral-900/80 backdrop-blur-2xl border border-white/[0.06] shadow-2xl transition-all duration-300 group-hover:border-white/10 group-hover:shadow-[0_20px_70px_-15px_rgba(0,0,0,0.5)]">
        {/* ========= HEADER SECTION ========= */}
        <header className="flex flex-col items-center gap-4 pt-2">
          <Avatar src={avatarUrl} name={name} isAvailable={isAvailable} />

          <div className="flex flex-col items-center gap-2 text-center">
            <h1 className="text-xl font-bold tracking-tight text-white">
              {name}
            </h1>
            <p className="text-sm font-mono text-neutral-400">{role}</p>
          </div>

          <StatusBadge isAvailable={isAvailable} />
        </header>

        {/* Decorative divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        {/* ========= TECH STACK SECTION ========= */}
        <section aria-labelledby="tech-heading">
          <h2
            id="tech-heading"
            className="sr-only"
          >
            Technology Stack
          </h2>
          <div className="flex flex-wrap justify-center gap-2">
            {techStack.map((tech) => (
              <TechChip key={tech} tech={tech} />
            ))}
          </div>
        </section>

        {/* Decorative divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        {/* ========= STATS SECTION (Bento Grid) ========= */}
        <section
          className="grid grid-cols-3 gap-3"
          aria-labelledby="stats-heading"
        >
          <h2
            id="stats-heading"
            className="sr-only"
          >
            Performance Stats
          </h2>
          <StatBlock
            icon={Gauge}
            label="Performance"
            value={stats.performance}
          />
          <StatBlock icon={Search} label="SEO" value={stats.seo} />
          <StatBlock
            icon={Clock}
            label="Experience"
            value={stats.experience}
            suffix="+"
          />
        </section>

        {/* ========= FOOTER / ACTIONS ========= */}
        <footer className="flex flex-col gap-3">
          <PrimaryButton
            href={links.email ? `mailto:${links.email}` : links.portfolio || "#"}
          >
            Contact Me
          </PrimaryButton>

          <div className="flex justify-center gap-3">
            {links.github && (
              <IconButton
                href={links.github}
                icon={Github}
                label="GitHub Profile"
              />
            )}
            {links.telegram && (
              <IconButton
                href={links.telegram}
                icon={Send}
                label="Telegram"
              />
            )}
            {links.portfolio && (
              <IconButton
                href={links.portfolio}
                icon={Sparkles}
                label="Portfolio Website"
              />
            )}
          </div>
        </footer>

        {/* Subtle sparkle decoration */}
        <div className="absolute top-4 right-4 text-white/10 group-hover:text-white/20 transition-colors duration-300">
          <Sparkles className="w-4 h-4" />
        </div>
      </div>
    </article>
  );
}
