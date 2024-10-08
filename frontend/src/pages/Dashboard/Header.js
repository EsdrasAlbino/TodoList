import React from "react";


const Header = ({ setIsAdding }) => {
  return (
    <header>
      <h1>Lista (quase) infinita de tarefas</h1>
      <div style={{ marginTop: "30px", marginBottom: "18px" }}>
        <button onClick={() => setIsAdding(true)}>Adicionar tarefa</button>
        {/*         <Logout setIsAuthenticated={setIsAuthenticated} />
         */}{" "}
      </div>
    </header>
  );
};

export default Header;
