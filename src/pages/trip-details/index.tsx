import { Calendar, CircleCheck, CircleDashed, Link2, MapPin, Plus, Settings2, Tag, UserCog, X } from "lucide-react";
import { useState } from "react";

export function TripDetailsPage() {
  const [isCreateActivityModalOpen, setIsCreateActivityModalOpen] = useState(false)

  function openCreateActivityModal() {
    setIsCreateActivityModalOpen(true)
  }

  function closeCreateActivityModal() {
    setIsCreateActivityModalOpen(false)
  }

  return (
    <div className="max-w-6xl px-6 py-10 mx-auto space-y-8">
      <div className="px-4 h-16 rounded-xl bg-zinc-900 shadow-shape flex items-center justify-between">
        <div className="flex items-center gap-2">
          <MapPin className="size-5 text-zinc-400" />
          <span className="text-lg text-zinc-100">Fortaleza, Brasil</span>
        </div>

        <div className="flex items-center gap-5">
          <div className="flex items-center gap-2">
            <Calendar className="size-5 text-zinc-400" />
            <span className="text-m text-zinc-100">17 a 23 de Agosto</span>
          </div>

          <div className="w-px h-6 bg-zinc-800" />

          <button className="bg-zinc-800 text-zinc-200 rounded-lg px-5 py-2 font-medium flex items-center gap-2 hover:bg-zinc-700">
            Change info
            <Settings2 className="size-5" />
          </button>
        </div>
      </div>

      <main className="flex gap-16 px-4">
        <div className="flex-1 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-semibold">Activities</h2>
            <button onClick={openCreateActivityModal} className="bg-lime-300 text-lime-950 rounded-lg px-5 py-2 font-medium flex items-center gap-2 hover:bg-lime-400">
              <Plus className="sice-5" />
              Create activity
            </button>
          </div>

          <div className="space-y-8">
            <div className="space-y-2.5">
              <div className="flex gap-2 items-baseline">
                <span className="text-xl text-zinc-300 font-semibold">August 17th</span>
                <span className="text-xs text-zinc-500">Monday</span>
              </div>
              <p className="text-zinc-500 text-sm">No activities registered for this day yet.</p>
            </div>

            <div className="space-y-2.5">
              <div className="flex gap-2 items-baseline">
                <span className="text-xl text-zinc-300 font-semibold">August 18th</span>
                <span className="text-xs text-zinc-500">Tuesday</span>
              </div>
              <div className="space-y-2.5">
                <div className="px-4 py-2.5 bg-zinc-900 rounded-xl shadow-shape flex items-center gap-3">
                  <CircleCheck className="size-5 text-lime-300" />
                  <span className="text-zinc-100">Beach Park with friends!</span>
                  <span className="text-zinc-400 text-sm ml-auto">08:30h</span>
                </div>
              </div>
              <div className="space-y-2.5">
                <div className="px-4 py-2.5 bg-zinc-900 rounded-xl shadow-shape flex items-center gap-3">
                  <CircleCheck className="size-5 text-lime-300" />
                  <span className="text-zinc-100">Beach Park with friends!</span>
                  <span className="text-zinc-400 text-sm ml-auto">08:30h</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-80 space-y-6">
          <div className="space-y-5">
            <h2 className="font-semibold text-2xl">Relevant Links</h2>
            <div className="space-y-5">
              <div className="flex items-center justify-between gap-4">
                <div className="space-y-1.5">
                  <span className="block font-medium text-zinc-100">Airbnb reservation</span>
                  <a href="#" className="block text-xs text-zinc-400 truncate hover:text-zinc-200">
                    https://airbnb.com/rooms/1047018923791273891723981928370011
                  </a>
                </div>
                <Link2 className="text-zinc-400 size-5 shrink-0"/>
              </div>
              <div className="flex items-center justify-between gap-4">
                <div className="space-y-1.5">
                  <span className="block font-medium text-zinc-100">Airbnb reservation</span>
                  <a href="#" className="block text-xs text-zinc-400 truncate hover:text-zinc-200">
                    https://airbnb.com/rooms/1047018923791273891723981928370011
                  </a>
                </div>
                <Link2 className="text-zinc-400 size-5 shrink-0"/>
              </div>
            </div>
            <button className="bg-zinc-800 text-zinc-200 rounded-lg px-5 h-11 font-medium flex items-center gap-2 w-full justify-center hover:bg-zinc-700">
              <Plus className="size-5" />
              Add new link
            </button>
          </div>

          <div className="w-full h-px bg-zinc-800" />

          <div className="space-y-5">
            <h2 className="font-semibold text-2xl">Guests</h2>
            <div className="space-y-5">
              <div className="flex items-center justify-between gap-4">
                <div className="space-y-1.5">
                  <span className="block font-medium text-zinc-100">Helder Costa</span>
                  <span className="block text-sm text-zinc-400 truncate">
                    heldercostaaa@gmai.com
                  </span>
                </div>
                <CircleDashed className="text-zinc-400 size-5 shrink-0"/>
              </div>
              <div className="flex items-center justify-between gap-4">
                <div className="space-y-1.5">
                  <span className="block font-medium text-zinc-100">Giovanna Uyeda</span>
                  <span className="block text-sm text-zinc-400 truncate">
                    gi.uyeda@gmail.com
                  </span>
                </div>
                <CircleDashed className="text-zinc-400 size-5 shrink-0"/>
              </div>
            </div>
            <button className="bg-zinc-800 text-zinc-200 rounded-lg px-5 h-11 font-medium flex items-center gap-2 w-full justify-center hover:bg-zinc-700">
              <UserCog className="size-5" />
              Manage guests
            </button>
          </div>
        </div>
      </main>

      {isCreateActivityModalOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
          <div className="w-[480px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">
                  Create activity
                </h2>
                <button type="button" onClick={closeCreateActivityModal}>
                  <X className="size-5 text-zinc-400" />
                </button>
              </div>
              <p className="text-sm text-zinc-400">
                All guests can see the activities.
              </p>
            </div>

            <form className="space-y-3">
              <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
                <Tag className="text-zinc-400 size-5" />
                <input
                  name="title"
                  placeholder="What is the activity?"
                  className="bg-transparent text-lg placeholder-zinc-400 w-40 outline-none flex-1"
                />
              </div>

              <div className="flex items-center gap-2">
                <div className="h-14 flex-1 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
                  <Calendar className="text-zinc-400 size-5" />
                  <input
                    type="datetime-local"
                    name="occursAt"
                    placeholder="Activity date and time"
                    className="bg-transparent text-lg placeholder-zinc-400 w-40 outline-none flex-1"
                  />
                </div>
              </div>

              <button type="submit" className="bg-lime-300 w-full justify-center text-lime-950 rounded-lg px-5 h-11 font-medium flex items-center gap-2 hover:bg-lime-400">
                Create activity
                <Plus className="size-5" />
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
