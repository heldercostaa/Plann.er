import { CircleAlert, CircleCheck, CircleDashed, Trash2 } from "lucide-react";
import { useState } from "react";
import { api } from "../../lib/axios";
import { dayjs } from "../../lib/dayjs";
import { Activity } from "../../types/activity";
import { Popconfirm } from "antd";

interface ActivitiesProps {
  activities: Activity[];
  fetchActivities: () => void;
}

export function Activities({ activities, fetchActivities }: ActivitiesProps) {
  const [isLoading, setIsLoading] = useState(false);

  function isPast(date: string) {
    return dayjs().isAfter(date) && !dayjs(date).isToday();
  }

  function isToday(date: string) {
    return dayjs(date).isToday();
  }

  function isFuture(date: string) {
    return dayjs().isBefore(date);
  }

  async function removeActivity(activityId: string) {
    if (!activityId) return;

    setIsLoading(true);
    try {
      await api.delete(`/activities/${activityId}`);

      fetchActivities();
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
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
                {dayjs(date).format("MMMM Do")}
              </span>
              <span className="text-xs text-zinc-500">
                {dayjs(date).format("dddd")}
              </span>
            </div>
            {activities.length > 0 ? (
              <>
                {activities.map(({ id, title, occursAt }) => {
                  return (
                    <div
                      key={id}
                      className="group flex items-center gap-3 rounded-xl bg-zinc-900 px-4 py-2.5 shadow-shape transition duration-300 ease-in-out hover:scale-105"
                    >
                      {isPast(occursAt) ? (
                        <CircleCheck className="size-5 text-lime-300" />
                      ) : (
                        <CircleDashed className="size-5 text-lime-300" />
                      )}
                      <span className="text-zinc-100">{title}</span>

                      <span className="ml-auto text-sm text-zinc-400">
                        {dayjs(occursAt).format("H:mm")}h
                      </span>

                      <Popconfirm
                        title="Remove activity"
                        description="Are you sure to remove this activity?"
                        okText="Yes"
                        cancelText="No"
                        icon={
                          <CircleAlert className="mr-2 size-6 text-red-600" />
                        }
                        onConfirm={() => removeActivity(id)}
                      >
                        <Trash2
                          className={`size-0 shrink-0 text-red-600 opacity-0 transition-opacity duration-500 ease-in group-hover:size-5 ${isLoading ? "cursor-wait group-hover:opacity-30" : "cursor-pointer group-hover:opacity-100"}`}
                        />
                      </Popconfirm>
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
