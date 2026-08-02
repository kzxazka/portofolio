"use server";

import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { db } from "../../db";
import { projects, achievements } from "../../db/schema";
import { eq } from "drizzle-orm";
import sharp from "sharp";
import { createClient } from "@supabase/supabase-js";

async function ensureAuth() {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("Unauthorized access. Admin privileges required.");
  }
}

// IMAGE UPLOAD & OPTIMIZATION PIPELINE
export async function uploadAndOptimizeImage(fileForm: FormData): Promise<string> {
  await ensureAuth();
  
  const file = fileForm.get("file") as File;
  if (!file) throw new Error("No file uploaded");

  const buffer = Buffer.from(await file.arrayBuffer());

  // Image optimization using sharp
  const optimizedBuffer = await sharp(buffer)
    .resize({ width: 1200, fit: "inside", withoutEnlargement: true }) // Max width 1200px
    .jpeg({ quality: 80 }) // 80% quality lossy compression
    .toBuffer();

  const fileName = `${Date.now()}-${file.name.replace(/\.[^/.]+$/, "")}.jpg`;

  // Initialize Supabase client
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY! // Bypasses RLS to allow backend writes
  );

  // Upload optimized JPEG buffer to Supabase Storage bucket 'project-screenshots'
  const { data, error } = await supabase.storage
    .from("project-screenshots")
    .upload(fileName, optimizedBuffer, {
      contentType: "image/jpeg",
      cacheControl: "3600",
    });

  if (error) {
    throw new Error(`Storage upload failed: ${error.message}`);
  }

  // Retrieve the public URL for storage in the PostgreSQL projects table
  const { data: urlData } = supabase.storage
    .from("project-screenshots")
    .getPublicUrl(data.path);

  return urlData.publicUrl;
}

// PROJECTS CRUD Actions
export async function createProjectAction(data: {
  slug: string;
  title: string;
  description: string;
  url?: string;
  repository?: string;
  published: boolean;
  imageUrl?: string;
}) {
  await ensureAuth();
  await db.insert(projects).values({
    slug: data.slug,
    title: data.title,
    description: data.description,
    url: data.url || null,
    repository: data.repository || null,
    published: data.published,
    imageUrl: data.imageUrl || null,
  });
  revalidatePath("/projects");
  revalidatePath("/");
}

export async function updateProjectAction(
  id: string,
  data: {
    slug: string;
    title: string;
    description: string;
    url?: string;
    repository?: string;
    published: boolean;
    imageUrl?: string;
  }
) {
  await ensureAuth();
  await db
    .update(projects)
    .set({
      slug: data.slug,
      title: data.title,
      description: data.description,
      url: data.url || null,
      repository: data.repository || null,
      published: data.published,
      imageUrl: data.imageUrl || null,
    })
    .where(eq(projects.id, id));
  revalidatePath("/projects");
  revalidatePath("/");
}

export async function deleteProjectAction(id: string) {
  await ensureAuth();
  await db.delete(projects).where(eq(projects.id, id));
  revalidatePath("/projects");
  revalidatePath("/");
}

// ACHIEVEMENTS CRUD Actions
export async function createAchievementAction(data: {
  title: string;
  description: string;
  date: string;
}) {
  await ensureAuth();
  await db.insert(achievements).values({
    title: data.title,
    description: data.description,
    date: data.date,
  });
  revalidatePath("/achievements");
}

export async function updateAchievementAction(
  id: string,
  data: {
    title: string;
    description: string;
    date: string;
  }
) {
  await ensureAuth();
  await db
    .update(achievements)
    .set({
      title: data.title,
      description: data.description,
      date: data.date,
    })
    .where(eq(achievements.id, id));
  revalidatePath("/achievements");
}

export async function deleteAchievementAction(id: string) {
  await ensureAuth();
  await db.delete(achievements).where(eq(achievements.id, id));
  revalidatePath("/achievements");
}
