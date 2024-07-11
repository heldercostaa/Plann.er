import { CheckCircle2, CircleDashed, UserCog } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "../../components/button";
import { api } from "../../lib/axios";

interface Participant {
  id: string;
  name: string | null;
  email: string;
  is_confirmed: boolean;
}

export function Guests() {
  const { tripId } = useParams();
  const [participants, setParticipants] = useState<Participant[]>([]);

  useEffect(() => {
    api.get(`/trips/${tripId}/participants`).then((response) => {
      const participants = response.data.participants;

      setParticipants(participants);
    });
  }, [tripId]);

  return (
    <div className="space-y-5">
      <h2 className="text-2xl font-semibold">Guests</h2>
      <div className="space-y-5">
        {participants?.map(({ id, email, name, is_confirmed }, index) => {
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
              {is_confirmed ? (
                <CheckCircle2 className="size-5 shrink-0 text-green-400" />
              ) : (
                <CircleDashed className="size-5 shrink-0 text-zinc-400" />
              )}
            </div>
          );
        })}
      </div>

      <Button variant="secondary" size="full">
        <UserCog className="size-5" />
        Manage guests
      </Button>
    </div>
  );
}
