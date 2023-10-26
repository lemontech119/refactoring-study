import { Appointment } from './Appointment';

export class Patient {
  private _id: number;
  private _name: string;
  private _appointments: Appointment[]
  constructor(data) {
    this._id = data.id;
    this._name = data.name;
    this._appointments = [];
    for(let appointment of data.appointments){
      this._appointments.push(appointment)
    }
  }

  get id() {
    return this._id
  }

  get name(){
    return this._name
  }

  get appointment() {
    return this._appointments
  }

  public addAppointment(appointment: Appointment) {
    this._appointments.push(appointment);
  }
}