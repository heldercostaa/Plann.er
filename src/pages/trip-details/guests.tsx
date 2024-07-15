import { CheckCircle2, CircleDashed, UserCog } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "../../components/button";
import { api } from "../../lib/axios";
import { Participant } from "../../types/participant";
import { ManageGuestsModal } from "./manage-guests-modal";

export function Guests() {
  const { tripId } = useParams();
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [isManageGuestsModalOpen, setIsManageGuestsModalOpen] = useState(false);

  function openManageGuestsModal() {
    setIsManageGuestsModalOpen(true);
  }

  function closeManageGuestsModal() {
    setIsManageGuestsModalOpen(false);
  }

  useEffect(() => {
    api.get(`/trips/${tripId}/participants`).then((response) => {
      setParticipants(response.data.participants);
    });
  }, [tripId]);

  return (
    <div className="space-y-5">
      <h2 className="text-2xl font-semibold">Guests</h2>
      <div className="space-y-5">
        {participants?.map(({ id, email, name, isConfirmed }, index) => {
          return (
            <div key={id} className="flex items-center justify-between gap-4">
              <div className="space-y-1.5">
                <span className="block font-medium text-zinc-100">
                  {name ?? `Guest ${index}`}
                </span>
                <span className="block truncate text-sm text-zinc-400">
                  {email}
                </span>
              </div>
              {isConfirmed ? (
                <CheckCircle2 className="size-5 shrink-0 text-green-400" />
              ) : (
                <CircleDashed className="size-5 shrink-0 text-zinc-400" />
              )}
            </div>
          );
        })}
      </div>
      <Button variant="secondary" size="full" onClick={openManageGuestsModal}>
        <UserCog className="size-5" />
        Manage guests
      </Button>

      {isManageGuestsModalOpen && (
        <ManageGuestsModal
          closeManageGuestsModal={closeManageGuestsModal}
          participants={participants}
          isOpen={isManageGuestsModalOpen}
        />
      )}
    </div>
  );
}
