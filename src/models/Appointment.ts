import { uuid } from 'uuidv4'

interface AppointmentData {
  provider: string
  date: Date
}

class Appointment {
  id: string
  provider: string
  date: Date

  constructor(data: AppointmentData) {
    this.id = uuid()
    this.provider = data.provider
    this.date = data.date
  }
}

export default Appointment
