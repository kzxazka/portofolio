"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2, X } from "lucide-react";
import { createAchievementAction, updateAchievementAction } from "../actions";

const achievementSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  date: z.string().min(3, "Date must be at least 3 characters (e.g. 'Dec 2025')"),
});

type AchievementFormValues = z.infer<typeof achievementSchema>;

interface AchievementFormProps {
  initialValues?: {
    id: string;
    title: string;
    description: string;
    date: string;
  };
  onSuccess: () => void;
  onCancel: () => void;
}

export default function AchievementForm({ initialValues, onSuccess, onCancel }: AchievementFormProps) {
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AchievementFormValues>({
    resolver: zodResolver(achievementSchema),
    defaultValues: {
      title: initialValues?.title || "",
      description: initialValues?.description || "",
      date: initialValues?.date || "",
    },
  });

  const onSubmit = async (values: AchievementFormValues) => {
    setLoading(true);
    setErrorMsg(null);
    try {
      if (initialValues?.id) {
        await updateAchievementAction(initialValues.id, values);
      } else {
        await createAchievementAction(values);
      }
      onSuccess();
    } catch (err: any) {
      setErrorMsg(err.message || "An error occurred while saving the achievement.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 bg-zinc-900/60 border border-zinc-800 rounded-3xl p-6">
      <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
        <h3 className="text-lg font-bold text-white">
          {initialValues ? "Edit Achievement" : "Add New Achievement"}
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
        <label className="text-xs text-zinc-400 font-medium">Achievement / Certificate Title</label>
        <input
          {...register("title")}
          type="text"
          className="w-full bg-zinc-950 border border-zinc-800 focus:border-emerald-500 rounded-xl px-4 py-2.5 text-sm text-white outline-none transition-colors"
          placeholder="e.g. Laravel Certified Developer"
        />
        {errors.title && <p className="text-[11px] text-red-450">{errors.title.message}</p>}
      </div>

      {/* Date */}
      <div className="space-y-1">
        <label className="text-xs text-zinc-400 font-medium">Date Eared</label>
        <input
          {...register("date")}
          type="text"
          className="w-full bg-zinc-950 border border-zinc-800 focus:border-emerald-500 rounded-xl px-4 py-2.5 text-sm text-white outline-none transition-colors"
          placeholder="e.g. Dec 2025"
        />
        {errors.date && <p className="text-[11px] text-red-450">{errors.date.message}</p>}
      </div>

      {/* Description */}
      <div className="space-y-1">
        <label className="text-xs text-zinc-400 font-medium">Description / Details</label>
        <textarea
          {...register("description")}
          rows={4}
          className="w-full bg-zinc-950 border border-zinc-800 focus:border-emerald-500 rounded-xl px-4 py-2.5 text-sm text-white outline-none transition-colors resize-none"
          placeholder="Detailed description of what you achieved..."
        />
        {errors.description && <p className="text-[11px] text-red-450">{errors.description.message}</p>}
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
            "Save Achievement"
          )}
        </button>
      </div>
    </form>
  );
}
