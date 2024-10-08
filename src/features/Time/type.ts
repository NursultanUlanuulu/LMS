export interface Time {
  id: number
  time: string
}

export type EditTime = Pick<Time, "time">;
