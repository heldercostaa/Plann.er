// prettier-ignore
import { Mail, User, X } from "lucide-react";
import { FormEvent, useRef } from "react";
import { Button } from "../../components/button";
import { Input } from "../../components/input";
import { Modal } from "../../components/modal";
import { Spin } from "../../components/spin";
import { isEmailValid } from "../../utils/validateEmail";
import { Tooltip } from "../../components/tooltip";

interface ConfirmTripModalProps {
  isOpen: boolean;
  closeConfirmTripModal: () => void;
  createTrip: (event: FormEvent<HTMLFormElement>) => void;
  setOwnerName: (name: string) => void;
  setOwnerEmail: (email: string) => void;
  isLoading: boolean;
}

export function ConfirmTripModal({
  closeConfirmTripModal,
  createTrip,
  setOwnerName,
  setOwnerEmail,
  isOpen,
  isLoading,
}: ConfirmTripModalProps) {
  const nameInputRef = useRef<HTMLInputElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);

  function canConfirmTrip() {
    const name = nameInputRef.current?.value;
    const email = emailInputRef.current?.value;

    if (!name || !email) return false;
    if (!isEmailValid(email)) return false;

    return true;
  }

  const isConfirmTripDisabled = !canConfirmTrip() || isLoading;

  return (
    <Modal onClose={closeConfirmTripModal} isOpen={isOpen}>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Confirm trip creation</h2>
          <button type="button" onClick={closeConfirmTripModal}>
            <X className="size-5 text-zinc-400" />
          </button>
        </div>
        {/* prettier-ignore */}
        <p className="text-sm text-zinc-400">
            To complete the trip creation to <span className="font-semibold text-zinc-100">Fortaleza, Brasil</span> between <span className="font-semibold text-zinc-100">16 and 27 of August 2024</span>, fill your data below:
          </p>
      </div>

      <form onSubmit={createTrip} className="space-y-3">
        <Input
          Icon={User}
          name="name"
          placeholder="Your name"
          onChange={(event) => setOwnerName(event.target.value)}
          variant="filled"
          inputRef={nameInputRef}
        />

        <Input
          Icon={Mail}
          type="email"
          name="email"
          placeholder="Your email"
          onChange={(event) => setOwnerEmail(event.target.value)}
          variant="filled"
          inputRef={emailInputRef}
        />

        <Spin isLoading={isLoading}>
          <Button
            tooltipMessage="Enter name and valid email"
            type="submit"
            size="full"
            disabled={isConfirmTripDisabled}
          >
            {!isLoading && "Confirm trip creation"}
          </Button>
        </Spin>
      </form>
    </Modal>
  );
}
