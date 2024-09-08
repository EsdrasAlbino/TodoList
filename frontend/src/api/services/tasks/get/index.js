import { api } from "../../../api";

export const getTodos = async (query, startIndex) => {
  try {
    const response = await api.get(`/todos`,{
        params: {
          page: startIndex,
        },
    });
    return response.data;
  } catch (error) {
    return error;
  }
};
