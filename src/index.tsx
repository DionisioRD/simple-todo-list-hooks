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
    return <li key={index}>{todo.text}</li>;
  });

  // Can use a parenthesis and omit the return instead of {}
  /*
  const listTodoItems = todos.map((todo, index) => (
    // Only do this if items have no stable IDs
    <li key={index}>{todo.text}</li>
  ));
  */

  console.log(todos);

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
