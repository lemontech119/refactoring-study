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

let patients: Patient[] = [
  {
    id: 1,
    name: "John Doe",
    appointments: [
      {
        date: "2023-10-22",
        time: "10:00",
        patientId: 1,
        doctorId: 101,
      },
      // ... more appointments
    ],
  },
  // ... more patients
];

let doctors: Doctor[] = [
  {
    id: 101,
    name: "Dr. Smith",
    appointments: [
      {
        date: "2023-10-22",
        time: "10:00",
        patientId: 1,
        doctorId: 101,
      },
      // ... more appointments
    ],
  },
  // ... more doctors
];

// 예: 특정 환자의 예약 접근
let specificAppointment = patients[0].appointments[0];
