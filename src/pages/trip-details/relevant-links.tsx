import { Link2, Plus } from "lucide-react";
import { Button } from "../../components/button";

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

      <Button variant="secondary" size="full">
        <Plus className="size-5"/>
        Add new link
      </Button>
    </div>
  )
}
