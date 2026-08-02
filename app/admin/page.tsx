import { db } from "../../db";
import { projects, achievements } from "../../db/schema";
import AdminDashboardClient from "./dashboard-client";

// Ensure this route is never statically cached
export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const allProjects = await db.select().from(projects);
  const allAchievements = await db.select().from(achievements);

  return (
    <AdminDashboardClient
      initialProjects={allProjects}
      initialAchievements={allAchievements}
    />
  );
}
