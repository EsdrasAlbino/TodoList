import { api } from "../../../api";

export const updateTodo = async (data) => {
  try {
    const response = await api.put(`/todos/${data.id}`, data);
    return response.data;
  } catch (error) {
    return error;
  }
};
