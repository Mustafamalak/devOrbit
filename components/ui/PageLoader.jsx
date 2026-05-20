import { Loader2 } from "lucide-react";

export default function PageLoader({
    title = "Loading",
    description = "Preparing your DevOrbit workspace.",
}) {
    return (
        <div className="premium-card rounded-[2rem] p-10 text-center">
            <Loader2 className="mx-auto mb-4 animate-spin text-pink-300" size={34} />

            <p className="text-lg font-semibold text-white">{title}</p>

            <p className="mt-2 text-[#a89bb8]">{description}</p>
        </div>
    );
}