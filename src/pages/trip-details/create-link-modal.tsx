import { Link2, Tag, X } from "lucide-react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "../../components/button";
import { Input } from "../../components/input";
import { api } from "../../lib/axios";
import { isValidUrl } from "../../utils/validateUrl";

interface CreateLinkModalProps {
  closeCreateLinkModal: () => void;
}

export function CreateLinkModal({
  closeCreateLinkModal,
}: CreateLinkModalProps) {
  const { tripId } = useParams();

  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");

  async function createLink() {
    if (!title) return;
    if (!url) return;

    await api.post(`/trips/${tripId}/links`, {
      title,
      url,
    });

    // TODO: Improve refresh page
    window.document.location.reload();
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-md">
      <div className="w-[480px] space-y-5 rounded-xl bg-zinc-900 px-6 py-5 shadow-shape">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Create Link</h2>
            <button type="button" onClick={closeCreateLinkModal}>
              <X className="size-5 text-zinc-400" />
            </button>
          </div>
          <p className="text-sm text-zinc-400">
            All guests can see the important links.
          </p>
        </div>

        <div className="space-y-3">
          <Input
            Icon={Tag}
            name="title"
            placeholder="Link title"
            variant="filled"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />

          <Input
            Icon={Link2}
            name="link"
            placeholder="URL"
            variant="filled"
            value={url}
            onChange={(event) => setUrl(event.target.value)}
          />

          <Button
            size="full"
            onClick={createLink}
            disabled={!isValidUrl(url) || !title}
          >
            Create Link
          </Button>
        </div>
      </div>
    </div>
  );
}
