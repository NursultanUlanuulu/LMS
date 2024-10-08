import { DayOfWeek } from "../DayOfWeek/type";

export interface Attendance {
  id?: number;
  group: number;
  attendance_day_of_the_week: number;
  date: string;
  students: {
    student: number;
    attend: boolean;
    status?: string;
    reason_for_absence: null | string;
  }[];
}

export interface GroupStudentsAttendances {
  id?: number;
  group: number;
  attendance_day_of_the_week: number;
  date: string;
  group_name: string;
  teacher_who_conducted: number;
  students: {
    student: number;
    student_name: string;
    attend: boolean;
    status?: string;
    reason_for_absence: null | string;
    trial: boolean;
    lack_of_balance?: boolean;
  }[];
}

export type StudentsAttendances = {
  [key: string]: [
    {
      status: string;
      attend: boolean;
    }
  ];
};

export interface StudentAttendancesInGroup {
  attend: boolean;
  attendance_day_of_the_week: string;
  date: string;
  group: string;
  status?: string;
  reason_for_absence: null | string;
  student: number;
  student_full_name: string;
  student_phone: string;
}

export interface AttendanceFilter {
  group?: number;
  student?: number;
  start_date?: string;
  enda_date?: string;
  page?: number;
}

export interface StudentAttendanceFilter {
  student: number;
  attendance_group: number;
  page: number;
  start_date?: string;
  end_date?: string;
}

export interface Journal {
  id: number;
  name: string;
  current_teacher_id: number;
  current_teacher_name: string;
  day_of_the_week: DayOfWeek[];
  subject: string;
  time: string;
  students: {
    student_id: number;
    student_name: string;
    is_active: boolean;
    admit: boolean;
    student_balance: number;
    lesson_unlock_price: number;
    pourochno: boolean;
  }[];
  trial_students:
    | {
        student: number;
        student_name: string;
      }[]
    | null;
}

export type Student = {
  student_id: number;
  student_name: string;
  is_active: boolean;
  admit: boolean;
  student_balance: number;
  lesson_unlock_price: number;
  pourochno: boolean;
};

export type CurrentTime = {
  time: string;
  id: string;
};
