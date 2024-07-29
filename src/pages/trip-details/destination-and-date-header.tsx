import { Calendar, MapPin, Settings2 } from "lucide-react";
import { useState } from "react";
import { Button } from "../../components/button";
import { dayjs } from "../../lib/dayjs";
import { Trip } from "../../types/trip";
import { formatDates } from "../../utils/formatDate";
import { UpdateTripModal } from "./update-trip-modal";

interface DestinationAndDateHeaderProps {
  trip: Trip;
  fetchTrip: () => void;
  fetchActivities: () => void;
}

export function DestinationAndDateHeader({
  trip,
  fetchTrip,
  fetchActivities,
}: DestinationAndDateHeaderProps) {
  const [isUpdateTripModalOpen, setIsUpdateTripModalOpen] = useState(false);

  function openUpdateTripModal() {
    setIsUpdateTripModalOpen(true);
  }

  function closeUpdateTripModal() {
    setIsUpdateTripModalOpen(false);
  }

  const formattedDate = formatDates({
    startsAt: dayjs.utc(trip.startsAt),
    endsAt: dayjs.utc(trip.endsAt),
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

        <Button onClick={openUpdateTripModal} variant="secondary">
          Change info
          <Settings2 className="size-5" />
        </Button>

        {isUpdateTripModalOpen && (
          <UpdateTripModal
            fetchTrip={fetchTrip}
            fetchActivities={fetchActivities}
            closeUpdateTripModal={closeUpdateTripModal}
            trip={trip}
            isOpen={isUpdateTripModalOpen}
          />
        )}
      </div>
    </div>
  );
}
