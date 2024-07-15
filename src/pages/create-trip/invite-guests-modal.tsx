import { AtSign, Plus, X } from "lucide-react";
import { useState } from "react";
import { Button } from "../../components/button";
import { Input } from "../../components/input";
import { Modal } from "../../components/modal";
import { isEmailValid } from "../../utils/validateEmail";

interface InviteGuestsModalProps {
  closeGuestsModal: () => void;
  emailToInvite: string;
  setEmailToInvite: (emailToInvite: string) => void;
  emailsToInvite: string[];
  addNewEmailToInvite: () => void;
  removeEmailFromInvites: (email: string) => void;
  isOpen: boolean;
}

export function InviteGuestsModal({
  closeGuestsModal,
  emailToInvite,
  setEmailToInvite,
  emailsToInvite,
  addNewEmailToInvite,
  removeEmailFromInvites,
  isOpen,
}: InviteGuestsModalProps) {
  const [isEmailInputFocused, setIsEmailInputFocused] = useState(false);

  return (
    <Modal variant="medium" onClose={closeGuestsModal} isOpen={isOpen}>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Invite guests</h2>
          <button type="button" onClick={closeGuestsModal}>
            <X className="size-5 text-zinc-400" />
          </button>
        </div>
        {/* prettier-ignore */}
        <p className="text-sm text-zinc-400">
            The guests will receive an email to confirm their participation in the trip.
          </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {emailsToInvite.map((email) => {
          return (
            <div
              key={email}
              className="flex items-center gap-2 rounded-md bg-zinc-800 px-2.5 py-1.5"
            >
              <span className="text-sinc-300">{email}</span>
              <button
                type="button"
                onClick={() => removeEmailFromInvites(email)}
              >
                <X className="size-4 text-zinc-400" />
              </button>
            </div>
          );
        })}
      </div>

      {emailsToInvite.length > 0 && <div className="h-px w-full bg-zinc-800" />}

      <div
        className={`flex items-center gap-2 rounded-lg border bg-zinc-950 px-4 py-2.5 ${isEmailInputFocused ? "border-lime-300" : "border-zinc-800"}`}
      >
        <Input
          Icon={AtSign}
          placeholder="Enter guest's email"
          stretch="full"
          value={emailToInvite}
          onChange={(event) => setEmailToInvite(event.target.value)}
          onKeyDown={({ key }) => key === "Enter" && addNewEmailToInvite()}
          onBlur={() => setIsEmailInputFocused(false)}
          onFocus={() => setIsEmailInputFocused(true)}
        />
        <Button
          onClick={addNewEmailToInvite}
          disabled={!isEmailValid(emailToInvite)}
          tooltipMessage="Enter guest's email"
        >
          Invite
          <Plus className="size-5 min-h-5" />
        </Button>
      </div>
    </Modal>
  );
}
