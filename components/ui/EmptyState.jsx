import { Orbit } from "lucide-react";

export default function EmptyState({
    title = "Nothing here yet",
    description = "Create something to activate this section.",
    action,
}) {
    return (
        <div className="premium-card rounded-[2rem] p-10 text-center">
            <div className="mx-auto mb-5 grid h-16 w-16 place-items-center rounded-3xl border border-pink-400/20 bg-pink-400/10 text-pink-300">
                <Orbit size={30} />
            </div>

            <p className="text-lg font-semibold text-white">{title}</p>

            <p className="mx-auto mt-2 max-w-xl text-[#a89bb8]">{description}</p>

            {action && <div className="mt-5">{action}</div>}
        </div>
    );
}