export interface Book {
  id?: number;
  title: string;
  quantity: string | number
  price: string;
  predmet: number;
  branch: number
}

export interface BooksResponse {
  count: number;
  next: string;
  previous: string;
  results: Book[];
}
