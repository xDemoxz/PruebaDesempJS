export const saveSession = (user) => {
  localStorage.setItem("user", JSON.stringify(user))
}

export const getSession = () => {
  return JSON.parse(localStorage.getItem("user"))
}

export const removeSession = () => {
  localStorage.removeItem("user")
}

export const isAuthenticated = () => {
  return !!getSession()
}

export const isAdmin = () => {
  return getSession()?.role === "admin"
}

export const createReservationData = (data) => {
  const reservationData = {
    ...data,
    user: getSession()
  }

  const localStorageReservation =
    JSON.parse(localStorage.getItem("reservation")) ?? []

  if (localStorageReservation !== null) {
    const currentData = [...localStorageReservation, reservationData]
    localStorage.setItem("reservation", JSON.stringify(currentData))
  } else {
    localStorage.setItem("reservation", JSON.stringify([reservationData]))
  }
}

export const getReservationData = () => {
  return JSON.parse(localStorage.getItem("reservation"))
}
