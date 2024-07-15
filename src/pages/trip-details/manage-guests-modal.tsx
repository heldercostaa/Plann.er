import {
  AtSign,
  CheckCircle2,
  CircleDashed,
  Plus,
  Trash2,
  X,
} from "lucide-react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "../../components/button";
import { Input } from "../../components/input";
import { Modal } from "../../components/modal";
import { Spin } from "../../components/spin";
import { api } from "../../lib/axios";
import { Participant } from "../../types/participant";
import { isEmailValid } from "../../utils/validateEmail";

interface ManageGuestsModalProps {
  closeManageGuestsModal: () => void;
  participants: Participant[];
  isOpen: boolean;
}

export function ManageGuestsModal({
  closeManageGuestsModal,
  participants,
  isOpen,
}: ManageGuestsModalProps) {
  const { tripId } = useParams();

  const [emailToInvite, setEmailToInvite] = useState("");
  const [isEmailInputFocused, setIsEmailInputFocused] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  async function removeParticipant(participantId: string) {
    if (!participantId) return;

    setIsLoading(true);
    try {
      await api.delete(`/participants/${participantId}`);

      window.document.location.reload();
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  async function inviteParticipant() {
    if (!emailToInvite) return;

    setIsLoading(true);
    try {
      await api.post(`/trips/${tripId}/invites`, {
        email: emailToInvite,
      });

      window.document.location.reload();
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Modal variant="medium" onClose={closeManageGuestsModal} isOpen={isOpen}>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Manage guests</h2>
          <button type="button" onClick={closeManageGuestsModal}>
            <X className="size-5 text-zinc-400" />
          </button>
        </div>
        <p className="text-sm text-zinc-400">Invite or remove your guests.</p>
      </div>

      <div className="rounded-lg border border-zinc-800 bg-zinc-950 p-4">
        {participants?.map(
          ({ id, email, name, isConfirmed, isOwner }, index) => {
            return (
              <div
                key={id}
                className="group flex flex-1 items-center justify-between gap-4 py-2.5"
              >
                <div className="space-y-1.5">
                  <span className="block font-medium text-zinc-100">
                    {name ?? `Guest ${index}`}
                  </span>
                  <span className="block truncate text-sm text-zinc-400">
                    {email}
                  </span>
                </div>

                {isOwner ? (
                  isConfirmed ? (
                    <CheckCircle2
                      className={`size-5 shrink-0 text-green-400`}
                    />
                  ) : (
                    <CircleDashed className={`size-5 shrink-0 text-zinc-400`} />
                  )
                ) : (
                  <div>
                    {isConfirmed ? (
                      <CheckCircle2
                        className={`size-5 shrink-0 text-green-400 opacity-100 transition-opacity ease-in group-hover:size-0 group-hover:opacity-0`}
                      />
                    ) : (
                      <CircleDashed
                        className={`size-5 shrink-0 text-zinc-400 opacity-100 transition-opacity ease-in group-hover:size-0 group-hover:opacity-0`}
                      />
                    )}
                    <Trash2
                      onClick={() => removeParticipant(id)}
                      className={`size-0 shrink-0 text-red-600 opacity-0 transition-opacity ease-in group-hover:size-5 ${isLoading ? "cursor-wait group-hover:opacity-30" : "cursor-pointer group-hover:opacity-100"}`}
                    />
                  </div>
                )}
              </div>
            );
          },
        )}
      </div>

      <div className="h-px w-full bg-zinc-800" />

      <div
        className={`flex items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-950 px-4 py-2.5 ${isEmailInputFocused && "border-lime-30"}`}
      >
        <Input
          Icon={AtSign}
          placeholder="Enter guest's email"
          stretch="full"
          value={emailToInvite}
          onChange={(event) => setEmailToInvite(event.target.value)}
          onKeyDown={({ key }) => key === "Enter" && inviteParticipant()}
          onBlur={() => setIsEmailInputFocused(false)}
          onFocus={() => setIsEmailInputFocused(true)}
        />
        <Spin isLoading={isLoading}>
          <Button
            size="small"
            onClick={inviteParticipant}
            disabled={
              !isEmailValid(emailToInvite) ||
              !!participants.find(({ email }) => email === emailToInvite) ||
              isLoading
            }
          >
            {!isLoading && (
              <>
                Invite
                <Plus className="size-5 min-h-5" />
              </>
            )}
          </Button>
        </Spin>
      </div>
    </Modal>
  );
}
