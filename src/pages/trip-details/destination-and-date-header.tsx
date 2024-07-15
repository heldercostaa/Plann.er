import { Calendar, MapPin, Settings2 } from "lucide-react";
import { useState } from "react";
import { Button } from "../../components/button";
import { dayjs } from "../../lib/dayjs";
import { Trip } from "../../types/trip";
import { formatDates } from "../../utils/formatDate";
import { ChangeTripModal } from "./change-trip-modal";

interface DestinationAndDateHeaderProps {
  trip: Trip;
}

export function DestinationAndDateHeader({
  trip,
}: DestinationAndDateHeaderProps) {
  const [isChangeTripModalOpen, setIsChangeTripModalOpen] = useState(false);

  function openChangeTripModal() {
    setIsChangeTripModalOpen(true);
  }

  function closeChangeTripModal() {
    setIsChangeTripModalOpen(false);
  }

  const formattedDate = formatDates({
    startsAt: dayjs(trip.startsAt),
    endsAt: dayjs(trip.endsAt),
  });

  return (
    <div className="flex h-16 items-center justify-between rounded-xl bg-zinc-900 px-4 shadow-shape">
      <div className="flex items-center gap-2">
        <MapPin className="size-5 text-zinc-400" />
        <span className="text-lg text-zinc-100">{trip.destination}</span>
      </div>

      <div className="flex items-center gap-5">
        <div className="flex items-center gap-2">
          <Calendar className="size-5 text-zinc-400" />
          <span className="text-m text-zinc-100">{formattedDate}</span>
        </div>

        <div className="h-6 w-px bg-zinc-800" />

        <Button onClick={openChangeTripModal} variant="secondary">
          Change info
          <Settings2 className="size-5" />
        </Button>

        {isChangeTripModalOpen && (
          <ChangeTripModal
            closeChangeTripModal={closeChangeTripModal}
            trip={trip}
            isOpen={isChangeTripModalOpen}
          />
        )}
      </div>
    </div>
  );
}
