import { notFound } from "next/navigation";
import { allProjects } from "contentlayer/generated";
import { Mdx } from "@/app/components/mdx";
import { Header } from "./header";
import "./mdx.css";
import { ReportView } from "./view";
import { ImageCarousel } from "./carousel";
import { db } from "../../../db";
import { projects } from "../../../db/schema";
import { eq } from "drizzle-orm";
import { Redis } from "@upstash/redis";

const redis = Redis.fromEnv();

// Force the page to render dynamically on each request (SSR)
export const dynamic = "force-dynamic";

export default async function PostPage({ params }: { params: { slug: string } }) {
  // 1. Fetch live pageviews from Upstash Redis
  const views = (await redis.get<number>(["pageviews", "projects", params.slug].join(":"))) ?? 0;

  // 2. Query the Supabase database for a matching project slug
  let dbProject = null;
  try {
    const dbResult = await db
      .select()
      .from(projects)
      .where(eq(projects.slug, params.slug))
      .limit(1);
    dbProject = dbResult[0];
  } catch (error) {
    console.error("Failed to fetch project from database:", error);
  }

  // 3. If found in database, render the database-driven project layout
  if (dbProject) {
    return (
      <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col">
        <Header 
          project={{
            title: dbProject.title,
            description: dbProject.description,
            url: dbProject.url ?? undefined,
            repository: dbProject.repository ?? undefined,
          }} 
          views={views} 
        />
        <ReportView slug={dbProject.slug} />
        
        <article className="px-6 py-16 mx-auto max-w-4xl w-full z-10">
          <ImageCarousel 
            images={[
              dbProject.imageUrl || "", 
              dbProject.imageUrl2 || "", 
              dbProject.imageUrl3 || ""
            ]} 
            title={dbProject.title} 
          />
          
          <div className="text-zinc-300 leading-relaxed text-lg space-y-6 whitespace-pre-wrap prose prose-zinc prose-invert max-w-none">
            {dbProject.description}
          </div>
        </article>
      </div>
    );
  }

  // 4. Fallback: Check static MDX markdown files if not in database
  const staticProject = allProjects.find((p) => p.slug === params.slug);

  if (!staticProject) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col">
      <Header project={staticProject} views={views} />
      <ReportView slug={staticProject.slug} />
      
      <article className="px-6 py-16 mx-auto max-w-4xl w-full prose prose-zinc prose-invert z-10">
        <Mdx code={staticProject.body.code} />
      </article>
    </div>
  );
}