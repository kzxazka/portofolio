import Link from "next/link";
import { Eye } from "lucide-react";

type Project = {
  slug: string;
  title: string;
  description: string;
  createdAt: Date;
  imageUrl?: string | null;
};

type Props = {
  project: Project;
  views: number;
};

export const Article: React.FC<Props> = ({ project, views }) => {
  return (
    <Link href={`/projects/${project.slug}`}>
      <article className="p-4 md:p-8 flex flex-col justify-between h-full group">
        <div>
          <div className="flex justify-between gap-2 items-center mb-4">
            <span className="text-xs duration-1000 text-zinc-400 group-hover:text-zinc-200">
              {project.createdAt ? (
                <time dateTime={new Date(project.createdAt).toISOString()}>
                  {Intl.DateTimeFormat(undefined, { dateStyle: "medium" }).format(
                    new Date(project.createdAt),
                  )}
                </time>
              ) : (
                <span>SOON</span>
              )}
            </span>
            <span className="text-zinc-500 text-xs flex items-center gap-1">
              <Eye className="w-4 h-4" />{" "}
              {Intl.NumberFormat("en-US", { notation: "compact" }).format(views)}
            </span>
          </div>
          
          {project.imageUrl && (
            <div className="w-full h-40 rounded-xl overflow-hidden mb-4 border border-zinc-800/80 group-hover:border-zinc-700/80 transition-colors bg-zinc-950">
              <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
          )}

          <h2 className="z-20 text-xl font-bold duration-1000 lg:text-2xl text-zinc-200 group-hover:text-white font-display">
            {project.title}
          </h2>
          <p className="z-20 mt-3 text-sm leading-relaxed text-zinc-400 group-hover:text-zinc-300">
            {project.description}
          </p>
        </div>
      </article>
    </Link>
  );
};
