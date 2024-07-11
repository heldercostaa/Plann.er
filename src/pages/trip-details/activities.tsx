import { CircleCheck } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../lib/axios";

interface Activity {
  date: string;
  activities: {
    id: string;
    title: string;
    occursAt: string;
  }[];
}

export function Activities() {
  const { tripId } = useParams();
  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    api
      .get(`/trips/${tripId}/activities`)
      .then((response) => setActivities(response.data.participants));
  }, [tripId]);
  return (
    <div className="space-y-8">
      <div className="space-y-2.5">
        <div className="flex items-baseline gap-2">
          <span className="text-xl font-semibold text-zinc-300">
            August 17th
          </span>
          <span className="text-xs text-zinc-500">Monday</span>
        </div>
        <p className="text-sm text-zinc-500">
          No activities registered for this day yet.
        </p>
      </div>

      <div className="space-y-2.5">
        <div className="flex items-baseline gap-2">
          <span className="text-xl font-semibold text-zinc-300">
            August 18th
          </span>
          <span className="text-xs text-zinc-500">Tuesday</span>
        </div>
        <div className="space-y-2.5">
          <div className="flex items-center gap-3 rounded-xl bg-zinc-900 px-4 py-2.5 shadow-shape">
            <CircleCheck className="size-5 text-lime-300" />
            <span className="text-zinc-100">Beach Park with friends!</span>
            <span className="ml-auto text-sm text-zinc-400">08:30h</span>
          </div>
        </div>
        <div className="space-y-2.5">
          <div className="flex items-center gap-3 rounded-xl bg-zinc-900 px-4 py-2.5 shadow-shape">
            <CircleCheck className="size-5 text-lime-300" />
            <span className="text-zinc-100">Beach Park with friends!</span>
            <span className="ml-auto text-sm text-zinc-400">08:30h</span>
          </div>
        </div>
      </div>
    </div>
  );
}
