export interface Group {
  id: number;
  name: string;
  max_student_count: string;
  time: string;
  day_of_the_week: DayOfTheWeek[];
  exists_students: number;
  subject: string;
  current_teacher_name: string;
  current_teacher_id: number;
  book_name: string;
  book_price: string;
  comment: string;
  is_active: boolean;
  archived: boolean;
  number_of_lessons: string;
  can_create_attendance: boolean;
  description: string;
  start_of_classes: string
  pourochno_price: string

}

export interface DayOfTheWeek {
  id: number;
  week_day: string;
}
export interface EditGroup {
  name: string;
  max_student_count: string;
  time: number;
  comment: string;
  is_active: boolean;
  day_of_the_week: number[] | string[];
  subject: number;
  book: number | string;
  current_teacher: number;
  number_of_lessons: string;
  description: string;
  start_of_classes: string
  pourochno_price: string

}
export interface Filter {
  subject?: string;
  day_of_the_week?: string;
  time?: string;
  current_teacher?: string;
  group_status?: string;
  student?: string;
  archived?: string;
}
export interface HistoryGroup {
  description: string;
  created_at: string;
  user: null;
  group: string;
  manager: string;
}
export interface HistoryGroupFilter {
  page: number;
  group: number;
  search?: string;
}
export interface BooksInformation {
  book_name: string;
  book_price: string;
}