import { api } from "../../../api";

export const postTodo = async (data) => {
  try {
    const response = await api.post(`/todos`, data);
    return response.data;
  } catch (error) {
    return error;
  }
};
