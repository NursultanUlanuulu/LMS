export interface DayOfWeek {
  id: number
  week_day: string
}

export type EditDayOfWeek = Pick<DayOfWeek, "week_day">;
