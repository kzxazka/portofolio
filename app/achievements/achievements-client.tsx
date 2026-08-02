"use client";

import React from "react";
import { motion } from "framer-motion";
import { Award, Calendar, ShieldCheck, Globe, Cpu, BookOpen, ArrowUpRight } from "lucide-react";
import { Navigation } from "../components/nav";
import { Card } from "../components/card";
import Particles from "../components/particles";

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
  scale: 1.015,
  y: -4,
  transition: {
    type: "spring",
    stiffness: 400,
    damping: 25,
  },
};

interface Certification {
  title: string;
  issuer: string;
  date: string;
  credentialId?: string;
  credentialUrl?: string;
  description: string;
  tags: string[];
}

const fallbackCertifications: Certification[] = [
  {
    title: "Advanced Laravel Certified Developer",
    issuer: "Laravel Core Team",
    date: "Dec 2025",
    credentialId: "LV-9831-2940",
    credentialUrl: "https://laravel.com",
    description: "Demonstrated advanced knowledge of Laravel core concepts, database optimization, query performance, routing architecture, and security protocols.",
    tags: ["Laravel", "PHP", "Security", "MySQL"]
  },
  {
    title: "AWS Certified Solutions Architect",
    issuer: "Amazon Web Services (AWS)",
    date: "Oct 2025",
    credentialId: "AWS-ARCH-9081",
    credentialUrl: "https://aws.amazon.com",
    description: "Validated technical expertise in designing and deploying secure and robust serverless architectures on AWS cloud hosting, utilizing ECS, Lambda, and RDS.",
    tags: ["AWS", "Cloud Architecture", "Serverless"]
  },
  {
    title: "Meta Front-End Developer Specialization",
    issuer: "Coursera / Meta",
    date: "Jun 2024",
    credentialId: "META-FED-7821",
    credentialUrl: "https://coursera.org",
    description: "Completed professional training covering React.js state management, modular CSS structures, semantic HTML layouts, and user experience interaction design.",
    tags: ["React", "CSS", "UI/UX", "JavaScript"]
  },
  {
    title: "EF SET English Certificate (C2 Proficient)",
    issuer: "EF Education First",
    date: "Jan 2025",
    credentialId: "EFSET-C2-9482",
    credentialUrl: "https://efset.org",
    description: "Scored 78/100 on the EF SET Standard English Test, corresponding to the highest C2 Proficient level in the Common European Framework of Reference (CEFR).",
    tags: ["English", "Communication"]
  },
  {
    title: "Problem Solving (Advanced) Certificate",
    issuer: "HackerRank",
    date: "Mar 2024",
    credentialId: "HR-ALG-ADV-39",
    credentialUrl: "https://hackerrank.com",
    description: "Validated logic performance by solving advanced algorithmic puzzles, data structures management, and complex mathematical queries under time constraints.",
    tags: ["Algorithms", "Data Structures", "Problem Solving"]
  }
];

interface DBAchievement {
  id: string;
  title: string;
  description: string;
  date: string;
}

interface AchievementsClientProps {
  dbAchievements: DBAchievement[];
}

