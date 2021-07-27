import * as React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import TodoItemCreator from "./TodoItemCreator";
import TodoItem from "./TodoItem";
import TodoListFilters from "./TodoListFilters";
import TodoListStats from "./TodoListStats";

import {
  TextState,
  CharCountState,
  TodoListState,
  FilteredTodoListState,
} from "../../store/recoilState";

const RecoilExample: React.FC = () => {
  const [text, setText] = useRecoilState(TextState);
  const count = useRecoilValue(CharCountState);
  const onChange = (event: { target: { value: string } }) => {
    setText(event.target.value);
  };

  const todoList = useRecoilValue(TodoListState);

  const todoLists = useRecoilValue(FilteredTodoListState);

  return (
    <>
      <div>
        <input type="text" value={text} onChange={onChange} />
        <p>输入文本: {text}</p>
        <p>输入长度: {count}</p>
      </div>
      <div>
        <TodoItemCreator />
        {todoList.map((todoItem) => (
          <TodoItem key={todoItem.id} item={todoItem} />
        ))}
      </div>
      <div>
        <TodoListStats />
        <TodoListFilters />
        <TodoItemCreator />

        {todoLists.map((todoItem) => (
          <TodoItem item={todoItem} key={todoItem.id} />
        ))}
      </div>
    </>
  );
};

export default RecoilExample;
