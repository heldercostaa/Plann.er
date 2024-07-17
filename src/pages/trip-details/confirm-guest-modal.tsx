import { message } from "antd";
import { User, X } from "lucide-react";
import { useState } from "react";
import { Button } from "../../components/button";
import { Input } from "../../components/input";
import { Modal } from "../../components/modal";
import { Spin } from "../../components/spin";
import { api } from "../../lib/axios";

interface ConfirmGuestProps {
  closeConfirmGuestModal: () => void;
  isOpen: boolean;
  participantId?: string;
  fetchParticipants: () => void;
}

export function ConfirmGuestModal({
  closeConfirmGuestModal,
  isOpen,
  participantId,
  fetchParticipants,
}: ConfirmGuestProps) {
  const [participantName, setGuestName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  async function confirmGuest() {
    if (!participantId) return;
    if (!participantName) return;

    setIsLoading(true);
    try {
      await api.post(`/participants/${participantId}/confirm`, {
        name: participantName,
      });

      fetchParticipants();
      closeConfirmGuestModal();
    } catch (error: any) {
      const errorMessage = error.response.data.message;
      messageApi.open({
        type: "error",
        content: `Error while confirming guest${errorMessage && ": " + errorMessage}`,
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      {contextHolder}
      <Modal onClose={closeConfirmGuestModal} isOpen={isOpen}>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Confirm guest</h2>
            <button type="button" onClick={closeConfirmGuestModal}>
              <X className="size-5 text-zinc-400" />
            </button>
          </div>
          <p className="text-sm text-zinc-400">
            To confirm the guest, fill the name below:
          </p>
        </div>

        <div className="space-y-3">
          <Input
            Icon={User}
            name="title"
            placeholder="Guest name"
            variant="filled"
            value={participantName}
            onChange={(event) => setGuestName(event.target.value)}
            onKeyDown={({ key }) => key === "Enter" && confirmGuest()}
          />

          <Spin isLoading={isLoading}>
            <Button
              size="full"
              onClick={confirmGuest}
              disabled={!participantName || isLoading}
              tooltipMessage="Enter guest name"
            >
              {!isLoading && "Confirm guest"}
            </Button>
          </Spin>
        </div>
      </Modal>
    </>
  );
}
