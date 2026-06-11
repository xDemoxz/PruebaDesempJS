import Sidebar from "@/components/Sidebar"
import { getSession, createReservationData } from "@/utils"
import { homeController } from "@/controllers/home.controller"

export default function homeView() {
  const user = getSession()

  setTimeout(() => {
    const modal = document.querySelector("#createReservationModal")
    homeController()

    document
      .querySelector("#gestionarReservasBtn")
      ?.addEventListener("click", () => {
        modal.classList.remove("hidden")
        modal.classList.add("block")
      })

    document.querySelector("#cancelar")?.addEventListener("click", () => {
      modal.classList.remove("block")
      modal.classList.add("hidden")
    })

    document
      .querySelector("#saveReservation")
      ?.addEventListener("submit", (e) => {
        e.preventDefault()

        const formData = new FormData(e.currentTarget)

        const data = {
          workspace: formData.get("campo"),
          date: formData.get("fecha"),
          startHour: formData.get("hora"),
          reason: formData.get("motivo"),
          status: formData.get("estado")
        }

        const { workspace, date, startHour, reason, status } = data

        if ([workspace, date, startHour, reason, status].includes("")) {
          return alert(
            "Coloca los datos que van en el formulario para poder realizar la reserva."
          )
        }

        createReservationData(data)

        modal.classList.remove("block")
        modal.classList.add("hidden")
      })
  })

  return `
    <div class="hidden p-10 max-w-md m-auto fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-auto bg-opacity-50 z-10 bg-white shadow-lg rounded-lg border border-gray-300" id="createReservationModal">
      <div>
        <form id="saveReservation">
          <div class="flex flex-col">
            <h2 class="text-2xl font-bold mb-5">
              Crear Reserva
            </h2>
          </div>
          <div class="flex flex-col">
            <input class="border text-black my-2 p-2" type="text" name="campo" placeholder="Campo">
            <input class="border text-black my-2 p-2" type="date" name="fecha" placeholder="Fecha">
            <input class="border text-black my-2 p-2" type="time" name="hora" placeholder="Hora">
            <input class="border text-black my-2 p-2" type="text" name="motivo" placeholder="Motivo">
            <input class="border text-black my-2 p-2" type="text" name="estado" placeholder="Estado">
            <button class="border border-blue-500 rounded-lg mb-2" type="submit">Guardar</button>
            <button class="border border-red-500 rounded-lg" type="button" id="cancelar">Cancelar</button>
          </div>
        </form>
      </div>
    </div>

    <div class="flex">

      ${Sidebar()}

      <main class="flex-1 p bg-slate-100 min-h-screen">

        <div class="">

          <h1 class="text-sm font-bold">
            Bienvenido ${user?.name}
          </h1>

          <p class="text-orange-900">
            Rol: ${user?.role}
          </p>

        </div>

        ${
          user?.role === "admin"
            ? `
              <section
                class="bg-white p-5 rounded-lg shadow mb-6"
              >
                <h2 class="font-bold text-xl mb-2">
                  Panel Administrador
                </h2>

                <p>
                  Puedes visualizar todas las reservas.
                </p>

                <button
                  class="mt-3 bg-blue-600 text-white px-4 py-2 rounded"
                  id="gestionarReservasBtn"
                >
                  Gestionar Reservas
                </button>

              </section>
            `
            : `
              <section
                class="bg-white p-5"
              >
                <h2 class="font-bold text-xl mb-2">
                  Panel Usuario
                </h2>

                <p>
                  Puedes visualizar únicamente tus reservas.
                </p>

                <button class""
                  class="mt-3 bg-green-600 text-white px-4 py-2 rounded"
                >
                  Nueva Reserva
                </button>

              </section>
            `
        }

        <section
          class="bg-white p-5 rounded-lg shadow"
        >

          <div
            class="flex justify-between items-center mb-4"
          >
            <h2 class="font-bold text-xl">
              Reservas
            </h2>

            <span
              class="text-sm text-slate-500"
            >
              ${
                user?.role === "admin"
                  ? "Mostrando todas las reservas"
                  : "Mostrando únicamente tus reservas"
              }
            </span>
          </div>

          <div
            id="reservationsContainer"
            class="grid gap-4 md:grid-cols-2"
          >
            <div class="w-full text-center py-8 col-span-2">
              <p class="text-emerald-800">
                Cargando reservas ...
              </p>
            </div>
          </div>

        </section>

      </main>

    </div>
  `
}
