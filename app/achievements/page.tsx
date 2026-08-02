import { db } from "../../db";
import { achievements } from "../../db/schema";
import AchievementsClient from "./achievements-client";

export const dynamic = "force-dynamic";

export default async function Page() {
  let dbAchievements: any[] = [];
  
  try {
    // Query all achievements from the Supabase database
    dbAchievements = await db.select().from(achievements);
  } catch (error) {
    // Catch database connection issues and fallback gracefully to an empty array
    // which triggers the static fallback list in the client component
    console.error("Supabase connection failed, falling back to static achievements:", error);
    dbAchievements = [];
  }

  return <AchievementsClient dbAchievements={dbAchievements} />;
}
