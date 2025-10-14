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
    employeeCode: "NV0001",
    employeeName: "Nguyễn Văn Nam",
    phoneNumber: "0123456789",
    gender: Gender.MALE,
    dateBirth: "1990-01-01",
    createdAt: "2024-01-15T08:00:00.000Z",
    positionId: 1,
    positionName: "Nhân viên bán hàng",
  },
  {
    id: 2,
    employeeCode: "NV0002",
    employeeName: "Trần Thị Lan",
    phoneNumber: "0987654321",
    gender: Gender.FEMALE,
    dateBirth: "1995-05-20",
    createdAt: "2024-02-10T10:30:00.000Z",
    positionId: 2,
    positionName: "Kế toán",
  },
  {
    id: 3,
    employeeCode: "NV0003",
    employeeName: "Lê Minh Anh",
    phoneNumber: "0333444555",
    gender: Gender.MALE,
    dateBirth: "1992-11-11",
    createdAt: "2024-03-01T14:00:00.000Z",
    positionId: 4,
    positionName: "Lập trình viên",
  },
];
