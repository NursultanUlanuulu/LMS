import { DayOfTheWeek } from "../Groups/type";

export interface Pending {
  id: number;
  subject: number;
  subject_name: string;
  day_of_the_week: DayOfTheWeek[];
  level: string;
  student_full_name: string;
  student_phone: string;
  time: string;
  teacher_name: string;
  teacher_id: string;
  student_id: number;
}
export interface Debtors {
  id: number;
  manager: number;
  amount: number;
  comment?: string;
  verification: boolean;
  data_debt_repayment?: string;
  created: string;
  student_name: string;
  student: number;
}
export interface PendingFilter {
  page: number;
  search?: string;
  subject?: string;
  day_of_the_week?: string;
  time?: string;
}
export interface TrialFilter {
  group__subject?: string;
  lesson_date?: string;
  name?: string;
  time?: string | number;
}
export interface Trial {
  id: number;
  group: number;
  student: number;
  is_participated: boolean;
  day_of_the_week: DayOfTheWeek[];
  created: string;
  updated: string;
  group_name: string;
  group_subject: string;
  group_time: string;
  student_name: string;
  student_phone: string;
  lesson_date: string;
}
export interface Unrecorded {
  id: number;
  level: string;
  comment: string;
  day_of_the_week: DayOfTheWeek[];
  student_full_name: string;
  student_id: string;

  student_phone: string;
  teacher_name: string;
  teacher_id: number;
  time: string;
  subject: string;
}
