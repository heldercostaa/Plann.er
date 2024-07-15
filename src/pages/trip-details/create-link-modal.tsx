import { Link2, Tag, X } from "lucide-react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "../../components/button";
import { Input } from "../../components/input";
import { Modal } from "../../components/modal";
import { api } from "../../lib/axios";
import { isValidUrl } from "../../utils/validateUrl";
import { Spin } from "../../components/spin";

interface CreateLinkModalProps {
  closeCreateLinkModal: () => void;
  isOpen: boolean;
}

export function CreateLinkModal({
  closeCreateLinkModal,
  isOpen,
}: CreateLinkModalProps) {
  const { tripId } = useParams();

  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function createLink() {
    if (!title) return;
    if (!url) return;

    setIsLoading(true);
    try {
      await api.post(`/trips/${tripId}/links`, {
        title,
        url,
      });

      window.document.location.reload();
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Modal onClose={closeCreateLinkModal} isOpen={isOpen}>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Create Link</h2>
          <button type="button" onClick={closeCreateLinkModal}>
            <X className="size-5 text-zinc-400" />
          </button>
        </div>
        <p className="text-sm text-zinc-400">
          All guests can see and add relevant links.
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

        <Spin isLoading={isLoading}>
          <Button
            size="full"
            onClick={createLink}
            disabled={!isValidUrl(url) || !title || isLoading}
            tooltipMessage="Enter link title and valid URL"
          >
            {!isLoading && "Create Link"}
          </Button>
        </Spin>
      </div>
    </Modal>
  );
}