export default function AchievementsClient({ dbAchievements }: AchievementsClientProps) {
  // Convert database achievements to the presentation structure
  const displayCertifications: Certification[] = dbAchievements.map((ach) => ({
    title: ach.title,
    issuer: "Portfolio Certified Milestones",
    date: ach.date,
    description: ach.description,
    tags: ["Verified", "Achievement"],
  }));

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col relative overflow-hidden font-sans pb-16 selection:bg-zinc-800 selection:text-emerald-400">
      {/* Background Interactive Particles */}
      <Particles className="absolute inset-0 pointer-events-none z-0 opacity-40" quantity={45} />

      {/* Decorative Radial Ambient Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[450px] bg-emerald-500/10 blur-[130px] rounded-full pointer-events-none z-0" />
      <div className="absolute bottom-10 right-10 w-[600px] h-[400px] bg-indigo-500/5 blur-[120px] rounded-full pointer-events-none z-0" />

      {/* Global Navigation Header */}
      <Navigation />

      {/* Main Body */}
      <section className="max-w-7xl mx-auto px-6 pt-32 w-full z-10 flex-grow">
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-900/80 border border-zinc-850 text-xs font-medium text-emerald-400 backdrop-blur-sm mb-4">
            <Award className="w-3.5 h-3.5 text-emerald-400" />
            Milestones & Credentials
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl leading-tight">
            Achievements & <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-200 to-emerald-400">Certificates</span>
          </h1>
          <p className="mt-4 text-zinc-400 text-sm md:text-base leading-relaxed">
            A collection of verified qualifications and accomplishments pulled dynamically from the database.
          </p>
        </div>

        {/* Bento/Grid style for Certifications */}
        {displayCertifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-12 bg-zinc-900/10 border border-zinc-900/60 rounded-3xl min-h-[300px] text-center max-w-xl mx-auto mt-8 backdrop-blur-sm">
            <Award className="w-12 h-12 text-zinc-650 mb-4 animate-pulse" />
            <h3 className="text-xl font-bold text-white mb-2">No Achievements Yet</h3>
            <p className="text-xs text-zinc-400 max-w-sm leading-relaxed">
              Official certifications and milestones will appear here once they are added in the database.
            </p>
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full"
          >
            {displayCertifications.map((cert, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={cardHoverEffect}
                className="h-full"
              >
                <Card>
                  <div className="p-6 flex flex-col justify-between h-full min-h-[300px] relative group">
                    <div className="space-y-4">
                      {/* Top Row: Icon + Date */}
                      <div className="flex items-center justify-between">
                        <div className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-emerald-400 group-hover:text-emerald-350 transition-colors">
                          {cert.title.includes("AWS") ? <Cpu className="w-5 h-5" /> :
                           cert.title.includes("English") ? <Globe className="w-5 h-5" /> :
                           cert.title.includes("Laravel") ? <ShieldCheck className="w-5 h-5" /> :
                           <BookOpen className="w-5 h-5" />}
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-zinc-500 font-mono">
                          <Calendar className="w-3.5 h-3.5" />
                          {cert.date}
                        </div>
                      </div>

                      {/* Cert Title & Issuer */}
                      <div>
                        <h3 className="text-lg font-bold text-white group-hover:text-emerald-400 transition-colors leading-snug">
                          {cert.title}
                        </h3>
                        <p className="text-xs text-zinc-400 font-medium mt-1 font-mono">{cert.issuer}</p>
                      </div>

                      {/* Cert Description */}
                      <p className="text-xs text-zinc-400 leading-relaxed line-clamp-4">
                        {cert.description}
                      </p>
                    </div>

                    {/* Footer Row: Tags */}
                    <div className="mt-6 pt-4 border-t border-zinc-900/60 flex items-center justify-between">
                      <div className="flex flex-wrap gap-1">
                        {cert.tags.slice(0, 2).map((tag, tIdx) => (
                          <span key={tIdx} className="text-[10px] bg-zinc-900 border border-zinc-800 px-2 py-0.5 rounded text-zinc-400">
                            {tag}
                          </span>
                        ))}
                      </div>

                      {cert.credentialUrl && (
                        <a
                          href={cert.credentialUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs font-semibold text-emerald-400 hover:text-emerald-350 transition-colors flex items-center gap-0.5"
                        >
                          Verify <ArrowUpRight className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        )}
      </section>

      {/* Minimal Footer */}
      <footer className="w-full max-w-7xl mx-auto px-6 mt-16 text-center text-xs text-zinc-600 z-10 flex items-center justify-between border-t border-zinc-900 pt-6">
        <div>&copy; {new Date().getFullYear()} Frankazastain. All rights reserved.</div>
      </footer>
    </main>
  );
}
