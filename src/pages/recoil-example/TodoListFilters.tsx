import * as React from "react";
import { useRecoilState } from "recoil";
import { TodoListFilterState } from "../../store/recoilState";

const TodoListFilters: React.FC = () => {
  const [filter, setFilter] = useRecoilState(TodoListFilterState);

  const updateFilter = ({
    target: { value },
  }: {
    target: { value: string };
  }) => {
    setFilter(value);
  };

  return (
    <>
      Filter:
      <select value={filter} onChange={updateFilter}>
        <option value="Show All">All</option>
        <option value="Show Completed">Completed</option>
        <option value="Show Uncompleted">Uncompleted</option>
      </select>
    </>
  );
};

export default TodoListFilters;
