import { DatePicker } from "antd";
import dayjs, { Dayjs } from "dayjs";
import { ArrowRight, Calendar, MapPin, Settings2 } from "lucide-react";
import { Button } from "../../../components/button";
import { Input } from "../../../components/input";

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
  destination: string;
}

export function DestinationAndDateStep({
  isGuestsInputOpen,
  closeGuestsInput,
  openGuestsInput,
  setDestination,
  setDateRange,
  dateRange,
  destination,
}: DestinationAndDateStepProps) {
  return (
    <div className="flex h-16 items-center gap-2 rounded-xl bg-zinc-900 px-4 shadow-shape">
      <Input
        Icon={MapPin}
        type="text"
        disabled={isGuestsInputOpen}
        onChange={(event) => setDestination(event.target.value)}
        placeholder="Where are you going?"
      />

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
          inputReadOnly
        />
      </div>

      {isGuestsInputOpen ? (
        <Button onClick={closeGuestsInput} variant="secondary">
          Change info
          <Settings2 className="size-5" />
        </Button>
      ) : (
        <Button
          onClick={openGuestsInput}
          disabled={!dateRange || !(destination?.length >= 4)}
        >
          Continue
          <ArrowRight className="sice-5" />
        </Button>
      )}
    </div>
  );
}
