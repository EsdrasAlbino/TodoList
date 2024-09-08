# TodoList - Documentação

Este projeto consiste em um sistema de **TodoList** com a raiz do projeto distribuida da seguinte forma: o **backend** e o **frontend**.

## Estrutura do Projeto

A raiz do projeto está organizada da seguinte forma:

```
|_ backend
    |_ controllers
    |_ middleware
    |_ models
    |_ routes
|_ frontend
    |_ public
    |_ src
        |_ api
        |_ components
        |_ data
        |_ pages
```

### Backend

O **backend** é responsável por gerenciar a lógica de negócios e a persistência dos dados usando o MongoDB.

- **Tecnologias utilizadas:**
  - Node.js
  - Express
  - MongoDB
  - Mongoose

#### Variáveis de Ambiente

O backend usa uma variável de ambiente para se conectar ao banco de dados MongoDB:

```
CONN_URL=mongodb+srv://esdrasalbino:uhaoIUBA9892Egodbass@cluster0.hya2n.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
```

**Obs:** É recomendado armazenar credenciais sensíveis em um arquivo `.env` e usar bibliotecas como [dotenv](https://www.npmjs.com/package/dotenv) para carregar essas variáveis.

#### Como rodar o backend

1. Navegue até o diretório `backend`:

   ```bash
   cd backend
   ```

2. Instale as dependências:

   ```bash
   yarn install
   ```

3. Execute o servidor em modo de desenvolvimento:

   ```bash
   yarn dev
   ```

O backend estará rodando por padrão na porta `3001`.

---

### Frontend

O **frontend** é uma aplicação React que consome a API do backend.

- **Tecnologias utilizadas:**
  - React
  - Axios (para fazer requisições HTTP)
  - React Hooks

#### Variáveis de Ambiente

No frontend, você deve configurar a URL da API com a seguinte variável de ambiente:

```
REACT_APP_API_URL = http://localhost:3001
```

#### Como rodar o frontend

1. Navegue até o diretório `frontend`:

   ```bash
   cd frontend
   ```

2. Instale as dependências:

   ```bash
   yarn install
   ```

3. Execute o servidor em modo de desenvolvimento:

   ```bash
   yarn dev
   ```

O frontend estará disponível por padrão em `http://localhost:3000`.

---

### Considerações Finais

- Certifique-se de que o backend esteja rodando antes de iniciar o frontend, pois o frontend faz requisições para o backend.
- Lembre-se de não compartilhar informações sensíveis, como a `CONN_URL` do MongoDB, em ambientes públicos. Use práticas de segurança adequadas.

