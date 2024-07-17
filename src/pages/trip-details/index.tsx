import { message } from "antd";
import { isAxiosError } from "axios";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "../../components/button";
import { api } from "../../lib/axios";
import { Activity } from "../../types/activity";
import { Link } from "../../types/links";
import { Trip } from "../../types/trip";
import { Activities } from "./activities";
import { CreateActivityModal } from "./create-activity-modal";
import { DestinationAndDateHeader } from "./destination-and-date-header";
import { Guests } from "./guests";
import { RelevantLinks } from "./relevant-links";

export function TripDetailsPage() {
  const { tripId } = useParams();
  const navigate = useNavigate();

  const [trip, setTrip] = useState<Trip | undefined>(undefined);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [links, setLinks] = useState<Link[]>([]);
  const [messageApi, contextHolder] = message.useMessage();

  const [isCreateActivityModalOpen, setIsCreateActivityModalOpen] =
    useState(false);

  function openCreateActivityModal() {
    setIsCreateActivityModalOpen(true);
  }

  function closeCreateActivityModal() {
    setIsCreateActivityModalOpen(false);
  }

  async function fetchTrip() {
    api
      .get(`/trips/${tripId}`)
      .then((response) => setTrip(response.data.trip))
      .catch((error: any) => {
        if (isAxiosError(error) && error.response) {
          const errorMessage = error.response.data.message;
          messageApi.open({
            type: "error",
            content: `Error while fetching trip${errorMessage && ": " + errorMessage}`,
          });
        } else {
          console.error(error);
        }
        navigate("/404");
      });
  }

  async function fetchActivities() {
    api
      .get(`/trips/${tripId}/activities`)
      .then((response) => setActivities(response.data.activities))
      .catch((error: any) => {
        if (isAxiosError(error) && error.response) {
          const errorMessage = error.response.data.message;
          messageApi.open({
            type: "error",
            content: `Error while fetching activities${errorMessage && ": " + errorMessage}`,
          });
        } else {
          console.error(error);
        }
      });
  }

  async function fetchLinks() {
    api
      .get(`/trips/${tripId}/links`)
      .then((response) => setLinks(response.data.links))
      .catch((error: any) => {
        if (isAxiosError(error) && error.response) {
          const errorMessage = error.response.data.message;
          messageApi.open({
            type: "error",
            content: `Error while fetching links${errorMessage && ": " + errorMessage}`,
          });
        } else {
          console.error(error);
        }
      });
  }

  useEffect(() => {
    fetchTrip();
    fetchActivities();
    fetchLinks();
  }, [tripId]);

  if (!trip) return;

  return (
    <>
      {contextHolder}
      <div className="mx-auto max-w-6xl space-y-8 px-6 py-10">
        <DestinationAndDateHeader trip={trip} fetchTrip={fetchTrip} />

        <main className="flex gap-16 px-4">
          <div className="flex-1 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-semibold">Activities</h2>

              <Button onClick={openCreateActivityModal}>
                <Plus className="size-5" />
                Create activity
              </Button>
            </div>

            <Activities
              activities={activities}
              fetchActivities={fetchActivities}
            />
          </div>

          <div className="w-80 space-y-6">
            <RelevantLinks links={links} fetchLinks={fetchLinks} />

            <div className="h-px w-full bg-zinc-800" />

            <Guests />
          </div>
        </main>

        {isCreateActivityModalOpen && (
          <CreateActivityModal
            isOpen={isCreateActivityModalOpen}
            closeCreateActivityModal={closeCreateActivityModal}
            trip={trip}
            fetchActivities={fetchActivities}
          />
        )}
      </div>
    </>
  );
}
