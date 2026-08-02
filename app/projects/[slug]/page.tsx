import { notFound } from "next/navigation";
import { allProjects } from "contentlayer/generated";
import { Mdx } from "@/app/components/mdx";
import { Header } from "./header";
import "./mdx.css";
import { ReportView } from "./view";

export const revalidate = 60;

export default function PostPage({ params }: { params: { slug: string } }) {
  const project = allProjects.find((p) => p.slug === params.slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="min-h-screen">
      <Header project={project} views={0} />
      <ReportView slug={project.slug} />
      <article className="px-4 py-12 mx-auto prose prose-zinc">
        <Mdx code={project.body.code} />
      </article>
    </div>
  );
}

export function generateStaticParams() {
  return allProjects
    .filter((p) => p.published)
    .map((p) => ({
      slug: p.slug,
    }));
}