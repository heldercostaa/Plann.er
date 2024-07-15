import { DatePicker, Tooltip } from "antd";
import { Dayjs } from "dayjs";
import { ArrowRight, Calendar, Settings2 } from "lucide-react";
import { Button } from "../../../components/button";
import { LocationDropdown } from "../../../components/location-dropdown";

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
      <LocationDropdown
        destination={destination}
        setDestination={setDestination}
        disabled={isGuestsInputOpen}
        inputVariant="borderless"
        placeholder="Where are you going?"
      />

      <div className="flex flex-1 items-center gap-2">
        <Calendar className="size-5 text-zinc-400" />
        <DatePicker.RangePicker
          size="small"
          variant="borderless"
          disabled={isGuestsInputOpen}
          format={`ll`}
          suffixIcon
          value={dateRange}
          onChange={setDateRange}
          className="w-60 p-0 text-white placeholder-zinc-400"
          inputReadOnly
        />
      </div>

      <Tooltip
        title={
          !dateRange || !(destination?.length >= 4)
            ? "Enter destination, start and end dates"
            : ""
        }
        placement="bottom"
        color="#ef4444"
      >
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
      </Tooltip>
    </div>
  );
}
