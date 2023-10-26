export class Appointment {
  private _date: string;
  private _time: string;
  private _patientId: number;
  private _doctorId: number;

  constructor(data) {
    this._date = data.date;
    this._time = data.time;
    this._patientId = data.patientId;
    this._doctorId = data.doctorId;
  }

  get date() {
    return this._doctorId;
  }

  get time() {
    return this._time;
  }

  get patientId() {
    return this._patientId;
  }

  get doctorId() {
    return this._doctorId;
  }

}