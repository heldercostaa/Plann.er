import { CircleCheck } from "lucide-react";

export function Activities() {
  return (
    <div className="space-y-8">
      <div className="space-y-2.5">
        <div className="flex gap-2 items-baseline">
          <span className="text-xl text-zinc-300 font-semibold">August 17th</span>
          <span className="text-xs text-zinc-500">Monday</span>
        </div>
        <p className="text-zinc-500 text-sm">No activities registered for this day yet.</p>
      </div>

      <div className="space-y-2.5">
        <div className="flex gap-2 items-baseline">
          <span className="text-xl text-zinc-300 font-semibold">August 18th</span>
          <span className="text-xs text-zinc-500">Tuesday</span>
        </div>
        <div className="space-y-2.5">
          <div className="px-4 py-2.5 bg-zinc-900 rounded-xl shadow-shape flex items-center gap-3">
            <CircleCheck className="size-5 text-lime-300" />
            <span className="text-zinc-100">Beach Park with friends!</span>
            <span className="text-zinc-400 text-sm ml-auto">08:30h</span>
          </div>
        </div>
        <div className="space-y-2.5">
          <div className="px-4 py-2.5 bg-zinc-900 rounded-xl shadow-shape flex items-center gap-3">
            <CircleCheck className="size-5 text-lime-300" />
            <span className="text-zinc-100">Beach Park with friends!</span>
            <span className="text-zinc-400 text-sm ml-auto">08:30h</span>
          </div>
        </div>
      </div>
    </div>
  )
}
