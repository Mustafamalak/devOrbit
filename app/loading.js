export default function Loading() {
  return (
    <main className="grid min-h-screen place-items-center bg-slate-950 text-white">
      <div className="text-center">
        <div className="mx-auto mb-6 h-16 w-16 animate-spin rounded-full border-4 border-cyan-400/20 border-t-cyan-300" />

        <p className="text-sm font-medium text-cyan-300">
          Initializing DevOrbit
        </p>

        <h1 className="mt-2 text-3xl font-black text-white">
          Loading command systems...
        </h1>

        <p className="mt-3 text-sm text-slate-500">
          Preparing project universe, analytics, and activity signals.
        </p>
      </div>
    </main>
  );
}