"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Award, 
  Code2, 
  Trash2, 
  Edit, 
  Plus, 
  ExternalLink, 
  Github, 
  Eye, 
  EyeOff, 
  ArrowLeft,
  Loader2 
} from "lucide-react";
import Link from "next/link";
import ProjectForm from "./projects/form";
import AchievementForm from "./achievements/form";
import { deleteProjectAction, deleteAchievementAction } from "./actions";

interface Project {
  id: string;
  slug: string;
  title: string;
  description: string;
  url: string | null;
  repository: string | null;
  published: boolean;
  imageUrl: string | null;
  imageUrl2: string | null;
  imageUrl3: string | null;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  date: string;
}

interface AdminDashboardClientProps {
  initialProjects: Project[];
  initialAchievements: Achievement[];
}

export default function AdminDashboardClient({ 
  initialProjects, 
  initialAchievements 
}: AdminDashboardClientProps) {
  const [activeTab, setActiveTab] = useState<"projects" | "achievements">("projects");
  const [projectsList, setProjectsList] = useState<Project[]>(initialProjects);
  const [achievementsList, setAchievementsList] = useState<Achievement[]>(initialAchievements);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [editingAchievement, setEditingAchievement] = useState<Achievement | null>(null);
  const [showForm, setShowForm] = useState<"project" | "achievement" | null>(null);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  // Deletions
  const handleDeleteProject = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;
    setActionLoading(id);
    try {
      await deleteProjectAction(id);
      setProjectsList((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      alert("Failed to delete project");
    } finally {
      setActionLoading(null);
    }
  };

  const handleDeleteAchievement = async (id: string) => {
    if (!confirm("Are you sure you want to delete this achievement?")) return;
    setActionLoading(id);
    try {
      await deleteAchievementAction(id);
      setAchievementsList((prev) => prev.filter((a) => a.id !== id));
    } catch (err) {
      alert("Failed to delete achievement");
    } finally {
      setActionLoading(null);
    }
  };

  const handleFormSuccess = () => {
    // Refresh the page data on success to show current state
    window.location.reload();
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 relative z-10 min-h-screen flex flex-col">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-zinc-800 pb-8 mb-8">
        <div>
          <Link href="/" className="inline-flex items-center text-xs text-zinc-400 hover:text-white transition-colors mb-3 gap-1">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Live Portfolio
          </Link>
          <h1 className="text-3xl font-extrabold tracking-tight text-white flex items-center gap-2.5">
            Admin Control Center
          </h1>
          <p className="text-sm text-zinc-400 mt-1">Manage database projects and achievements displayed on the site.</p>
        </div>

        {/* Tab switchers + New item buttons */}
        <div className="flex items-center gap-4">
          <div className="flex bg-zinc-900 border border-zinc-800 rounded-xl p-1">
            <button
              onClick={() => setActiveTab("projects")}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all ${
                activeTab === "projects"
                  ? "bg-emerald-500 text-zinc-950 shadow-lg shadow-emerald-500/10"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              Projects
            </button>
            <button
              onClick={() => setActiveTab("achievements")}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all ${
                activeTab === "achievements"
                  ? "bg-emerald-500 text-zinc-950 shadow-lg shadow-emerald-500/10"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              Achievements
            </button>
          </div>

          <button
            onClick={() => setShowForm(activeTab === "projects" ? "project" : "achievement")}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 text-xs font-bold transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add {activeTab === "projects" ? "Project" : "Achievement"}
          </button>
        </div>
      </div>

      {/* Main Forms overlay sheets */}
      <AnimatePresence mode="wait">
        {(showForm || editingProject || editingAchievement) && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="mb-8 max-w-3xl"
          >
            {showForm === "project" && (
              <ProjectForm 
                onSuccess={handleFormSuccess} 
                onCancel={() => setShowForm(null)} 
              />
            )}
            {editingProject && (
              <ProjectForm
                initialValues={editingProject}
                onSuccess={handleFormSuccess}
                onCancel={() => setEditingProject(null)}
              />
            )}
            {showForm === "achievement" && (
              <AchievementForm
                onSuccess={handleFormSuccess}
                onCancel={() => setShowForm(null)}
              />
            )}
            {editingAchievement && (
              <AchievementForm
                initialValues={editingAchievement}
                onSuccess={handleFormSuccess}
                onCancel={() => setEditingAchievement(null)}
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Tables Lists */}
      <div className="flex-grow">
        {activeTab === "projects" ? (
          <div className="bg-zinc-900/30 border border-zinc-900 rounded-3xl overflow-hidden shadow-2xl">
            {projectsList.length === 0 ? (
              <div className="p-12 text-center text-zinc-500 text-sm">
                No database projects found. Click "Add Project" to add your first record.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-sm">
                  <thead>
                    <tr className="border-b border-zinc-800/80 bg-zinc-900/50 text-zinc-400 font-medium text-xs uppercase tracking-wider">
                      <th className="py-4 px-6">Preview</th>
                      <th className="py-4 px-6">Title</th>
                      <th className="py-4 px-6">Status</th>
                      <th className="py-4 px-6">Links</th>
                      <th className="py-4 px-6 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-800/60">
                    {projectsList.map((project) => (
                      <tr key={project.id} className="hover:bg-zinc-900/20 transition-colors">
                        {/* Thumbnail */}
                        <td className="py-4 px-6">
                          {project.imageUrl ? (
                            <img 
                              src={project.imageUrl} 
                              alt={project.title} 
                              className="w-16 h-10 object-cover rounded-lg border border-zinc-800"
                            />
                          ) : (
                            <div className="w-16 h-10 rounded-lg bg-zinc-950 flex items-center justify-center text-[10px] text-zinc-600 font-mono border border-zinc-850">
                              No Image
                            </div>
                          )}
                        </td>

                        {/* Title & Description */}
                        <td className="py-4 px-6">
                          <div className="font-semibold text-white">{project.title}</div>
                          <div className="text-xs text-zinc-400 line-clamp-1 max-w-sm mt-0.5">{project.description}</div>
                        </td>

                        {/* Status */}
                        <td className="py-4 px-6">
                          {project.published ? (
                            <span className="inline-flex items-center gap-1 text-[11px] font-semibold bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded-md border border-emerald-500/10">
                              <Eye className="w-3.5 h-3.5" /> Published
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 text-[11px] font-semibold bg-zinc-800/60 text-zinc-500 px-2 py-0.5 rounded-md border border-zinc-800">
                              <EyeOff className="w-3.5 h-3.5" /> Draft
                            </span>
                          )}
                        </td>

                        {/* Links */}
                        <td className="py-4 px-6">
                          <div className="flex gap-2 text-zinc-400">
                            {project.url && (
                              <a href={project.url} target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400">
                                <ExternalLink className="w-4 h-4" />
                              </a>
                            )}
                            {project.repository && (
                              <a href={project.repository} target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400">
                                <Github className="w-4 h-4" />
                              </a>
                            )}
                          </div>
                        </td>

                        {/* Actions */}
                        <td className="py-4 px-6 text-right space-x-2">
                          <button
                            onClick={() => setEditingProject(project)}
                            className="p-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white transition-colors"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteProject(project.id)}
                            disabled={actionLoading === project.id}
                            className="p-2 rounded-lg bg-red-950/20 hover:bg-red-950/60 border border-red-500/10 text-red-400 hover:text-red-300 transition-colors disabled:opacity-50"
                          >
                            {actionLoading === project.id ? (
                              <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                              <Trash2 className="w-4 h-4" />
                            )}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        ) : (
          <div className="bg-zinc-900/30 border border-zinc-900 rounded-3xl overflow-hidden shadow-2xl">
            {achievementsList.length === 0 ? (
              <div className="p-12 text-center text-zinc-500 text-sm">
                No database achievements found. Click "Add Achievement" to add your first record.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-sm">
                  <thead>
                    <tr className="border-b border-zinc-800/80 bg-zinc-900/50 text-zinc-400 font-medium text-xs uppercase tracking-wider">
                      <th className="py-4 px-6">Title</th>
                      <th className="py-4 px-6">Date</th>
                      <th className="py-4 px-6">Description</th>
                      <th className="py-4 px-6 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-800/60">
                    {achievementsList.map((achievement) => (
                      <tr key={achievement.id} className="hover:bg-zinc-900/20 transition-colors">
                        {/* Title */}
                        <td className="py-4 px-6 font-semibold text-white">
                          {achievement.title}
                        </td>

                        {/* Date */}
                        <td className="py-4 px-6 text-zinc-300 font-mono text-xs">
                          {achievement.date}
                        </td>

                        {/* Description */}
                        <td className="py-4 px-6 text-zinc-400 line-clamp-1 max-w-xs mt-3.5">
                          {achievement.description}
                        </td>

                        {/* Actions */}
                        <td className="py-4 px-6 text-right space-x-2">
                          <button
                            onClick={() => setEditingAchievement(achievement)}
                            className="p-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white transition-colors"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteAchievement(achievement.id)}
                            disabled={actionLoading === achievement.id}
                            className="p-2 rounded-lg bg-red-950/20 hover:bg-red-950/60 border border-red-500/10 text-red-400 hover:text-red-300 transition-colors disabled:opacity-50"
                          >
                            {actionLoading === achievement.id ? (
                              <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                              <Trash2 className="w-4 h-4" />
                            )}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
