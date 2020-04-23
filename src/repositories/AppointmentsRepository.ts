import { isEqual } from 'date-fns'

import Appointment from '../models/Appointment'

interface AppointmentCreationData {
  provider: string
  date: Date
}

interface AppointmentData extends AppointmentCreationData {
  id: string
}

class AppointmentsRepository {
  private appointments: Appointment[]

  constructor() {
    this.appointments = []
  }

  public create(data: AppointmentCreationData): Appointment {
    const appointment = new Appointment(data)

    this.appointments.push(appointment)

    return appointment
  }

  public findByDate(date: Date): Appointment | null {
    const appointment = this.appointments.find((appointment) =>
      isEqual(date, appointment.date)
    )

    return appointment || null
  }
}

export default AppointmentsRepository
