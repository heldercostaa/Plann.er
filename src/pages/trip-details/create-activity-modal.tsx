import { DatePicker } from "antd";
import dayjs, { Dayjs } from "dayjs";
import { Calendar, Tag, X } from "lucide-react";
import { FormEvent, useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "../../components/button";
import { api } from "../../lib/axios";
import { Trip } from "../../types/trip";
import { Input } from "../../components/input";

interface CreateActivityModalProps {
  closeCreateActivityModal: () => void;
  trip: Trip;
}

export function CreateActivityModal({
  closeCreateActivityModal,
  trip,
}: CreateActivityModalProps) {
  const { tripId } = useParams();

  const [occursAt, setOccursAt] = useState<Dayjs | undefined>(undefined);

  async function createActivity(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    const title = data.get("title")?.toString();

    console.log(occursAt);

    if (!title) return;
    if (!occursAt) return;

    await api.post(`/trips/${tripId}/activities`, {
      title,
      occursAt: occursAt.toISOString(),
    });

    // TODO: Improve refresh page
    window.document.location.reload();
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-md">
      <div className="w-[480px] space-y-5 rounded-xl bg-zinc-900 px-6 py-5 shadow-shape">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Create activity</h2>
            <button type="button" onClick={closeCreateActivityModal}>
              <X className="size-5 text-zinc-400" />
            </button>
          </div>
          <p className="text-sm text-zinc-400">
            All guests can see the activities.
          </p>
        </div>

        <form onSubmit={createActivity} className="space-y-3">
          <Input
            Icon={Tag}
            name="title"
            placeholder="What is the activity?"
            variant="filled"
          />

          <div className="flex h-14 items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-950 px-5">
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
              placeholder="Pick a date and time"
              className="flex-1 p-0 text-white"
            />
          </div>

          <Button size="full">Create activity</Button>
        </form>
      </div>
    </div>
  );
}
