export interface Teacher {
  id: number;
  full_name: string;
  inn: string;
  address: string;
  comment: string;
  date_birth: string;
  predmet: string;
  staj: string;
  phone: string;
  phone_numbers: { phone: string }[];
  place_of_study: { mestoucheby: string }[];
  place_of_works: { mestoraboty: string }[];
  is_active: boolean;
  status: TeacherStatus
}
export interface TeacherCreate {
  full_name: string;
  inn: string;
  address: string;
  comment: string;
  date_birth: string;
  predmet: string;
  staj: string;
  phone: string;
  education_list: { place_of_study: string }[];
  optional_phone_list: { phone: string }[];
  is_active?: boolean;
  work_list: { place_of_work: string }[];
  user_type: 3;
}

export enum TeacherStatus {
  Working = "Working",

  Fired = "Fired",
  Vacation = "Vacation",
}
