import ReactDOM from "react-dom";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import React, { Fragment, useState } from "react";

type FormElement = React.FormEvent<HTMLFormElement>;

interface ITodo {
  text: string;
  complete: boolean;
}

// Interfaces can be extended.
/*
interface ITodoTagged extends ITodo {
  tags: string[];
}
*/

export default function App(): JSX.Element {
  const [value, setValue] = useState<string>("");
  const [todos, setTodos] = useState<ITodo[]>([]);

  const handleSubmit = (e: FormElement): void => {
    e.preventDefault(); // Do not refresh the page
    addTodo(value);
    setValue("");
  };

  const addTodo = (text: string): void => {
    const newTodos: ITodo[] = [...todos, { text, complete: false }];
    setTodos(newTodos);
  };

  const listTodoItems = todos.map((todo, index) => {
    // Only do this if items have no stable IDs
    return (
      <Fragment key={index}>
        <div style={{ textDecoration: todo.complete ? "line-through" : " " }}>
          {todo.text}
        </div>
        <div>
          <button type="button" onClick={() => completeTodo(index)}>
            {todo.complete ? "Incompete" : "Complete"}
          </button>
          <button type="button" onClick={() => removeTodo(index)}>
            Remove
          </button>
        </div>
      </Fragment>
    );
  });

  const completeTodo = (index: number): void => {
    const newTodos: ITodo[] = [...todos];
    newTodos[index].complete = !newTodos[index].complete;
    setTodos(newTodos);
  };

  const removeTodo = (index: number): void => {
    const newTodos: ITodo[] = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  return (
    <Fragment>
      <h1>Todo List</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          required
        />
        <button type="submit">Add Todo</button>
      </form>
      <section>{listTodoItems}</section>
    </Fragment>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
