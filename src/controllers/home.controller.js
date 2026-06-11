import ReservationCard from "@components/ReservationCard"
import { getReservations } from "@services/reservation.service"
import { getSession, getReservationData } from "@/utils"

export const homeController = async () => {
  const container = document.querySelector("#reservationsContainer")

  const user = getSession()

  if (!user) {
    navigateTo("/")
  }

  const reservations = await getReservations()
  const lcreservation = getReservationData()

  const filteredLcReservations =
    user.role === "admin"
      ? lcreservation
      : lcreservation.filter((reservation) => reservation.user.id === user.id)

  const filteredReservations =
    user.role === "admin"
      ? reservations
      : reservations.filter((reservation) => reservation.userId === user.id)

  const formatedData =
    filteredLcReservations === null
      ? filteredReservations
      : filteredReservations.concat(filteredLcReservations)

  container.innerHTML = filteredReservations?.length
    ? formatedData.map((reservation) => ReservationCard(reservation)).join("")
    : `
      <div class="w-full text-center py-8 col-span-2">
        <p class="text-slate-500">
          No hay reservas disponibles
        </p>
      </div>
    `
}
