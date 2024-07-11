import { Calendar, MapPin, Settings2 } from "lucide-react";
import { Button } from "../../components/button";
import { Trip } from "../../types/trip";
import { formatDate } from "../../utils/formatDate";

interface DestinationAndDateHeaderProps {
  trip: Trip;
}

export function DestinationAndDateHeader({
  trip,
}: DestinationAndDateHeaderProps) {
  const formattedDate = formatDate({
    from: new Date(trip.startsAt),
    to: new Date(trip.endsAt),
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

        <Button variant="secondary">
          Change info
          <Settings2 className="size-5" />
        </Button>
      </div>
    </div>
  );
}
