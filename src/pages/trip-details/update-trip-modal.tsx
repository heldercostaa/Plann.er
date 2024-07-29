import { DatePicker, message } from "antd";
import { Dayjs } from "dayjs";
import { Calendar, X } from "lucide-react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "../../components/button";
import { LocationDropdown } from "../../components/location-dropdown";
import { Modal } from "../../components/modal";
import { Spin } from "../../components/spin";
import { api } from "../../lib/axios";
import { dayjs } from "../../lib/dayjs";
import { Trip } from "../../types/trip";

interface UpdateTripModalProps {
  closeUpdateTripModal: () => void;
  trip: Trip;
  isOpen: boolean;
  fetchTrip: () => void;
  fetchActivities: () => void;
}

export function UpdateTripModal({
  closeUpdateTripModal,
  trip,
  isOpen,
  fetchTrip,
  fetchActivities,
}: UpdateTripModalProps) {
  const { tripId } = useParams();

  const [destination, setDestination] = useState(trip.destination);
  const [dateRange, setDateRange] = useState<
    [Dayjs | null, Dayjs | null] | null
  >([dayjs.utc(trip.startsAt), dayjs.utc(trip.endsAt)]);
  const [isDateInputFocused, setIsDateInputFocused] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

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
      fetchActivities();
      closeUpdateTripModal();
    } catch (error: any) {
      const errorMessage = error.response.data.message;
      messageApi.open({
        type: "error",
        content: `Error while updating trip${errorMessage && ": " + errorMessage}`,
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      {contextHolder}
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
          <LocationDropdown
            destination={destination}
            setDestination={setDestination}
            inputVariant="filled"
            placeholder="Trip destination"
          />

          <div
            className={`flex h-14 flex-1 items-center gap-2 rounded-lg border bg-zinc-950 px-4 transition-colors duration-300 ease-in-out ${isDateInputFocused ? "border-lime-300" : "border-zinc-800"}`}
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
    </>
  );
}
