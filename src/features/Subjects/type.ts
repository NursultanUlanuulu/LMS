export interface Subject {
  id: number
  predmet: string
}

export type EditSubject = Pick<Subject, "predmet">;
