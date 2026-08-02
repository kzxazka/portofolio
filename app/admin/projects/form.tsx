"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2, UploadCloud, X } from "lucide-react";
import { createProjectAction, updateProjectAction, uploadAndOptimizeImage } from "../actions";

const projectSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  slug: z.string().min(2, "Slug must be at least 2 characters").regex(/^[a-z0-9-]+$/, "Slug must contain only lowercase letters, numbers, and hyphens"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  url: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  repository: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  published: z.boolean(),
});

type ProjectFormValues = z.infer<typeof projectSchema>;

interface ProjectFormProps {
  initialValues?: {
    id: string;
    slug: string;
    title: string;
    description: string;
    url?: string | null;
    repository?: string | null;
    published: boolean;
    imageUrl?: string | null;
    imageUrl2?: string | null;
    imageUrl3?: string | null;
  };
  onSuccess: () => void;
  onCancel: () => void;
}

export default function ProjectForm({ initialValues, onSuccess, onCancel }: ProjectFormProps) {
  const [loading, setLoading] = useState(false);
  const [imageFile1, setImageFile1] = useState<File | null>(null);
  const [imagePreview1, setImagePreview1] = useState<string | null>(initialValues?.imageUrl || null);
  const [imageFile2, setImageFile2] = useState<File | null>(null);
  const [imagePreview2, setImagePreview2] = useState<string | null>(initialValues?.imageUrl2 || null);
  const [imageFile3, setImageFile3] = useState<File | null>(null);
  const [imagePreview3, setImagePreview3] = useState<string | null>(initialValues?.imageUrl3 || null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProjectFormValues>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      title: initialValues?.title || "",
      slug: initialValues?.slug || "",
      description: initialValues?.description || "",
      url: initialValues?.url || "",
      repository: initialValues?.repository || "",
      published: initialValues?.published || false,
    },
  });

  const cleanDescription = (text: string): string => {
    if (!text) return "";
    return text
      // Replace LaTeX symbols (string-based replaceAll is safe from carriage return regex parsing bugs)
      .replaceAll("$\\rightarrow$", "→")
      .replaceAll("\\rightarrow", "→")
      .replaceAll("$\\leftarrow$", "←")
      .replaceAll("\\leftarrow", "←")
      .replaceAll("$\\bullet$", "•")
      .replaceAll("\\bullet", "•")
      .replaceAll("$\\checkmark$", "✓")
      .replaceAll("\\checkmark", "✓")
      // Replace standard text arrows
      .replaceAll("->", "→")
      .replaceAll("<-", "←")
      // Replace LaTeX newline symbols if pasted
      .replaceAll("\\newline", "\n")
      .replaceAll("\\n", "\n");
  };

  const onSubmit = async (values: ProjectFormValues) => {
    setLoading(true);
    setErrorMsg(null);
    try {
      let finalImageUrl = imagePreview1 ? (initialValues?.imageUrl || undefined) : undefined;
      let finalImageUrl2 = imagePreview2 ? (initialValues?.imageUrl2 || undefined) : undefined;
      let finalImageUrl3 = imagePreview3 ? (initialValues?.imageUrl3 || undefined) : undefined;

      if (imageFile1) {
        const formData = new FormData();
        formData.append("file", imageFile1);
        finalImageUrl = await uploadAndOptimizeImage(formData);
      }
      if (imageFile2) {
        const formData = new FormData();
        formData.append("file", imageFile2);
        finalImageUrl2 = await uploadAndOptimizeImage(formData);
      }
      if (imageFile3) {
        const formData = new FormData();
        formData.append("file", imageFile3);
        finalImageUrl3 = await uploadAndOptimizeImage(formData);
      }

      const payload = {
        ...values,
        description: cleanDescription(values.description),
        imageUrl: finalImageUrl,
        imageUrl2: finalImageUrl2,
        imageUrl3: finalImageUrl3,
      };

      if (initialValues?.id) {
        await updateProjectAction(initialValues.id, payload);
      } else {
        await createProjectAction(payload);
      }
      onSuccess();
    } catch (err: any) {
      setErrorMsg(err.message || "An error occurred while saving the project.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 bg-zinc-900/60 border border-zinc-800 rounded-3xl p-6">
      <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
        <h3 className="text-lg font-bold text-white">
          {initialValues ? "Edit Project" : "Add New Project"}
        </h3>
        <button
          type="button"
          onClick={onCancel}
          className="p-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {errorMsg && (
        <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-400 text-xs rounded-xl">
          {errorMsg}
        </div>
      )}

      {/* Title */}
      <div className="space-y-1">
        <label className="text-xs text-zinc-400 font-medium">Project Title</label>
        <input
          {...register("title")}
          type="text"
          className="w-full bg-zinc-950 border border-zinc-800 focus:border-emerald-500 rounded-xl px-4 py-2.5 text-sm text-white outline-none transition-colors"
          placeholder="e.g. Siaga Bapok"
        />
        {errors.title && <p className="text-[11px] text-red-450">{errors.title.message}</p>}
      </div>

      {/* Slug */}
      <div className="space-y-1">
        <label className="text-xs text-zinc-400 font-medium">Slug (URL Segment)</label>
        <input
          {...register("slug")}
          type="text"
          className="w-full bg-zinc-950 border border-zinc-800 focus:border-emerald-500 rounded-xl px-4 py-2.5 text-sm text-white outline-none transition-colors"
          placeholder="e.g. siaga-bapok"
        />
        {errors.slug && <p className="text-[11px] text-red-450">{errors.slug.message}</p>}
      </div>

      {/* Description */}
      <div className="space-y-1">
        <label className="text-xs text-zinc-400 font-medium">Description</label>
        <textarea
          {...register("description")}
          rows={4}
          className="w-full bg-zinc-950 border border-zinc-800 focus:border-emerald-500 rounded-xl px-4 py-2.5 text-sm text-white outline-none transition-colors resize-none"
          placeholder="Detailed description of your project..."
        />
        {errors.description && <p className="text-[11px] text-red-450">{errors.description.message}</p>}
      </div>

      {/* Links (Repo & Demo URL) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-xs text-zinc-400 font-medium">Demo Website URL</label>
          <input
            {...register("url")}
            type="text"
            className="w-full bg-zinc-950 border border-zinc-800 focus:border-emerald-500 rounded-xl px-4 py-2.5 text-sm text-white outline-none transition-colors"
            placeholder="https://example.com"
          />
          {errors.url && <p className="text-[11px] text-red-450">{errors.url.message}</p>}
        </div>

        <div className="space-y-1">
          <label className="text-xs text-zinc-400 font-medium">Repository URL</label>
          <input
            {...register("repository")}
            type="text"
            className="w-full bg-zinc-950 border border-zinc-800 focus:border-emerald-500 rounded-xl px-4 py-2.5 text-sm text-white outline-none transition-colors"
            placeholder="https://github.com/..."
          />
          {errors.repository && <p className="text-[11px] text-red-450">{errors.repository.message}</p>}
        </div>
      </div>

      {/* Images Upload (Up to 3 Screenshots) */}
      <div className="space-y-2">
        <label className="text-xs text-zinc-400 font-medium block">Project Screenshots (Up to 3 optional screenshots)</label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Screenshot 1 */}
          <div className="space-y-1">
            <span className="text-[10px] text-zinc-500 font-medium block">Primary Screenshot</span>
            {imagePreview1 ? (
              <div className="relative w-full h-24 rounded-xl border border-zinc-850 overflow-hidden bg-zinc-950 group">
                <img src={imagePreview1} alt="Preview 1" className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={() => {
                    setImageFile1(null);
                    setImagePreview1(null);
                  }}
                  className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <label className="w-full h-24 rounded-xl border-2 border-dashed border-zinc-800 hover:border-zinc-700 bg-zinc-950/40 flex flex-col items-center justify-center cursor-pointer text-zinc-500 hover:text-zinc-400 transition-all">
                <UploadCloud className="w-5 h-5" />
                <span className="text-[10px] mt-1 font-medium">Upload Image 1</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      setImageFile1(file);
                      setImagePreview1(URL.createObjectURL(file));
                    }
                  }}
                  className="hidden"
                />
              </label>
            )}
          </div>

          {/* Screenshot 2 */}
          <div className="space-y-1">
            <span className="text-[10px] text-zinc-500 font-medium block">Screenshot 2 (Optional)</span>
            {imagePreview2 ? (
              <div className="relative w-full h-24 rounded-xl border border-zinc-850 overflow-hidden bg-zinc-950 group">
                <img src={imagePreview2} alt="Preview 2" className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={() => {
                    setImageFile2(null);
                    setImagePreview2(null);
                  }}
                  className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <label className="w-full h-24 rounded-xl border-2 border-dashed border-zinc-800 hover:border-zinc-700 bg-zinc-950/40 flex flex-col items-center justify-center cursor-pointer text-zinc-500 hover:text-zinc-400 transition-all">
                <UploadCloud className="w-5 h-5" />
                <span className="text-[10px] mt-1 font-medium">Upload Image 2</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      setImageFile2(file);
                      setImagePreview2(URL.createObjectURL(file));
                    }
                  }}
                  className="hidden"
                />
              </label>
            )}
          </div>

          {/* Screenshot 3 */}
          <div className="space-y-1">
            <span className="text-[10px] text-zinc-500 font-medium block">Screenshot 3 (Optional)</span>
            {imagePreview3 ? (
              <div className="relative w-full h-24 rounded-xl border border-zinc-850 overflow-hidden bg-zinc-950 group">
                <img src={imagePreview3} alt="Preview 3" className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={() => {
                    setImageFile3(null);
                    setImagePreview3(null);
                  }}
                  className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <label className="w-full h-24 rounded-xl border-2 border-dashed border-zinc-800 hover:border-zinc-700 bg-zinc-950/40 flex flex-col items-center justify-center cursor-pointer text-zinc-500 hover:text-zinc-400 transition-all">
                <UploadCloud className="w-5 h-5" />
                <span className="text-[10px] mt-1 font-medium">Upload Image 3</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      setImageFile3(file);
                      setImagePreview3(URL.createObjectURL(file));
                    }
                  }}
                  className="hidden"
                />
              </label>
            )}
          </div>
        </div>
        <div className="text-[10px] text-zinc-500 leading-normal">
          Supported: JPEG, PNG, WEBP. Optimized as max width 1200px (80% Quality JPEG).
        </div>
      </div>

      {/* Published Toggle */}
      <div className="flex items-center gap-3 bg-zinc-950/40 border border-zinc-850 p-4 rounded-2xl">
        <input
          {...register("published")}
          type="checkbox"
          id="published"
          className="w-4 h-4 rounded text-emerald-500 bg-zinc-900 border-zinc-800 focus:ring-emerald-500 accent-emerald-500 cursor-pointer"
        />
        <label htmlFor="published" className="text-sm font-medium text-zinc-300 cursor-pointer select-none">
          Publish project to public gallery
        </label>
      </div>

      {/* Buttons */}
      <div className="flex items-center justify-end gap-3 pt-2">
        <button
          type="button"
          onClick={onCancel}
          disabled={loading}
          className="px-4 py-2.5 rounded-xl bg-zinc-850 hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors text-sm font-medium disabled:opacity-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 transition-colors text-sm font-semibold flex items-center gap-2 disabled:opacity-50"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Saving...
            </>
          ) : (
            "Save Project"
          )}
        </button>
      </div>
    </form>
  );
}
