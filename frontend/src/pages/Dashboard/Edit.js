import React, { useState } from "react";
import Swal from "sweetalert2";
import { FormsTemplate } from "../../components/template/formsTemplate/formsTemplate";
import { updateTodo } from "../../api/services/tasks/put";

const Edit = ({ selectedEmployee, setIsEditing, update, setTodos }) => {
  const [loading, setLoading] = useState(false);
  const defaultValues = {
    id: selectedEmployee.id,
    isComplete: selectedEmployee.isComplete,
    todo: selectedEmployee.todo,
    responsable: selectedEmployee.authors,
    description: selectedEmployee.description,
    category: selectedEmployee.category,
  };

  const handleUpdate = async (data) => {
    setLoading(true);
    if (
      !data.todo ||
      !data.responsable ||
      !data.description ||
      !data.category
    ) {
      return Swal.fire({
        icon: "error",
        title: "Error!",
        text: "All fields are required.",
        showConfirmButton: true,
      });
    }

    const employee = {
      id: data.id,
      isComplete: data.isComplete,
      todoName: data.todo,
      description: data.description,
      responsible: data.responsable,
      category: data.category,
    };

    try {
      await updateTodo(employee);
      setTodos((prev) =>
        prev.map((todo) => (todo.id === employee.id ? employee : todo))
      );
      Swal.fire({
        icon: "success",
        title: "Updated!",
        text: `${employee.firstName} ${employee.lastName}'s data has been updated.`,
        showConfirmButton: false,
        timer: 1500,
      });
      update();
      window.location.reload();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "An error occurred while updating the data.",
        showConfirmButton: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const inputs_render = [
    {
      label: "Tarefa",
      id: "todo",
      type: "text",
      name: "todo",
      rules: {
        required: "Campo obrigatório",
        minLength: {
          value: 3,
          message: "Mínimo de 3 caracteres",
        },
      },
    },
    {
      label: "Descrição",
      id: "description",
      type: "text",
      name: "description",
      rules: {
        maxLength: {
          value: 100,
          message: "Máximo de 100 caracteres",
        },
      },
    },
    {
      label: "Responsável",
      id: "responsable",
      type: "text",
      name: "responsable",
      rules: {
        minLength: {
          value: 3,
          message: "Mínimo de 3 caracteres",
        },
      },
    },
    {
      label: "Categoria",
      id: "category",
      type: "text",
      name: "category",
    },
  ];

  const buttons_render = [
    {
      buttonText: "Update",
      variant: "primary",
      type: "submit",
    },
    {
      buttonText: "Cancel",
      variant: "muted",
      type: "button",
      onClick: () => setIsEditing(false),
      desabled: loading,
    },
  ];

  return (
    <>
      <FormsTemplate
        title={"Editar"}
        onSubmit={handleUpdate}
        inputs={inputs_render}
        buttons={buttons_render}
        defaultValues={defaultValues}
      />
    </>
  );
};

export default Edit;
