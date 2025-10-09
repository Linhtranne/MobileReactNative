export const CourseStatuses = ["Đang hoạt động", "Ngừng hoạt động"] as const;

export type CourseStatus = (typeof CourseStatuses)[number];

export interface Course {
  id: string;
  name: string;
  price: number;
  status: CourseStatus;
}