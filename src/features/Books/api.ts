import { apiRoot } from "@/app/api";
import { Book, BooksResponse } from "./type";

const api = {
  getBooks: (token: string, filter: { predmet?: number }) => {
    return apiRoot.get<BooksResponse>(`/book/crud`, {
      params: filter,
      headers: {
        Authorization: `Token ${token}`,
      },
    });
  },

  create: (token: string, book: Book) =>
    apiRoot.post<Book>(`/book/crud/`, book, {
      headers: {
        Authorization: `Token ${token}`,
      },
    }),

  update: (token: string, book: Book) =>
    apiRoot.patch<Book>(`/book/crud/${book.id}/`, book, {
      headers: {
        Authorization: `Token ${token}`,
      },
    }),

  delete: (token: string, bookId: number) =>
    apiRoot.delete(`/book/crud/${bookId}/`, {
      headers: {
        Authorization: `Token ${token}`,
      },
    }),
};

export default api;
