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
import { Spin } from "../../components/spin";

interface UpdateTripModalProps {
  closeUpdateTripModal: () => void;
  trip: Trip;
  isOpen: boolean;
  fetchTrip: () => void;
}

export function UpdateTripModal({
  closeUpdateTripModal,
  trip,
  isOpen,
  fetchTrip,
}: UpdateTripModalProps) {
  const { tripId } = useParams();

  const [destination, setDestination] = useState(trip.destination);
  const [dateRange, setDateRange] = useState<
    [Dayjs | null, Dayjs | null] | null
  >([dayjs(trip.startsAt), dayjs(trip.endsAt)]);
  const [isDateInputFocused, setIsDateInputFocused] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  async function updateTrip() {
    if (!destination) return;
    if (!dateRange) return;
    const [startsAt, endsAt] = dateRange;

    setIsLoading(true);
    try {
      await api.put(`/trips/${tripId}`, {
        destination,
        startsAt,
        endsAt,
      });

      fetchTrip();
      closeUpdateTripModal();
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Modal onClose={closeUpdateTripModal} isOpen={isOpen}>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Change trip information</h2>
          <button type="button" onClick={closeUpdateTripModal}>
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
          className={`flex h-14 flex-1 items-center gap-2 rounded-lg border bg-zinc-950 px-4 ${isDateInputFocused ? "border-lime-300" : "border-zinc-800"}`}
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

        <Spin isLoading={isLoading}>
          <Button
            size="full"
            onClick={updateTrip}
            disabled={!dateRange || !(destination.length >= 4 || isLoading)}
            tooltipMessage="Enter destination, start and end dates"
          >
            {!isLoading && "Update trip"}
          </Button>
        </Spin>
      </div>
    </Modal>
  );
}
