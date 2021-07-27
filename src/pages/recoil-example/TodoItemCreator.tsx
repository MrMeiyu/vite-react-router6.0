import React, { useState } from "react";
import { useSetRecoilState } from "recoil";
import { TodoListState } from "../../store/recoilState";

// 用于创建唯一 ID 的工具
let id = 0;
function getId() {
  return id++;
}

const TodoItemCreator: React.FC = () => {
  const [inputValue, setInputValue] = useState("");
  const setTodoList = useSetRecoilState(TodoListState);
  const addItem = () => {
    setTodoList((oldTodoList) => [
      ...oldTodoList,
      {
        id: getId(),
        text: inputValue,
        isComplete: false,
      },
    ]);
    setInputValue("");
  };

  const onChange = ({ target: { value } }) => {
    setInputValue(value);
  };

  return (
    <>
      <input type="text" value={inputValue} onChange={onChange} />
      <button onClick={addItem}>Add</button>
    </>
  );
};

export default TodoItemCreator;
