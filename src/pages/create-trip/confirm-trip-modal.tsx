// prettier-ignore
import { Mail, User, X } from "lucide-react";
import { FormEvent } from "react";
import { Button } from "../../components/button";
import { Input } from "../../components/input";

interface ConfirmTripModalProps {
  closeConfirmTripModal: () => void;
  createTrip: (event: FormEvent<HTMLFormElement>) => void;
  setOwnerName: (name: string) => void;
  setOwnerEmail: (email: string) => void;
}

export function ConfirmTripModal({
  closeConfirmTripModal,
  createTrip,
  setOwnerName,
  setOwnerEmail,
}: ConfirmTripModalProps) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-md">
      <div className="w-[480px] space-y-5 rounded-xl bg-zinc-900 px-6 py-5 shadow-shape">
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
            placeholder="Your full name"
            onChange={(event) => setOwnerName(event.target.value)}
            variant="filled"
          />

          <Input
            Icon={Mail}
            type="email"
            name="email"
            placeholder="Your personal email"
            onChange={(event) => setOwnerEmail(event.target.value)}
            variant="filled"
          />

          <Button type="submit" size="full">
            Confirm trip creation
          </Button>
        </form>
      </div>
    </div>
  );
}
