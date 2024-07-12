import { DatePicker } from "antd";
import dayjs, { Dayjs } from "dayjs";
import { Calendar, Tag, X } from "lucide-react";
import { FormEvent, useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "../../components/button";
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
          <div className="flex h-14 items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-950 px-4">
            <Tag className="size-5 text-zinc-400" />
            <input
              name="title"
              placeholder="What is the activity?"
              className="w-40 flex-1 bg-transparent text-lg placeholder-zinc-400 outline-none"
            />
          </div>

          <div className="flex items-center gap-2">
            <div className="flex h-14 flex-1 items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-950 px-4">
              <Calendar className="size-5 text-zinc-400" />
              <DatePicker
                size="large"
                variant="borderless"
                showTime
                minDate={dayjs(trip.startsAt)}
                maxDate={dayjs(trip.endsAt)}
                format={`ddd, MMMM Do [at] h:mm A`}
                showSecond={false}
                minuteStep={5}
                suffixIcon
                value={occursAt}
                onChange={setOccursAt}
                placeholder="Pick a date and time"
                className="p-0 text-white"
              />
            </div>
          </div>

          <Button size="full">Create activity</Button>
        </form>
      </div>
    </div>
  );
}
