import TaskBoard from "@/components/tasks/TaskBoard";

export default function TasksPage() {
  return (
    <div className="pb-10">
      <section className="mb-7">
        <p className="text-sm font-medium text-pink-300">Task Radar</p>

        <div className="mt-2 flex flex-col justify-between gap-4 xl:flex-row xl:items-end">
          <div>
            <h1 className="glow-text text-4xl font-black tracking-tight text-white md:text-5xl">
              Animated Sprint <span className="text-gradient">Kanban</span>
            </h1>

            <p className="mt-3 max-w-3xl text-[#a89bb8]">
              Track sprint execution through a futuristic Kanban interface.
              Priorities, due dates, sprint points, and project labels are
              visualized as a live command workflow.
            </p>
          </div>

          <div className="rounded-2xl border border-violet-400/20 bg-violet-400/10 px-4 py-3 text-sm text-violet-200">
            Drag-and-drop upgrade planned
          </div>
        </div>
      </section>

      <TaskBoard />
    </div>
  );
}