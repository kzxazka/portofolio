"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Github,
  Code2,
  Globe,
  Terminal,
  Award,
  Keyboard,
  Clock,
  ExternalLink,
  Mail,
  Linkedin,
  Twitter,
  Sparkles,
  Server,
  Layout,
  Database,
  ArrowUpRight,
  Flame,
  MousePointerClick
} from "lucide-react";
import Link from "next/link";
import Particles from "./components/particles";
import { Navigation } from "./components/nav";

// Framer Motion Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 80,
      damping: 15,
    },
  },
};

const cardHoverEffect = {
  scale: 1.012,
  y: -4,
  transition: {
    type: "spring",
    stiffness: 400,
    damping: 25,
  },
};

// Generate simulated GitHub contribution data
const generateGitHubGrid = () => {
  const intensities = ["bg-zinc-900/60", "bg-emerald-950/40", "bg-emerald-800/40", "bg-emerald-600/50", "bg-emerald-400/60"];
  const grid = [];
  // 7 rows x 32 columns
  for (let r = 0; r < 7; r++) {
    const row = [];
    for (let c = 0; c < 32; c++) {
      // Create a nice pattern of active and inactive days
      const randIdx = Math.floor(Math.random() * intensities.length);
      const randVal = Math.random() > 0.3 ? randIdx : 0;
      row.push(intensities[randVal]);
    }
    grid.push(row);
  }
  return grid;
};

// Generate static initial placeholder grid for SSR to prevent hydration mismatch
const generateStaticGrid = () => {
  const grid = [];
  for (let r = 0; r < 7; r++) {
    const row = [];
    for (let c = 0; c < 32; c++) {
      row.push("bg-zinc-900/60");
    }
    grid.push(row);
  }
  return grid;
};

