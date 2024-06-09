import { Book } from "../models/book.model";
import { Pagination } from "../models/pagination.model";
import { httpClient } from "./http";

interface FetchBooksParams {
  categoryId?: number;
  news?: boolean;
  curPage?: number;
  limit: number;
}

interface FetchBooksResponse {
  books: Book[];
  pagination: Pagination;
}

export const fetchBooks = async (params: FetchBooksParams) => {
  try {
    const response = await httpClient.get<FetchBooksResponse>("/books", {
      params: params,
    });

    return response.data;
  } catch (error) {
    return {
      books: [],
      pagination: {
        totalCount: 0,
        curPage: 1,
      },
    };
  }
};
