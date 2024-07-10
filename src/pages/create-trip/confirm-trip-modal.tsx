// prettier-ignore
import { Mail, Plus, User, X } from "lucide-react"
import { FormEvent } from "react";
import { Button } from "../../components/button";

interface ConfirmTripModalProps {
  closeConfirmTripModal: () => void;
  createTrip: (event: FormEvent<HTMLFormElement>) => void;
}

export function ConfirmTripModal({
  closeConfirmTripModal,
  createTrip,
}: ConfirmTripModalProps) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60">
      <div className="w-[640px] space-y-5 rounded-xl bg-zinc-900 px-6 py-5 shadow-shape">
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
          <div className="flex h-14 items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-950 px-4">
            <User className="size-5 text-zinc-400" />
            <input
              name="name"
              placeholder="Your full name"
              className="w-40 flex-1 bg-transparent text-lg placeholder-zinc-400 outline-none"
            />
          </div>

          <div className="flex h-14 items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-950 px-4">
            <Mail className="size-5 text-zinc-400" />
            <input
              type="email"
              name="email"
              placeholder="Your personal email"
              className="w-40 flex-1 bg-transparent text-lg placeholder-zinc-400 outline-none"
            />
          </div>

          <Button type="submit" size="full">
            Confirm trip creation
            <Plus className="size-5" />
          </Button>
        </form>
      </div>
    </div>
  );
}
