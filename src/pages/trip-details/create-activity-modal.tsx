import { DatePicker } from "antd";
import dayjs, { Dayjs } from "dayjs";
import { Calendar, Tag, X } from "lucide-react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "../../components/button";
import { Input } from "../../components/input";
import { Modal } from "../../components/modal";
import { api } from "../../lib/axios";
import { Trip } from "../../types/trip";

interface CreateActivityModalProps {
  closeCreateActivityModal: () => void;
  trip: Trip;
}

export function CreateActivityModal({
  closeCreateActivityModal,
  trip,
}: CreateActivityModalProps) {
  const { tripId } = useParams();

  const [title, setTitle] = useState("");
  const [occursAt, setOccursAt] = useState<Dayjs | undefined>(undefined);
  const [isCalendarInputFocused, setIsCalendarInputFocused] = useState(false);

  async function createActivity() {
    if (!title) return;
    if (!occursAt) return;

    await api.post(`/trips/${tripId}/activities`, {
      title,
      occursAt: occursAt.toISOString(),
    });

    window.document.location.reload();
  }

  return (
    <Modal>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Create activity</h2>
          <button type="button" onClick={closeCreateActivityModal}>
            <X className="size-5 text-zinc-400" />
          </button>
        </div>
        <p className="text-sm text-zinc-400">
          All guests can see and add activities.
        </p>
      </div>

      <div className="space-y-3">
        <Input
          Icon={Tag}
          name="title"
          placeholder="What is the activity?"
          variant="filled"
          onChange={(event) => setTitle(event.target.value)}
        />

        <div
          className={`flex h-14 items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-950 px-5 ${isCalendarInputFocused && "border-lime-300"}`}
        >
          <Calendar className="size-5 text-zinc-400" />
          <DatePicker
            size="large"
            variant="borderless"
            showTime={{ use12Hours: false }}
            minDate={dayjs(trip.startsAt)}
            maxDate={dayjs(trip.endsAt)}
            format={`MMMM Do [at] H:mm[h] (dddd)`}
            showSecond={false}
            minuteStep={5}
            suffixIcon={<Calendar />}
            value={occursAt}
            onChange={setOccursAt}
            placeholder="Pick date and time"
            className="flex-1 p-0 text-white"
            inputReadOnly
            onBlur={() => setIsCalendarInputFocused(false)}
            onFocus={() => setIsCalendarInputFocused(true)}
          />
        </div>

        <Button
          size="full"
          onClick={createActivity}
          disabled={!occursAt || !title}
        >
          Create activity
        </Button>
      </div>
    </Modal>
  );
}
