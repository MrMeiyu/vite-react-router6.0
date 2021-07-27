import { atom, selector } from "recoil";

const TextState = atom({
  key: "textState", // 唯一标识
  default: "", // 默认值
});

const CharCountState = selector({
  key: "charCountState", // 唯一标识
  get: ({ get }) => {
    const text = get(TextState);

    return text.length;
  },
});

const TodoListState = atom({
  key: "todoListState",
  default: [],
});

const TodoListFilterState = atom({
  key: "todoListFilterState",
  default: "Show All",
});

const FilteredTodoListState = selector({
  key: "filteredTodoListState",
  get: ({ get }) => {
    const filter = get(TodoListFilterState);
    const list = get(TodoListState);

    switch (filter) {
      case "Show Completed":
        return list.filter((item) => item.isComplete);
      case "Show Uncompleted":
        return list.filter((item) => !item.isComplete);
      default:
        return list;
    }
  },
});

const TodoListStatsState = selector({
  key: "todoListStatsState",
  get: ({ get }) => {
    const todoList = get(FilteredTodoListState);
    const totalNum = todoList.length;
    const totalCompletedNum = todoList.filter((item) => item.isComplete).length;
    const totalUncompletedNum = totalNum - totalCompletedNum;
    const percentCompleted = totalNum === 0 ? 0 : totalCompletedNum / totalNum;

    return {
      totalNum,
      totalCompletedNum,
      totalUncompletedNum,
      percentCompleted,
    };
  },
});

export {
  TextState,
  CharCountState,
  TodoListState,
  TodoListFilterState,
  FilteredTodoListState,
  TodoListStatsState,
};
