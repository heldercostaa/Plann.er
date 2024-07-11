import { ArrowRight, Calendar, MapPin, Settings2, X } from "lucide-react";
import { useState } from "react";
import { DateRange, DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { Button } from "../../../components/button";
import { formatDate } from "../../../utils/formatDate";

interface DestinationAndDateStepProps {
  isGuestsInputOpen: boolean;
  closeGuestsInput: () => void;
  openGuestsInput: () => void;
  setDestination: (destination: string) => void;
  setDateRange: (dates?: DateRange) => void;
  dateRange?: DateRange;
}

export function DestinationAndDateStep({
  isGuestsInputOpen,
  closeGuestsInput,
  openGuestsInput,
  setDestination,
  setDateRange,
  dateRange,
}: DestinationAndDateStepProps) {
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

  function openDatePicker() {
    return setIsDatePickerOpen(true);
  }

  function closeDatePicker() {
    return setIsDatePickerOpen(false);
  }

  return (
    <div className="flex h-16 items-center gap-3 rounded-xl bg-zinc-900 px-4 shadow-shape">
      <div className="flex flex-1 items-center gap-2">
        <MapPin className="size-5 text-zinc-400" />
        <input
          disabled={isGuestsInputOpen}
          type="text"
          placeholder="Where are you going?"
          className="flex-1 bg-transparent text-lg placeholder-zinc-400 outline-none"
          onChange={(event) => setDestination(event.target.value)}
        />
      </div>

      <button
        onClick={openDatePicker}
        disabled={isGuestsInputOpen}
        className="flex items-center gap-2 text-left outline-none"
      >
        <Calendar className="size-5 text-zinc-400" />
        <span className="text-s w-32 flex-1 text-zinc-400">
          {formatDate(dateRange)}
        </span>
      </button>

      {isDatePickerOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60">
          <div className="space-y-5 rounded-xl bg-zinc-900 px-6 py-5 shadow-shape">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Select the date</h2>
                <button type="button" onClick={closeDatePicker}>
                  <X className="size-5 text-zinc-400" />
                </button>
              </div>
            </div>

            <DayPicker
              mode="range"
              selected={dateRange}
              onSelect={setDateRange}
            />
          </div>
        </div>
      )}

      <div className="h-6 w-px bg-zinc-800" />

      {isGuestsInputOpen ? (
        <Button onClick={closeGuestsInput} variant="secondary">
          Change info
          <Settings2 className="size-5" />
        </Button>
      ) : (
        <Button onClick={openGuestsInput}>
          Continue
          <ArrowRight className="sice-5" />
        </Button>
      )}
    </div>
  );
}
