import { AlertTriangle } from "lucide-react";

export default function ErrorState({
    title = "Something went wrong",
    message = "Please try again.",
    onRetry,
}) {
    return (
        <div className="premium-card rounded-[2rem] p-10 text-center">
            <AlertTriangle className="mx-auto mb-4 text-rose-300" size={34} />

            <p className="text-lg font-semibold text-white">{title}</p>

            <p className="mt-2 text-[#a89bb8]">{message}</p>

            {onRetry && (
                <button
                    type="button"
                    onClick={onRetry}
                    className="mt-5 rounded-full border border-pink-400/20 bg-pink-400/10 px-5 py-3 text-sm font-semibold text-pink-200 transition hover:bg-pink-400/15"
                >
                    Retry
                </button>
            )}
        </div>
    );
}