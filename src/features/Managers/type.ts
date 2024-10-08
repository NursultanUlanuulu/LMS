export interface Manager {
  id?: number;
  phone: string;
  name: string;
  surname: string;
  branch: number | string;
  patronymic: string;
  date_birth: string;
  password: string;
  inn: string;
  address: string;
}

export type EditManager = Omit<Manager, "branch">;
