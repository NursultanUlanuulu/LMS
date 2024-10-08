export interface Promoter {
  id: number
  name: string
}

export type EditPromoter = Pick<Promoter, "name">;
