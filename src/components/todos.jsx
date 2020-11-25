import React, { memo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  todoAdded,
  todoDeleted,
  todoAsyncAdded,
  todoAsyncRejectd,
  selectTodos
  // todosSelectAll
} from "../features/todos/todoSlice";

const colorEnum = {
  black: "black",
  red: "red"
};

function Todos() {
  const dispatch = useDispatch();

  const todos = useSelector(selectTodos);
  // const todos = useSelector(todosSelectAll);

  const [inputVal, setInputVal] = useState("");
  const [color, setColor] = useState(colorEnum.black);

  function handleChangeVal(e) {
    setInputVal(e.target.value);
  }

  function handleAdd() {
    inputVal !== "" && dispatch(todoAdded(inputVal, color));
    setInputVal("");
  }

  function handleAsyncAdd() {
    /* 区分同步action:  只能传递一个参数 */
    inputVal !== "" && dispatch(todoAsyncAdded({ inputVal, color }));
    setInputVal("");
  }

  function handleDelete(id) {
    dispatch(todoDeleted(id));
  }

  function handleKeyDown(e) {
    if (e.keyCode === 13) {
      handleAdd();
    }
  }

  function handleChangeColor(e) {
    setColor(e.target.value);
  }

  function handleAsyncError() {
    dispatch(todoAsyncRejectd());
  }

  return (
    <>
      <input
        value={inputVal}
        onChange={handleChangeVal}
        onKeyDown={handleKeyDown}
      />

      <input
        type="radio"
        name={colorEnum.black}
        id={colorEnum.black}
        value={colorEnum.black}
        checked={color === colorEnum.black}
        onChange={handleChangeColor}
      />
      <label htmlFor="black">default</label>
      <input
        type="radio"
        name={colorEnum.red}
        id={colorEnum.red}
        value={colorEnum.red}
        checked={color === colorEnum.red}
        onChange={handleChangeColor}
      />
      <label htmlFor="red">urgent</label>
      <button onClick={handleAdd}>add</button>
      <button onClick={handleAsyncAdd}>async add</button>
      <button onClick={handleAsyncError}>async error</button>

      <ol>
        {todos.map(item => (
          <li key={item.id}>
            <span style={{ color: item.color }}>{item.value}</span>
            <button onClick={() => handleDelete(item.id)}>delete</button>
          </li>
        ))}
      </ol>
    </>
  );
}

export default memo(Todos);