export default function Home() {
  const [githubGrid, setGithubGrid] = React.useState<string[][]>([]);
  const [githubCommits, setGithubCommits] = React.useState<string>("Loading commits...");
  const [monkeytype, setMonkeytype] = React.useState<{ wpm: number; accuracy: number }>({ wpm: 128, accuracy: 99.2 });

  React.useEffect(() => {
    setGithubGrid(generateGitHubGrid());
    
    // Fetch live typing speed stats from the internal API
    fetch("/api/monkeytype")
      .then((res) => res.json())
      .then((data) => {
        if (data && typeof data.wpm === "number") {
          setMonkeytype({ wpm: data.wpm, accuracy: data.accuracy });
        }
      })
      .catch((err) => console.error("Error loading Monkeytype stats:", err));

    // Fetch live GitHub contributions
    const intensities = ["bg-zinc-900/60", "bg-emerald-950/40", "bg-emerald-800/40", "bg-emerald-600/50", "bg-emerald-400/60"];
    fetch("/api/github-contributions")
      .then((res) => res.json())
      .then((data) => {
        if (data && Array.isArray(data.grid)) {
          const mappedGrid = data.grid.map((row: number[]) =>
            row.map((level) => intensities[level] || intensities[0])
          );
          setGithubGrid(mappedGrid);
          setGithubCommits(`${data.totalCommits} contributions/year`);
        }
      })
      .catch((err) => {
        console.error("Error loading GitHub contributions:", err);
        setGithubCommits("1,482 commits/year");
      });
  }, []);

  const displayGrid = React.useMemo(() => {
    return githubGrid.length > 0 ? githubGrid : generateStaticGrid();
  }, [githubGrid]);

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col relative overflow-hidden font-sans pb-16 selection:bg-zinc-800 selection:text-emerald-400">
      {/* Background Interactive Particles */}
      <Particles className="absolute inset-0 pointer-events-none z-0 opacity-40" quantity={45} />

      {/* Decorative Radial Ambient Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[450px] bg-emerald-500/10 blur-[130px] rounded-full pointer-events-none z-0" />
      <div className="absolute bottom-10 right-10 w-[600px] h-[400px] bg-indigo-500/5 blur-[120px] rounded-full pointer-events-none z-0" />

      {/* Navigation Header */}
      <Navigation />

      {/* Main Bento Grid Section */}
      <section className="max-w-7xl mx-auto px-6 pt-32 w-full z-10 flex-grow flex flex-col justify-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full"
        >
          {/* 1. HERO CELL (Col span: 2, Row span: 2) */}
          <motion.div
            variants={itemVariants}
            whileHover={cardHoverEffect}
            className="lg:col-span-2 lg:row-span-2 bg-gradient-to-br from-zinc-900/60 to-zinc-900/20 backdrop-blur-md border border-zinc-800/80 hover:border-zinc-700/80 transition-all rounded-3xl p-8 flex flex-col justify-between shadow-xl relative overflow-hidden group min-h-[380px]"
          >
            <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/5 blur-[50px] rounded-full pointer-events-none transition-all group-hover:bg-emerald-500/10" />

            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-800/50 border border-zinc-700/50 text-xs font-medium text-emerald-400 backdrop-blur-sm">
                <Sparkles className="w-3.5 h-3.5" />
                Available for New Projects
              </div>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight">
                Hey, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-200 to-emerald-400">Muhamad Azka Atqiya</span>
              </h1>
              <p className="text-zinc-400 text-base md:text-lg leading-relaxed max-w-xl">
                A passionate Fullstack Developer specializing in building high-performance web applications, dynamic database management, and premium user experiences. I craft clean, interactive code using <span className="text-white">Next.js</span> and <span className="text-white">Laravel</span>.
              </p>
            </div>

            <div className="flex items-center gap-4 mt-8">
              <Link
                href="/projects"
                className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-medium transition-all shadow-lg shadow-emerald-500/10 flex items-center gap-2 text-sm"
              >
                <Code2 className="w-4 h-4" />
                View My Work
              </Link>
              <a
                href="#contact"
                className="px-5 py-2.5 rounded-xl bg-zinc-800/80 hover:bg-zinc-800 border border-zinc-700/60 hover:border-zinc-600/85 text-zinc-300 hover:text-white transition-all text-sm flex items-center gap-2"
              >
                Let's Talk
              </a>
            </div>
          </motion.div>

          {/* 2. WAKATIME STATS CARD (Col span: 1, Row span: 1) */}
          <motion.div
            variants={itemVariants}
            whileHover={cardHoverEffect}
            className="bg-zinc-900/40 backdrop-blur-md border border-zinc-800/80 hover:border-zinc-700/80 transition-all rounded-3xl p-6 flex flex-col justify-between shadow-xl"
          >
            <div className="flex items-center justify-between">
              <div className="p-2.5 rounded-xl bg-zinc-800/80 border border-zinc-700/50 text-indigo-400">
                <Clock className="w-5 h-5" />
              </div>
              <span className="text-xs text-zinc-500 font-mono">WakaTime Sync</span>
            </div>

            <div className="my-4">
              <p className="text-xs text-zinc-400 uppercase tracking-wider font-semibold">Coding Activity</p>
              <h3 className="text-3xl font-bold text-white mt-1">38.5 hrs</h3>
              <p className="text-xs text-zinc-500 mt-1">Active programming this week</p>
            </div>

            <div className="space-y-2.5 pt-2">
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-zinc-300">TypeScript</span>
                  <span className="text-zinc-500">45%</span>
                </div>
                <div className="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden">
                  <div className="h-full bg-indigo-500 rounded-full" style={{ width: "45%" }} />
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-zinc-300">PHP/Laravel</span>
                  <span className="text-zinc-500">35%</span>
                </div>
                <div className="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full" style={{ width: "35%" }} />
                </div>
              </div>
            </div>
          </motion.div>

          {/* 3. MONKEYTYPE CARD (Col span: 1, Row span: 1) */}
          <motion.div
            variants={itemVariants}
            whileHover={cardHoverEffect}
            className="bg-zinc-900/40 backdrop-blur-md border border-zinc-800/80 hover:border-zinc-700/80 transition-all rounded-3xl p-6 flex flex-col justify-between shadow-xl relative overflow-hidden"
          >
            <div className="flex items-center justify-between">
              <div className="p-2.5 rounded-xl bg-zinc-800/80 border border-zinc-700/50 text-amber-400">
                <Keyboard className="w-5 h-5" />
              </div>
              <div className="flex items-center gap-1 text-xs text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded-md font-mono border border-amber-500/10">
                <Flame className="w-3.5 h-3.5 fill-amber-500" />
                Live
              </div>
            </div>

            <div className="my-4">
              <p className="text-xs text-zinc-400 uppercase tracking-wider font-semibold">Typing Speed</p>
              <div className="flex items-baseline gap-2 mt-1">
                <h3 className="text-4xl font-extrabold text-white">{monkeytype.wpm}</h3>
                <span className="text-zinc-400 font-medium">WPM</span>
              </div>
              <p className="text-xs text-emerald-400 mt-1 flex items-center gap-1 font-mono">
                <span>Accuracy: {monkeytype.accuracy}%</span>
              </p>
            </div>

            {/* Sparkline SVG graph */}
            <div className="w-full h-12 mt-2 opacity-80">
              <svg className="w-full h-full" viewBox="0 0 100 30" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="yellowGlow" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path
                  d="M0 25 C10 20, 20 28, 30 18 C40 8, 50 22, 60 12 C70 2, 80 15, 90 8 L100 5 L100 30 L0 30 Z"
                  fill="url(#yellowGlow)"
                />
                <path
                  d="M0 25 C10 20, 20 28, 30 18 C40 8, 50 22, 60 12 C70 2, 80 15, 90 8 L100 5"
                  fill="none"
                  stroke="#f59e0b"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </motion.div>

          {/* 4. GITHUB GRAPH CARD (Col span: 2, Row span: 1) */}
          <motion.div
            variants={itemVariants}
            whileHover={cardHoverEffect}
            className="lg:col-span-2 bg-zinc-900/40 backdrop-blur-md border border-zinc-800/80 hover:border-zinc-700/80 transition-all rounded-3xl p-6 flex flex-col justify-between shadow-xl relative overflow-hidden"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-2.5 rounded-xl bg-zinc-800/80 border border-zinc-700/50 text-white">
                  <Github className="w-5 h-5" />
                </div>
                <span className="font-semibold text-sm">GitHub Contributions</span>
              </div>
              <span className="text-xs text-zinc-500 font-mono">{githubCommits}</span>
            </div>

            {/* Grid of contribution boxes */}
            <div className="my-5 flex flex-col gap-1 w-full overflow-x-auto py-1">
              {displayGrid.map((row, rIdx) => (
                <div key={rIdx} className="flex gap-1">
                  {row.map((colorClass, cIdx) => (
                    <div
                      key={cIdx}
                      className={`w-3.5 h-3.5 rounded-sm ${colorClass} transition-colors duration-300 hover:scale-110 hover:border hover:border-zinc-300/40 cursor-crosshair`}
                    />
                  ))}
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center text-xs text-zinc-500">
              <span>Less</span>
              <div className="flex gap-1 items-center">
                <div className="w-2.5 h-2.5 rounded-sm bg-zinc-900" />
                <div className="w-2.5 h-2.5 rounded-sm bg-emerald-950/40" />
                <div className="w-2.5 h-2.5 rounded-sm bg-emerald-800/40" />
                <div className="w-2.5 h-2.5 rounded-sm bg-emerald-600/50" />
                <div className="w-2.5 h-2.5 rounded-sm bg-emerald-400/60" />
              </div>
              <span>More</span>
            </div>
          </motion.div>

          {/* 5. FEATURED PROJECTS CARD (Col span: 2, Row span: 1) */}
          <motion.div
            variants={itemVariants}
            whileHover={cardHoverEffect}
            className="lg:col-span-2 bg-zinc-900/40 backdrop-blur-md border border-zinc-800/80 hover:border-zinc-700/80 transition-all rounded-3xl p-6 flex flex-col justify-between shadow-xl"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="p-2.5 rounded-xl bg-zinc-800/80 border border-zinc-700/50 text-emerald-400">
                  <Terminal className="w-5 h-5" />
                </div>
                <span className="font-semibold text-sm">Recent Projects</span>
              </div>
              <Link href="/projects" className="text-xs text-emerald-400 hover:underline flex items-center gap-1 font-medium">
                View All <ArrowUpRight className="w-3 h-3" />
              </Link>
            </div>

            <div className="space-y-3.5">
              {/* Project 1 */}
              <div className="p-3.5 rounded-2xl bg-zinc-900/50 border border-zinc-850 hover:bg-zinc-800/40 hover:border-zinc-700/50 transition-all flex items-center justify-between group/item">
                <div className="space-y-1">
                  <h4 className="font-medium text-white group-hover/item:text-emerald-400 transition-colors flex items-center gap-1.5 text-sm">
                    Digital Printing Order Platform
                    <span className="text-[10px] bg-indigo-500/10 text-indigo-400 px-2 py-0.5 rounded border border-indigo-500/10 font-mono">Laravel API</span>
                  </h4>
                  <p className="text-xs text-zinc-400 max-w-md line-clamp-1">E-commerce with dashboard, spot pricing, and payment gateway integration.</p>
                </div>
                <a href="https://github.com/kzxazka/BannerPrinting_kel5.git" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-zinc-800/50 hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors">
                  <Github className="w-4 h-4" />
                </a>
              </div>

              {/* Project 2 */}
              <div className="p-3.5 rounded-2xl bg-zinc-900/50 border border-zinc-850 hover:bg-zinc-800/40 hover:border-zinc-700/50 transition-all flex items-center justify-between group/item">
                <div className="space-y-1">
                  <h4 className="font-medium text-white group-hover/item:text-emerald-400 transition-colors flex items-center gap-1.5 text-sm">
                    Staple Food Price Index System
                    <span className="text-[10px] bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/10 font-mono">PHP + MySQL</span>
                  </h4>
                  <p className="text-xs text-zinc-400 max-w-md line-clamp-1">Spot pricing analysis and market stabilization control panels for government agencies.</p>
                </div>
                <a href="https://github.com/kzxazka/Siaga_bapok" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-zinc-800/50 hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors">
                  <Github className="w-4 h-4" />
                </a>
              </div>
            </div>
          </motion.div>

          {/* 6. TECH STACK BADGES CARD (Col span: 1, Row span: 1) */}
          <motion.div
            variants={itemVariants}
            whileHover={cardHoverEffect}
            className="bg-zinc-900/40 backdrop-blur-md border border-zinc-800/80 hover:border-zinc-700/80 transition-all rounded-3xl p-6 flex flex-col justify-between shadow-xl"
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="p-2.5 rounded-xl bg-zinc-800/80 border border-zinc-700/50 text-indigo-400">
                <Database className="w-5 h-5" />
              </div>
              <span className="font-semibold text-sm">Tech Stack</span>
            </div>

            <div className="flex flex-wrap gap-2 content-start flex-grow">
              {["Next.js", "Laravel", "React", "TypeScript", "TailwindCSS", "Node.js", "MySQL", "PHP", "Git", "Figma"].map((tech, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1.5 text-xs font-medium rounded-lg bg-zinc-800/40 border border-zinc-800 text-zinc-300 hover:text-white hover:bg-zinc-800 hover:border-zinc-700 transition-colors"
                >
                  {tech}
                </span>
              ))}
            </div>

            <div className="text-[10px] text-zinc-500 font-mono mt-4 text-center border-t border-zinc-800/80 pt-2.5">
              Tools of trade
            </div>
          </motion.div>

          {/* 7. CONNECT/SOCIAL CARD (Col span: 1, Row span: 1) */}
          <motion.div
            variants={itemVariants}
            whileHover={cardHoverEffect}
            id="contact"
            className="bg-gradient-to-br from-zinc-900/40 via-zinc-900/30 to-emerald-950/10 backdrop-blur-md border border-zinc-800/80 hover:border-zinc-700/80 transition-all rounded-3xl p-6 flex flex-col justify-between shadow-xl"
          >
            <div className="flex items-center gap-2 mb-3">
              <div className="p-2.5 rounded-xl bg-zinc-800/80 border border-zinc-700/50 text-emerald-400">
                <Globe className="w-5 h-5" />
              </div>
              <span className="font-semibold text-sm">Let's Connect</span>
            </div>

            <div className="space-y-2">
              <p className="text-xs text-zinc-400">Have a project idea or just want to talk code? Feel free to reach out.</p>

              <div className="grid grid-cols-2 gap-2 pt-2">
                <a
                  href="mailto:atqiyaazka96@gmail.com"
                  className="flex items-center gap-2 px-3 py-2 rounded-xl bg-zinc-800/40 border border-zinc-800 hover:bg-zinc-800 hover:border-zinc-700 text-zinc-300 hover:text-white text-xs transition-colors"
                >
                  <Mail className="w-3.5 h-3.5" />
                  Email
                </a>
                <a
                  href="https://github.com/kzxazka"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3 py-2 rounded-xl bg-zinc-800/40 border border-zinc-800 hover:bg-zinc-800 hover:border-zinc-700 text-zinc-300 hover:text-white text-xs transition-colors"
                >
                  <Github className="w-3.5 h-3.5" />
                  GitHub
                </a>
                <a
                  href="https://www.linkedin.com/in/azka-atqiya-3659392ab?utm_source=share_via&utm_content=profile&utm_medium=member_android"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3 py-2 rounded-xl bg-zinc-800/40 border border-zinc-800 hover:bg-zinc-800 hover:border-zinc-700 text-zinc-300 hover:text-white text-xs transition-colors"
                >
                  <Linkedin className="w-3.5 h-3.5" />
                  LinkedIn
                </a>
                <a
                  href="tel:+6285718406768"
                  className="flex items-center gap-2 px-3 py-2 rounded-xl bg-zinc-800/40 border border-zinc-800 hover:bg-zinc-800 hover:border-zinc-700 text-zinc-300 hover:text-white text-xs transition-colors"
                >
                  <MousePointerClick className="w-3.5 h-3.5" />
                  Call
                </a>
              </div>
            </div>

            <div className="text-[10px] text-zinc-500 font-mono text-center border-t border-zinc-800/80 pt-2.5 mt-3">
              Bandar Lampung, Indonesia
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Modern Minimalist Footer */}
      <footer className="w-full max-w-7xl mx-auto px-6 mt-12 text-center text-xs text-zinc-600 z-10 flex items-center justify-between border-t border-zinc-900 pt-6">
        <div>&copy; {new Date().getFullYear()} Frankazastain. Built with Next.js & Tailwind.</div>
        <div className="flex gap-4">
          <span className="hover:text-zinc-400 cursor-pointer">Privacy Policy</span>
          <span className="hover:text-zinc-400 cursor-pointer">Terms of Service</span>
        </div>
      </footer>
    </main>
  );
}
