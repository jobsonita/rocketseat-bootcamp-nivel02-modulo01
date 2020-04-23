import { Router } from 'express'
import { isEqual, parseISO, startOfHour } from 'date-fns'

import Appointment from '../models/Appointment'

const router = Router()

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

  const appointment = new Appointment({
    provider,
    date: parsedDate,
  })

  appointments.push(appointment)

  return res.json(appointment)
})

export default router
