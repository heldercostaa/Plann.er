import { message } from "antd";
import { isAxiosError } from "axios";
import { Dayjs } from "dayjs";
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../lib/axios";
import { isEmailValid } from "../../utils/validateEmail";
import { ConfirmTripModal } from "./confirm-trip-modal";
import { InviteGuestsModal } from "./invite-guests-modal";
import { DestinationAndDateStep } from "./steps/destination-and-date-step";
import { InviteGuestsStep } from "./steps/invite-guests-step";

export function CreateTripPage() {
  const navigate = useNavigate();

  const [isGuestsInputOpen, setIsGuestsInputOpen] = useState(false);
  const [isGuestsModalOpen, setIsGuestsModalOpen] = useState(false);
  const [isConfirmTripModalOpen, setIsConfirmTripModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const [destination, setDestination] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [ownerEmail, setOwnerEmail] = useState("");
  const [dateRange, setDateRange] = useState<
    [Dayjs | null, Dayjs | null] | null
  >(null);

  const [emailToInvite, setEmailToInvite] = useState("");
  const [emailsToInvite, setEmailsToInvite] = useState<string[]>([]);

  function openGuestsInput() {
    setIsGuestsInputOpen(true);
  }

  function closeGuestsInput() {
    setIsGuestsInputOpen(false);
  }

  function openGuestsModal() {
    setIsGuestsModalOpen(true);
  }

  function closeGuestsModal() {
    setIsGuestsModalOpen(false);
  }

  function openConfirmTripModal() {
    setIsConfirmTripModalOpen(true);
  }

  function closeConfirmTripModal() {
    setIsConfirmTripModalOpen(false);
  }

  function addNewEmailToInvite() {
    if (!emailToInvite) return;
    if (!isEmailValid(emailToInvite)) return;
    if (emailsToInvite.includes(emailToInvite)) return;

    setEmailsToInvite([...emailsToInvite, emailToInvite]);
    setEmailToInvite("");
  }

  function removeEmailFromInvites(emailToRemove: string) {
    const newEmailList = emailsToInvite.filter(
      (email) => email !== emailToRemove,
    );
    setEmailsToInvite(newEmailList);
  }

  async function createTrip(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!dateRange) return;
    const [startsAt, endsAt] = dateRange;

    if (!startsAt || !endsAt) return;
    if (!destination) return;
    if (!ownerName || !ownerEmail) return;
    if (emailsToInvite.length === 0) return;

    setIsLoading(true);
    try {
      const response = await api.post("/trips", {
        destination,
        startsAt,
        endsAt,
        emailsToInvite,
        ownerName,
        ownerEmail,
      });

      const { tripId } = response.data;
      navigate(`/trips/${tripId}`);
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        const errorMessage = error.response.data.message;
        messageApi.open({
          type: "error",
          content: `Error while creating trip${errorMessage && ": " + errorMessage}`,
        });
      } else {
        console.error(error);
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      {contextHolder}
      <div className="flex h-screen items-center justify-center bg-pattern bg-center bg-no-repeat">
        <div className="w-full max-w-3xl space-y-10 px-6 text-center">
          <div className="flex flex-col items-center gap-3">
            <img src={`/logo.svg`} alt="Plann.er" />
            <p className="text-lg text-zinc-300">
              Invite your friends and plan your own trips!
            </p>
          </div>

          <div className="space-y-4">
            <DestinationAndDateStep
              isGuestsInputOpen={isGuestsInputOpen}
              closeGuestsInput={closeGuestsInput}
              openGuestsInput={openGuestsInput}
              setDestination={setDestination}
              setDateRange={setDateRange}
              dateRange={dateRange}
              destination={destination}
            />

            {isGuestsInputOpen && (
              <InviteGuestsStep
                emailsToInvite={emailsToInvite}
                openConfirmTripModal={openConfirmTripModal}
                openGuestsModal={openGuestsModal}
              />
            )}
          </div>

          {/* prettier-ignore */}
          <p className="text-zinc-500 text-sm ">
          By planning your trip with Plann.er you automatically agree <br />
          with our <a className="text-zinc-300 underline" href="#"> terms of use</a> and <a className="text-zinc-300 underline" href="#">privacy policies</a>.
        </p>
        </div>

        {isGuestsModalOpen && (
          <InviteGuestsModal
            isOpen={isGuestsModalOpen}
            closeGuestsModal={closeGuestsModal}
            emailToInvite={emailToInvite}
            setEmailToInvite={setEmailToInvite}
            emailsToInvite={emailsToInvite}
            addNewEmailToInvite={addNewEmailToInvite}
            removeEmailFromInvites={removeEmailFromInvites}
          />
        )}

        {isConfirmTripModalOpen && (
          <ConfirmTripModal
            isOpen={isConfirmTripModalOpen}
            closeConfirmTripModal={closeConfirmTripModal}
            createTrip={createTrip}
            setOwnerName={setOwnerName}
            setOwnerEmail={setOwnerEmail}
            isLoading={isLoading}
          />
        )}
      </div>
    </>
  );
}
