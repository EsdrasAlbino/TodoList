import React from "react";
import { Checkbox } from "../checkbox/checkbox";
import { updateTodo } from "../../../api/services/tasks/put";

export const Table = ({ data, handleEdit, handleDelete, update }) => {
  const updateCheckbox = async (e) => {
    data.isComplete = e.target.checked;

    try {
      await updateTodo(data);
      update();
    } catch (e) {
      console.log("ERROR LINE 46", e);
    }
  };

  return (
    <tr key={data.id}>
      <td>
        <Checkbox value={data.isComplete} onChange={updateCheckbox} />
      </td>
      <td>{data.todo}</td>
      <td>{data.authors}</td>
      <td>{data.category}</td>
      <td>{data.publishedDate} </td>
      <td className="text-right">
        <button
          onClick={() => handleEdit(data.id)}
          className="button muted-button"
        >
          Edit
        </button>
      </td>
      <td className="text-left">
        <button
          onClick={() => handleDelete(data.id)}
          className="button muted-button"
        >
          Delete
        </button>
      </td>
    </tr>
  );
};
