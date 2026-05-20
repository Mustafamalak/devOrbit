"use client";

import { useEffect, useMemo, useState } from "react";
import { AlertTriangle, Loader2, Plus } from "lucide-react";
import KanbanColumn from "@/components/tasks/KanbanColumn";
import CreateTaskForm from "@/components/tasks/CreateTaskForm";
import { taskApi } from "@/lib/api";

const columns = [
  {
    id: "backlog",
    title: "Backlog",
    subtitle: "Ideas waiting for execution",
  },
  {
    id: "progress",
    title: "In Progress",
    subtitle: "Currently under development",
  },
  {
    id: "review",
    title: "Review",
    subtitle: "Needs testing or approval",
  },
  {
    id: "done",
    title: "Done",
    subtitle: "Completed sprint items",
  },
];

function normalizeTask(task) {
  return {
    id: task._id,
    _id: task._id,
    title: task.title,
    description: task.description,
    status: task.status,
    priority: task.priority,
    dueDate: task.dueDate,
    points: task.points,
    tags: task.tags || [],
    projectName: task.project?.name || "Unknown Project",
  };
}

export default function TaskBoard() {
  const [tasks, setTasks] = useState([]);
  const [createOpen, setCreateOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadTasks() {
    try {
      setLoading(true);
      setError("");
      const data = await taskApi.getTasks();
      setTasks(data.tasks || []);
    } catch (err) {
      setError(err.message || "Failed to load tasks");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadTasks();
  }, []);

  function handleCreated(task) {
    setTasks((current) => [task, ...current]);
  }

  const normalizedTasks = useMemo(() => {
    return tasks.map(normalizeTask);
  }, [tasks]);

  const tasksByColumn = useMemo(() => {
    return columns.reduce((acc, column) => {
      acc[column.id] = normalizedTasks.filter(
        (task) => task.status === column.id
      );
      return acc;
    }, {});
  }, [normalizedTasks]);

  return (
    <div>
      <CreateTaskForm
        open={createOpen}
        onClose={() => setCreateOpen(false)}
        onCreated={handleCreated}
      />

      <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <p className="text-sm text-pink-300">MongoDB Task Board</p>
          <h2 className="mt-1 text-2xl font-black text-white">
            User-specific sprint lanes
          </h2>
        </div>

        <button
          type="button"
          onClick={() => setCreateOpen(true)}
          className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-pink-400 via-orange-400 to-violet-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-pink-500/20 transition hover:scale-[1.02]"
        >
          <Plus size={17} />
          Add Task
        </button>
      </div>

      {loading ? (
        <div className="premium-card rounded-[2rem] p-10 text-center">
          <Loader2 className="mx-auto mb-4 animate-spin text-pink-300" size={34} />
          <p className="text-lg font-semibold text-white">Loading tasks</p>
          <p className="mt-2 text-[#a89bb8]">
            Fetching your sprint board from MongoDB.
          </p>
        </div>
      ) : error ? (
        <div className="premium-card rounded-[2rem] p-10 text-center">
          <AlertTriangle className="mx-auto mb-4 text-rose-300" size={34} />
          <p className="text-lg font-semibold text-white">
            Could not load tasks
          </p>
          <p className="mt-2 text-[#a89bb8]">{error}</p>

          <button
            type="button"
            onClick={loadTasks}
            className="mt-5 rounded-full border border-pink-400/20 bg-pink-400/10 px-5 py-3 text-sm font-semibold text-pink-200 transition hover:bg-pink-400/15"
          >
            Retry
          </button>
        </div>
      ) : (
        <div className="grid gap-5 xl:grid-cols-4">
          {columns.map((column) => (
            <KanbanColumn
              key={column.id}
              column={column}
              tasks={tasksByColumn[column.id] || []}
            />
          ))}
        </div>
      )}
    </div>
  );
}