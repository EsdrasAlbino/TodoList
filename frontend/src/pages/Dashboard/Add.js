import React from "react";
import Swal from "sweetalert2";
import { FormsTemplate } from "../../components/template/formsTemplate/formsTemplate";
import { postTodo } from "../../api/services/tasks/post";

const Add = ({ setIsAdding, update, setTodos }) => {
  const [loading, setLoading] = React.useState(false);

  const handleAdd = async (data) => {
    if (!data.todo) {
      return Swal.fire({
        icon: "error",
        title: "Error!",
        text: "All fields are required.",
        showConfirmButton: true,
      });
    }

    const newEmployee = {
      todoName: data.todo,
      description: data.description,
      responsible: data.responsable,
      category: data.category,
    };

    try {
      setLoading(true);
      await postTodo(newEmployee);

      update();
      window.location.reload();
      Swal.fire({
        icon: "success",
        title: "Added!",
        text: `${data.task}' task adicionada.`,
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.error(error);

      return Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Algo deu errado.",
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
        required: "Campo obrigatório",
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
      variant: "primary",
      type: "submit",
      buttonText: "Adicionar",
    },
    {
      variant: "secondary",
      type: "button",
      buttonText: "Cancelar",
      onClick: () => {
        setIsAdding(false);
      },
      desabled: loading,
    },
  ];

  return (
    <>
      <FormsTemplate
        onSubmit={handleAdd}
        title={"Adicionar"}
        inputs={inputs_render}
        buttons={buttons_render}
      />
    </>
  );
};

export default Add;
