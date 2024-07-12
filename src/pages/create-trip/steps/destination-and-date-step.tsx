import { DatePicker } from "antd";
import dayjs, { Dayjs } from "dayjs";
import { ArrowRight, Calendar, MapPin, Settings2 } from "lucide-react";
import { Button } from "../../../components/button";

interface DestinationAndDateStepProps {
  isGuestsInputOpen: boolean;
  closeGuestsInput: () => void;
  openGuestsInput: () => void;
  setDestination: (destination: string) => void;
  setDateRange: (
    dateRange: [Dayjs | null, Dayjs | null] | null,
    dateString: [string, string],
  ) => void;
  dateRange: [Dayjs | null, Dayjs | null] | null;
}

export function DestinationAndDateStep({
  isGuestsInputOpen,
  closeGuestsInput,
  openGuestsInput,
  setDestination,
  setDateRange,
  dateRange,
}: DestinationAndDateStepProps) {
  return (
    <div className="flex h-16 items-center gap-2 rounded-xl bg-zinc-900 px-4 shadow-shape">
      <div className="flex w-64 items-center gap-2">
        <MapPin className="size-5 text-zinc-400" />
        <input
          disabled={isGuestsInputOpen}
          type="text"
          placeholder="Where are you going?"
          className="bg-transparent text-lg placeholder-zinc-400 outline-none"
          onChange={(event) => setDestination(event.target.value)}
        />
      </div>

      <div className="flex flex-1 items-center gap-2">
        <Calendar className="size-5 text-zinc-400" />
        <DatePicker.RangePicker
          size="small"
          variant="borderless"
          disabled={isGuestsInputOpen}
          minDate={dayjs()}
          format={`ll`}
          suffixIcon
          value={dateRange}
          onChange={setDateRange}
          className="w-60 p-0 text-white placeholder-zinc-400"
        />
      </div>

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
