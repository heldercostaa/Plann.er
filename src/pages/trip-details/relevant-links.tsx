import { Link2, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "../../components/button";
import { Link } from "../../types/links";
import { CreateLinkModal } from "./create-link-modal";

interface RelevantLinksProps {
  links: Link[];
  getLinks: () => void;
}

export function RelevantLinks({ links, getLinks }: RelevantLinksProps) {
  const { tripId } = useParams();
  const [isCreateLinkModalOpen, setIsCreateLinkModalOpen] = useState(false);

  function openCreateLinkModal() {
    setIsCreateLinkModalOpen(true);
  }

  function closeCreateLinkModal() {
    setIsCreateLinkModalOpen(false);
  }

  useEffect(() => {}, [tripId]);

  return (
    <div className="space-y-5">
      <h2 className="text-2xl font-semibold">Relevant Links</h2>
      {links.map(({ id, title, url }) => {
        return (
          <div key={id} className="space-y-5">
            <div className="flex items-center justify-between gap-4">
              <div className="space-y-1.5">
                <span className="block font-medium text-zinc-100">{title}</span>
                <a
                  href={url}
                  target="_blank"
                  className="block truncate text-xs text-zinc-400 transition-colors duration-200 ease-in-out hover:text-zinc-200"
                >
                  {url}
                </a>
              </div>
              <Link2 className="size-5 shrink-0 text-zinc-400" />
            </div>
          </div>
        );
      })}

      <Button variant="secondary" size="full" onClick={openCreateLinkModal}>
        <Plus className="size-5" />
        Add new link
      </Button>

      {isCreateLinkModalOpen && (
        <CreateLinkModal
          closeCreateLinkModal={closeCreateLinkModal}
          isOpen={isCreateLinkModalOpen}
          getLinks={getLinks}
        />
      )}
    </div>
  );
}
