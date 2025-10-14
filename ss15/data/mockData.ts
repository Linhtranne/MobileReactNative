export enum Gender {
  MALE = "MALE",
  FEMALE = "FEMALE",
}

export interface Position {
  id: number;
  positionName: string;
}

export interface Employee {
  id: number;
  employeeCode: string;
  employeeName: string;
  phoneNumber: string;
  gender: Gender;
  dateBirth: string;
  createdAt: string;
  positionId: number;
  positionName: string;
}

export const DUMMY_POSITIONS: Position[] = [
  { id: 1, positionName: "Sales Staff" },
  { id: 2, positionName: "Accountant" },
  { id: 3, positionName: "Warehouse Manager" },
  { id: 4, positionName: "Software Developer" },
];

export const DUMMY_EMPLOYEES: Employee[] = [
  {
    id: 1,
    employeeCode: "EMP0001",
    employeeName: "John Nguyen",
    phoneNumber: "0123456789",
    gender: Gender.MALE,
    dateBirth: "1990-01-01",
    createdAt: "2024-01-15T08:00:00.000Z",
    positionId: 1,
    positionName: "Sales Staff",
  },
  {
    id: 2,
    employeeCode: "EMP0002",
    employeeName: "Lisa Tran",
    phoneNumber: "0987654321",
    gender: Gender.FEMALE,
    dateBirth: "1995-05-20",
    createdAt: "2024-02-10T10:30:00.000Z",
    positionId: 2,
    positionName: "Accountant",
  },
  {
    id: 3,
    employeeCode: "EMP0003",
    employeeName: "Michael Le",
    phoneNumber: "0333444555",
    gender: Gender.MALE,
    dateBirth: "1992-11-11",
    createdAt: "2024-03-01T14:00:00.000Z",
    positionId: 4,
    positionName: "Software Developer",
  },
];
