import { db } from "../../db";
import { achievements } from "../../db/schema";
import AchievementsClient from "./achievements-client";

export const dynamic = "force-dynamic";

export default async function Page() {
  // Query all achievements from the Supabase database
  const dbAchievements = await db.select().from(achievements);

  return <AchievementsClient dbAchievements={dbAchievements} />;
}
