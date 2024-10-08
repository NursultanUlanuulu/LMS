import { Roles } from "@/shared/enums";
import { DayOfTheWeek } from "../Groups/type";

export interface Student {
  id: number;
  full_name: string;
  date_birth: string;
  phone: string;
  comment: string;
  phone_numbers?: any[];
  promoter: string;
  user_type: Roles;
  optional_phone_list?: any[];
  blacklist: boolean;
  balance: string;
  debt_amount: string;
}

export type CreateStudent = Omit<
  Student,
  "id" | "promoter" | "blacklist" | "balance" | "debt_amount"
> & {
  promoter: number;
};

export type EditStudent = Omit<
  Student,
  "user_type" | "promoter" | "blacklist" | "balance" | "debt_amount"
> & {
  promoter: number;
};

export interface TransferPayment {
  phone: string;
  summ: number;
  comment: string;
}

export interface AddToPending {
  student: number;
  subject: number;
  teacher: number | null;
  level: string;
  time: number;
  day_of_the_week: number[];
  comment: string;
}

export interface AddToDebt {
  tarif: string;
  comment: string;
  startDate: string;
}

export interface RestoreLesson {
  lessonsQuantity: number;
  paymentStartDate: string;
  comment: string;
}

export interface CoursePayment {
  tarif: string;
  lessonsQuantity: number;
  paymentStartDate: string;
  comment: string;
}

export interface TrialLessons {
  id: number;
  group: number;
  student: number;
  is_participated: boolean;
  day_of_the_week: DayOfTheWeek[];
  group_name: string;
  group_subject: string;
  group_time: string;
  student_name: string;
  student_phone: string;
  is_active: boolean;
  lesson_date: string;
}
export interface Graduated {
  complated: boolean
  day_of_the_week: DayOfTheWeek[]
  group_name: string
  group_subject_name: string
  group_time: string
  student_id: number
  student_full_name: string
  student_date_birth: string
  student_phone: string
  student_branch: string
  student_balance: number
  student_black_list: boolean
}