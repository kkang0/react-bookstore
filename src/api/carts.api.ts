import { httpClient } from "./http";

interface AddCartParams {
  bookId: number;
  quantity: number;
}

export const addCart = async (params: AddCartParams) => {
  const response = await httpClient.post("/carts", params);
  return response.data;
};
