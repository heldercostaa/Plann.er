import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../lib/axios";
import { Trip } from "../../types/trip";
import { Activities } from "./activities";
import { CreateActivityModal } from "./create-activity-modal";
import { DestinationAndDateHeader } from "./destination-and-date-header";
import { Guests } from "./guests";
import { RelevantLinks } from "./relevant-links";
import { Button } from "../../components/button";

export function TripDetailsPage() {
  const { tripId } = useParams();
  const [trip, setTrip] = useState<Trip | undefined>(undefined);

  const [isCreateActivityModalOpen, setIsCreateActivityModalOpen] =
    useState(false);

  function openCreateActivityModal() {
    setIsCreateActivityModalOpen(true);
  }

  function closeCreateActivityModal() {
    setIsCreateActivityModalOpen(false);
  }

  useEffect(() => {
    api.get(`/trips/${tripId}`).then((response) => setTrip(response.data.trip));
  }, [tripId]);

  if (!trip) return;

  return (
    <div className="mx-auto max-w-6xl space-y-8 px-6 py-10">
      <DestinationAndDateHeader trip={trip} />

      <main className="flex gap-16 px-4">
        <div className="flex-1 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-semibold">Activities</h2>

            <Button onClick={openCreateActivityModal}>
              <Plus className="size-5" />
              Create activity
            </Button>
          </div>

          <Activities />
        </div>

        <div className="w-80 space-y-6">
          <RelevantLinks />

          <div className="h-px w-full bg-zinc-800" />

          <Guests />
        </div>
      </main>

      {isCreateActivityModalOpen && (
        <CreateActivityModal
          closeCreateActivityModal={closeCreateActivityModal}
        />
      )}
    </div>
  );
}
