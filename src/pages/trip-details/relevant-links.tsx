import { Link2, Plus } from "lucide-react";

export function RelevantLinks() {
  return (
    <div className="space-y-5">
      <h2 className="font-semibold text-2xl">Relevant Links</h2>
      <div className="space-y-5">
        <div className="flex items-center justify-between gap-4">
          <div className="space-y-1.5">
            <span className="block font-medium text-zinc-100">Airbnb reservation</span>
            <a href="#" className="block text-xs text-zinc-400 truncate hover:text-zinc-200">
              https://airbnb.com/rooms/1047018923791273891723981928370011
            </a>
          </div>
          <Link2 className="text-zinc-400 size-5 shrink-0"/>
        </div>
        <div className="flex items-center justify-between gap-4">
          <div className="space-y-1.5">
            <span className="block font-medium text-zinc-100">Airbnb reservation</span>
            <a href="#" className="block text-xs text-zinc-400 truncate hover:text-zinc-200">
              https://airbnb.com/rooms/1047018923791273891723981928370011
            </a>
          </div>
          <Link2 className="text-zinc-400 size-5 shrink-0"/>
        </div>
      </div>
      <button className="bg-zinc-800 text-zinc-200 rounded-lg px-5 h-11 font-medium flex items-center gap-2 w-full justify-center hover:bg-zinc-700">
        <Plus className="size-5" />
        Add new link
      </button>
    </div>
  )
}
