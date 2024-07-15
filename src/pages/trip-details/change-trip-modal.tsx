import { DatePicker } from "antd";
import { Dayjs } from "dayjs";
import { Calendar, MapPin, X } from "lucide-react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "../../components/button";
import { Input } from "../../components/input";
import { Modal } from "../../components/modal";
import { api } from "../../lib/axios";
import { dayjs } from "../../lib/dayjs";
import { Trip } from "../../types/trip";

interface ChangeTripModalProps {
  closeChangeTripModal: () => void;
  trip: Trip;
  isOpen: boolean;
}

export function ChangeTripModal({
  closeChangeTripModal,
  trip,
  isOpen,
}: ChangeTripModalProps) {
  const { tripId } = useParams();

  const [destination, setDestination] = useState(trip.destination);
  const [dateRange, setDateRange] = useState<
    [Dayjs | null, Dayjs | null] | null
  >([dayjs(trip.startsAt), dayjs(trip.endsAt)]);
  const [isDateInputFocused, setIsDateInputFocused] = useState(false);

  async function changeTrip() {
    if (!destination) return;
    if (!dateRange) return;
    const [startsAt, endsAt] = dateRange;

    await api.put(`/trips/${tripId}`, {
      destination,
      startsAt,
      endsAt,
    });

    window.document.location.reload();
  }

  return (
    <Modal onClose={closeChangeTripModal} isOpen={isOpen}>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Change trip information</h2>
          <button type="button" onClick={closeChangeTripModal}>
            <X className="size-5 text-zinc-400" />
          </button>
        </div>
        <p className="text-sm text-zinc-400">
          Update your trip destination and/or dates.
        </p>
      </div>

      <div className="space-y-3">
        <Input
          Icon={MapPin}
          name="destination"
          placeholder="Trip destination"
          value={destination}
          variant="filled"
          onChange={(event) => setDestination(event.target.value)}
        />

        <div
          className={`flex h-14 flex-1 items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-950 px-4 ${isDateInputFocused && "border-lime-300"}`}
        >
          <Calendar className="size-5 text-zinc-400" />
          <DatePicker.RangePicker
            size="large"
            variant="borderless"
            format={`LL`}
            suffixIcon
            value={dateRange}
            onChange={setDateRange}
            className="p-0 text-white placeholder-zinc-400"
            inputReadOnly
            onBlur={() => setIsDateInputFocused(false)}
            onFocus={() => setIsDateInputFocused(true)}
          />
        </div>

        <Button
          size="full"
          onClick={changeTrip}
          disabled={!dateRange || !(destination.length >= 4)}
        >
          Update trip
        </Button>
      </div>
    </Modal>
  );
}
