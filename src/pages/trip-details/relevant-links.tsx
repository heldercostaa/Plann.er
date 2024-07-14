import { Link2, Plus } from "lucide-react";
import { Button } from "../../components/button";
import { useState } from "react";
import { CreateLinkModal } from "./create-link-modal";

export function RelevantLinks() {
  const [isCreateLinkModalOpen, setIsCreateLinkModalOpen] = useState(false);

  function openCreateLinkModal() {
    setIsCreateLinkModalOpen(true);
  }

  function closeCreateLinkModal() {
    setIsCreateLinkModalOpen(false);
  }
  return (
    <div className="space-y-5">
      <h2 className="text-2xl font-semibold">Relevant Links</h2>
      <div className="space-y-5">
        <div className="flex items-center justify-between gap-4">
          <div className="space-y-1.5">
            <span className="block font-medium text-zinc-100">
              Airbnb reservation
            </span>
            <a
              href="#"
              className="block truncate text-xs text-zinc-400 hover:text-zinc-200"
            >
              https://airbnb.com/rooms/1047018923791273891723981928370011
            </a>
          </div>
          <Link2 className="size-5 shrink-0 text-zinc-400" />
        </div>
        <div className="flex items-center justify-between gap-4">
          <div className="space-y-1.5">
            <span className="block font-medium text-zinc-100">
              Airbnb reservation
            </span>
            <a
              href="#"
              className="block truncate text-xs text-zinc-400 hover:text-zinc-200"
            >
              https://airbnb.com/rooms/1047018923791273891723981928370011
            </a>
          </div>
          <Link2 className="size-5 shrink-0 text-zinc-400" />
        </div>
      </div>

      <Button variant="secondary" size="full" onClick={openCreateLinkModal}>
        <Plus className="size-5" />
        Add new link
      </Button>

      {isCreateLinkModalOpen && (
        <CreateLinkModal closeCreateLinkModal={closeCreateLinkModal} />
      )}
    </div>
  );
}
