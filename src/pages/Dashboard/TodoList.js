import React from "react";
import { Table } from "../../components/atomics/table/Table";

const TodoList = ({
  tableRef,
  isLoaded,
  employees,
  handleEdit,
  handleDelete,
  update,
}) => {
  return (
    <div className="contain-table">
      <table className="striped-table">
        <thead>
          <tr>
            <th>Check</th>
            <th>Tarefa</th>
            <th>Responsável</th>
            <th>Categoria</th>
            <th>Data de criação</th>
            <th colSpan={2} className="text-center">
              Actions
            </th>
          </tr>
        </thead>
        <tbody ref={tableRef}>
          {employees.length > 0 ? (
            employees.map((employee, i) => (
              <Table
                data={employee}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
                update={update}
              />
            ))
          ) : (
            <tr>
              <td colSpan={7}>No Employees</td>
            </tr>
          )}
        </tbody>
        {isLoaded && (
          <tbody>
            <tr>
              <td colSpan={7}>Loading...</td>
            </tr>
          </tbody>
        )}
      </table>
    </div>
  );
};

export default TodoList;
