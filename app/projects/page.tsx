import Link from "next/link";
import React from "react";
import { db } from "../../db";
import { projects } from "../../db/schema";
import { eq } from "drizzle-orm";
import { Navigation } from "../components/nav";
import { Card } from "../components/card";
import { Article } from "./article";
import { Redis } from "@upstash/redis";
import { Eye } from "lucide-react";
import Particles from "../components/particles";

const redis = Redis.fromEnv();

// Revalidate cache every 60 seconds
export const revalidate = 60;

export default async function ProjectsPage() {
  // Query only published projects from the Supabase database
  const allProjects = await db
    .select()
    .from(projects)
    .where(eq(projects.published, true));

  const views = allProjects.length > 0
    ? (
        await redis.mget<number[]>(
          ...allProjects.map((p) => ["pageviews", "projects", p.slug].join(":")),
        )
      ).reduce((acc, v, i) => {
        acc[allProjects[i].slug] = v ?? 0;
        return acc;
      }, {} as Record<string, number>)
    : {};

  if (allProjects.length === 0) {
    return (
      <div className="relative pb-16 min-h-screen bg-zinc-950 text-zinc-100 flex flex-col overflow-hidden">
        {/* Background Particles and Glows */}
        <Particles className="absolute inset-0 pointer-events-none z-0 opacity-40" quantity={45} />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[450px] bg-emerald-500/10 blur-[130px] rounded-full pointer-events-none z-0" />
        
        <Navigation />
        <div className="px-6 pt-32 mx-auto max-w-7xl lg:px-8 relative z-10 flex-grow flex flex-col justify-center">
          <div className="max-w-2xl mx-auto text-center space-y-4">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Projects
            </h2>
            <p className="text-zinc-400 text-sm md:text-base leading-relaxed">
              No database projects found. Head to the admin dashboard to add some records.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Set default sorting and display groups
  const featured = allProjects.find((project) => project.slug === "unkey") || allProjects[0];
  const top2 = allProjects.find((project) => project.slug === "planetfall") || allProjects[1];
  const top3 = allProjects.find((project) => project.slug === "highstorm") || allProjects[2];

  const sorted = allProjects
    .filter(
      (project) =>
        project.slug !== featured?.slug &&
        project.slug !== top2?.slug &&
        project.slug !== top3?.slug,
    )
    .sort(
      (a, b) =>
        new Date(b.createdAt ?? Number.POSITIVE_INFINITY).getTime() -
        new Date(a.createdAt ?? Number.POSITIVE_INFINITY).getTime(),
    );

  return (
    <div className="relative pb-16 min-h-screen bg-zinc-950 text-zinc-100 flex flex-col overflow-hidden">
      {/* Background Particles and Glows */}
      <Particles className="absolute inset-0 pointer-events-none z-0 opacity-40" quantity={45} />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[450px] bg-emerald-500/10 blur-[130px] rounded-full pointer-events-none z-0" />
      <div className="absolute bottom-10 right-10 w-[600px] h-[400px] bg-indigo-500/5 blur-[120px] rounded-full pointer-events-none z-0" />

      <Navigation />
      <div className="px-6 pt-32 mx-auto space-y-8 max-w-7xl lg:px-8 md:space-y-16 relative z-10 flex-grow">
        <div className="max-w-2xl mx-auto lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Projects
          </h2>
          <p className="mt-4 text-zinc-400 text-sm md:text-base leading-relaxed">
            Some of the projects are from work and some are on my own time.
          </p>
        </div>
        <div className="w-full h-px bg-zinc-800/80" />

        <div className="grid grid-cols-1 gap-8 mx-auto lg:grid-cols-2">
          {featured && (
            <Card>
              <Link href={`/projects/${featured.slug}`}>
                <article className="relative w-full h-full p-6 md:p-8 flex flex-col justify-between min-h-[300px]">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-6">
                      <div className="text-xs text-zinc-400 font-mono">
                        {featured.createdAt ? (
                          <time dateTime={new Date(featured.createdAt).toISOString()}>
                            {Intl.DateTimeFormat(undefined, {
                              dateStyle: "medium",
                            }).format(new Date(featured.createdAt))}
                          </time>
                        ) : (
                          <span>SOON</span>
                        )}
                      </div>
                      <span className="flex items-center gap-1 text-xs text-zinc-500">
                        <Eye className="w-4 h-4" />{" "}
                        {Intl.NumberFormat("en-US", { notation: "compact" }).format(
                          views[featured.slug] ?? 0,
                        )}
                      </span>
                    </div>

                    {featured.imageUrl && (
                      <div className="w-full h-48 md:h-64 rounded-2xl overflow-hidden mb-6 border border-zinc-800 bg-zinc-950">
                        <img src={featured.imageUrl} alt={featured.title} className="w-full h-full object-cover" />
                      </div>
                    )}

                    <h2
                      id="featured-post"
                      className="text-2xl font-bold text-white group-hover:text-emerald-400 transition-colors font-display"
                    >
                      {featured.title}
                    </h2>
                    <p className="mt-4 text-sm text-zinc-400 leading-relaxed group-hover:text-zinc-300 transition-colors">
                      {featured.description}
                    </p>
                  </div>
                  <div className="mt-6">
                    <p className="text-sm font-medium text-emerald-400 hover:text-emerald-350 flex items-center gap-1">
                      Read more <span aria-hidden="true">&rarr;</span>
                    </p>
                  </div>
                </article>
              </Link>
            </Card>
          )}

          <div className="flex flex-col w-full gap-8 mx-auto border-t border-zinc-800/20 lg:mx-0 lg:border-t-0 ">
            {[top2, top3].filter(Boolean).map((project) => (
              <Card key={project.slug}>
                <Article project={project} views={views[project.slug] ?? 0} />
              </Card>
            ))}
          </div>
        </div>
        <div className="hidden w-full h-px md:block bg-zinc-800/50" />

        <div className="grid grid-cols-1 gap-4 mx-auto lg:mx-0 md:grid-cols-3">
          <div className="grid grid-cols-1 gap-4">
            {sorted
              .filter((_, i) => i % 3 === 0)
              .map((project) => (
                <Card key={project.slug}>
                  <Article project={project} views={views[project.slug] ?? 0} />
                </Card>
              ))}
          </div>
          <div className="grid grid-cols-1 gap-4">
            {sorted
              .filter((_, i) => i % 3 === 1)
              .map((project) => (
                <Card key={project.slug}>
                  <Article project={project} views={views[project.slug] ?? 0} />
                </Card>
              ))}
          </div>
          <div className="grid grid-cols-1 gap-4">
            {sorted
              .filter((_, i) => i % 3 === 2)
              .map((project) => (
                <Card key={project.slug}>
                  <Article project={project} views={views[project.slug] ?? 0} />
                </Card>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
