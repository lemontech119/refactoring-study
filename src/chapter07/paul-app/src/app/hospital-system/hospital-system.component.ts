import { Component } from '@angular/core';
import { Patient } from '../class/Patient';
import { Appointment } from '../class/Appointment';
import { DoctorForView } from '../class/DoctorForView';

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
    const serverPatients = [{
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

    const serverDoctor = [{
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

    for (let data of serverPatients) {
      this.patients.push(new Patient(data));
    }
    for (let data of serverDoctor) {
      const doctor: DoctorForView = new DoctorForView(data);
      this.doctors.push(doctor);
    }
  }

  checkAppointments(doctor: DoctorForView) {
    doctor.checkView();
  }

  makeDoctorAppointment() {
    const patient = this.patients.find((patient) => patient.id === this.selectedPatientId);
    const doctor = this.doctors.find((doctor) => doctor.id === this.selectedDoctorId);
    const appointment: Appointment = new Appointment({
      patientId: this.selectedPatientId,
      doctorId: this.selectedDoctorId,
      date: this.reservationDate.split('T')[0],
      time: this.reservationDate.split('T')[1]
    });
    if (patient) {
      patient.addAppointment(appointment);
    }
    if (doctor) {
      doctor.addAppointment(appointment);
    }
  }

  onSelectDoctor(id: number): void {
    this.selectedDoctorId = id;
  }

  onSelectPatient(id: number): void {
    this.selectedPatientId = id;
  }
}
