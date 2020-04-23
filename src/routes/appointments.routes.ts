import { Router } from 'express'
import { uuid } from 'uuidv4'
import { isEqual, parseISO, startOfHour } from 'date-fns'

const router = Router()

interface Appointment {
  id: string
  provider: string
  date: Date
}

const appointments: Appointment[] = []

router.post('/', (req, res) => {
  const { provider, date } = req.body

  const parsedDate = startOfHour(parseISO(date))
  const findAppointmentInSameDate = appointments.find((appointment) =>
    isEqual(parsedDate, appointment.date)
  )

  if (findAppointmentInSameDate) {
    return res
      .status(400)
      .json({ message: "There's another appointment booked at that time" })
  }

  const appointment = {
    id: uuid(),
    provider,
    date: parsedDate,
  }

  appointments.push(appointment)

  return res.json(appointment)
})

export default router
