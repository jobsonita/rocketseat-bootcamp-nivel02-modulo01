import { Router } from 'express'
import { parseISO, startOfHour } from 'date-fns'

import AppointmentsRepository from '../repositories/AppointmentsRepository'

const router = Router()

const appointmentsRepository = new AppointmentsRepository()

router.get('/', (req, res) => {
  const appointments = appointmentsRepository.all()

  return res.json(appointments)
})

router.post('/', (req, res) => {
  const { provider, date } = req.body

  const parsedDate = startOfHour(parseISO(date))

  const bookedAppointmentInSameDateExists = appointmentsRepository.findByDate(
    parsedDate
  )

  if (bookedAppointmentInSameDateExists) {
    return res
      .status(400)
      .json({ message: "There's another appointment booked at that time" })
  }

  const appointment = appointmentsRepository.create({
    provider,
    date: parsedDate,
  })

  return res.json(appointment)
})

export default router
