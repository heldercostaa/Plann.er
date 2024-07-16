import { CircleAlert, Link2, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { Button } from "../../components/button";
import { api } from "../../lib/axios";
import { Link } from "../../types/links";
import { CreateLinkModal } from "./create-link-modal";
import { Popconfirm } from "antd";

interface RelevantLinksProps {
  links: Link[];
  fetchLinks: () => void;
}

export function RelevantLinks({ links, fetchLinks }: RelevantLinksProps) {
  const [isCreateLinkModalOpen, setIsCreateLinkModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  function openCreateLinkModal() {
    setIsCreateLinkModalOpen(true);
  }

  function closeCreateLinkModal() {
    setIsCreateLinkModalOpen(false);
  }

  async function removeLink(LinkId: string) {
    if (!LinkId) return;

    setIsLoading(true);
    try {
      await api.delete(`/links/${LinkId}`);

      fetchLinks();
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="space-y-5">
      <h2 className="text-2xl font-semibold">Relevant Links</h2>
      {links.map(({ id, title, url }) => {
        return (
          <div key={id} className="group space-y-5">
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
              <div>
                <Link2 className="size-5 shrink-0 text-zinc-400 opacity-100 transition-opacity duration-500 ease-in group-hover:size-0 group-hover:opacity-0" />
                <Popconfirm
                  title="Remove link"
                  description="Are you sure to remove this link?"
                  okText="Yes"
                  cancelText="No"
                  icon={<CircleAlert className="mr-2 size-6 text-red-600" />}
                  onConfirm={() => removeLink(id)}
                >
                  <Trash2
                    className={`size-0 shrink-0 text-red-600 opacity-0 transition-opacity duration-500 ease-in group-hover:size-5 ${isLoading ? "cursor-wait group-hover:opacity-30" : "cursor-pointer group-hover:opacity-100"}`}
                  />
                </Popconfirm>
              </div>
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
          fetchLinks={fetchLinks}
        />
      )}
    </div>
  );
}
