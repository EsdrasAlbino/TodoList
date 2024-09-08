import React, { useEffect, useReducer, useRef, useState } from "react";
import Swal from "sweetalert2";

import Add from "./Add";
import Edit from "./Edit";
import Header from "./Header";
import TodoList from "./TodoList";

import { getTodos } from "../../api/services/tasks/get";
import { deleteTodo } from "../../api/services/tasks/delete";

const Dashboard = () => {
  const [todos, setTodos] = useState([]);
  const [selectedTodo, setSelectedTodo] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [initIndexRequest, setInitIndexRequest] = useState(1);
  const [isLoaded, setIsLoaded] = useState(false);

  const [reducerValue, forceUpdate] = useReducer((x) => x + 1, 0);

  const tableRef = useRef();

  useEffect(() => {
    // Adicionar listener de scroll
    window.addEventListener("scroll", handleScroll);

    return () => {
      // Remover listener de scroll ao desmontar o componente
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isLoaded]);

  useEffect(() => {
    requestTodos();
  }, [initIndexRequest, reducerValue]);

  const requestTodos = async () => {
    setIsLoaded(true);
    try {
      const data = await getTodos("flowers:keyes", initIndexRequest);
      const data_render = data.data.map((item) => {
        const date = new Date(item.createdAt);
        const dateFormat = date.toLocaleDateString("pt-BR");

        return {
          id: item._id,
          todo: item.todoName,
          authors: item.responsible,
          publishedDate: dateFormat,
          description: item.description,
          isComplete: item.isComplete,
          category: item.category,
        };
      });

      setTodos((prev) => {
        if (prev.length === 0) {
          return data_render;
        }
        return [...prev, ...data_render];
      });
    } catch (e) {
      console.log("ERROR LINE 46", e);
    } finally {
      setIsLoaded(false);
    }
  };

  const handleScroll = () => {
    const bottom =
      window.innerHeight + window.scrollY >=
      document.documentElement.scrollHeight;

    if (bottom && !isLoaded) {
      setInitIndexRequest((prevPage) => prevPage + 1); // Incrementar a página para a próxima requisição
    }
  };

  const handleEdit = (id) => {
    const [employee] = todos.filter((employee) => employee.id === id);

    setSelectedTodo(employee);
    setIsEditing(true);
  };

  const handleDelete = (id) => {
    Swal.fire({
      icon: "warning",
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
    }).then(async (result) => {
      if (result.value) {
        try {
          await deleteTodo(id);

          setTodos((prev) => prev.filter((employee) => employee.id !== id));

          Swal.fire({
            icon: "success",
            title: "Deleted!",
            text: `data has been deleted.`,
            showConfirmButton: false,
            timer: 1500,
          });
        } catch (error) {
          console.error(error);
          return Swal.fire({
            icon: "error",
            title: "Error!",
            text: "Something went wrong.",
            showConfirmButton: true,
          });
        }
      }
    });
  };

  return (
    <div className="container">
      {!isAdding && !isEditing && (
        <>
          <Header setIsAdding={setIsAdding} />

          <TodoList
            tableRef={tableRef}
            isLoaded={isLoaded}
            employees={todos}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
            update={forceUpdate}
          />
        </>
      )}
      {isAdding && (
        <Add
          employees={todos}
          setIsAdding={setIsAdding}
          update={forceUpdate}
          setTodos={setTodos}
        />
      )}
      {isEditing && (
        <Edit
          selectedEmployee={selectedTodo}
          setIsEditing={setIsEditing}
          update={forceUpdate}
          setTodos={setTodos}
        />
      )}
    </div>
  );
};

export default Dashboard;
