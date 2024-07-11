import { format } from "date-fns";
import { CircleCheck, CircleDashed, CloudCog } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../lib/axios";
import { dayjs } from "../../lib/dayjs";

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
      .then((response) => setActivities(response.data.activities));
  }, [tripId]);

  function isPast(date: string) {
    return dayjs().isAfter(date) && !dayjs(date).isToday();
  }

  function isToday(date: string) {
    return dayjs(date).isToday();
  }

  function isFuture(date: string) {
    return dayjs().isBefore(date);
  }

  return (
    <div className="space-y-8">
      {activities.map(({ date, activities }) => {
        return (
          <div
            key={date}
            className={`space-y-2.5 ${isPast(date) && "opacity-60"}`}
          >
            <div className="flex items-baseline gap-2">
              <span
                className={`text-xl font-semibold ${isPast(date) && "text-zinc-300"} ${isToday(date) && "text-zinc-50"} ${isFuture(date) && "text-zinc-400"}`}
              >
                {format(date, "MMMM do")}
              </span>
              <span className="text-xs text-zinc-500">
                {format(date, "cccc")}
              </span>
            </div>
            {activities.length > 0 ? (
              <>
                {activities.map(({ id, title, occursAt }) => {
                  return (
                    <div
                      key={id}
                      className="flex items-center gap-3 rounded-xl bg-zinc-900 px-4 py-2.5 shadow-shape"
                    >
                      {isPast(occursAt) ? (
                        <CircleCheck className="size-5 text-lime-300" />
                      ) : (
                        <CircleDashed className="size-5 text-lime-300" />
                      )}
                      <span className="text-zinc-100">{title}</span>
                      <span className="ml-auto text-sm text-zinc-400">
                        {format(occursAt, "H:mm")}h
                      </span>
                    </div>
                  );
                })}
              </>
            ) : (
              <p className="text-sm text-zinc-500">
                No activities registered for this day.
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}
