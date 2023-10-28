import { Component } from '@angular/core';

type Appointment = {
  date: string;
  time: string;
  patientId: number;
  doctorId: number;
};

type Patient = {
  id: number;
  name: string;
  appointments: Appointment[];
};

type Doctor = {
  id: number;
  name: string;
  appointments: Appointment[];
};

type DoctorForView = Doctor & {
  isView: boolean
}

@Component({
  selector: 'app-hospital-system',
  templateUrl: './hospital-system.component.html',
  styleUrls: ['./hospital-system.component.scss']
})
export class HospitalSystemComponent {
  public patients: Patient[] = [];
  public doctors: DoctorForView[] = [];
  public selectedPatientId: number = 1;
  public selectedDoctorId: number = 1;
  public reservationDate: string = '';

  constructor() {
  }

  ngOnInit() {
    this.patients = [{
      id: 1,
      name: 'John Doe',
      appointments: [
        {
          date: '2023-10-22',
          time: '10:00',
          patientId: 1,
          doctorId: 101
        }
      ]
    },
      {
        id: 2,
        name: 'Jane Smith',
        appointments: [
          {
            date: '2023-10-23',
            time: '11:00',
            patientId: 2,
            doctorId: 102
          }
        ]
      },
      {
        id: 3,
        name: 'Emily Johnson',
        appointments: []
      },
      {
        id: 4,
        name: 'Michael White',
        appointments: []
      },
      {
        id: 5,
        name: 'Becky Green',
        appointments: []
      }];
    this.doctors = [
      {
        id: 101,
        name: 'Dr. Smith',
        appointments: [
          {
            date: '2023-10-22',
            time: '10:00',
            patientId: 1,
            doctorId: 101
          }
        ],
        isView: false
      },
      {
        id: 102,
        name: 'Dr. Paul',
        appointments: [
          {
            date: '2023-10-21',
            time: '10:00',
            patientId: 2,
            doctorId: 101
          }
        ],
        isView: false
      }
    ];
  }

  checkAppointments(doctor: DoctorForView) {
    doctor.isView = !doctor.isView;
  }

  makeDoctorAppointment() {
    const patient = this.patients.find((pat)=> pat.id === this.selectedPatientId)
    const doctor =this.doctors.find((doc)=> doc.id === this.selectedDoctorId)
    const appointment: Appointment = {
      patientId: this.selectedPatientId,
      doctorId: this.selectedDoctorId,
      date: this.reservationDate.split('T')[0],
      time: this.reservationDate.split('T')[1],
    };
    if(patient) {
      patient.appointments.push(appointment);
    }
    if(doctor){
      doctor.appointments.push(appointment);
    }
  }

  onSelectDoctor(id: number): void {
    this.selectedDoctorId = id;
  }

  onSelectPatient(id: number): void {
    this.selectedPatientId = id;
  }
}
