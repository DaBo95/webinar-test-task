import { TodoItemsState } from './types';

function generateId() {
  return `${Date.now().toString(36)}-${Math.floor(
    Math.random() * 1e16
  ).toString(36)}`;
}

export function todoItemsReducer(
  state: TodoItemsState,
  action: any
) {
  switch (action.type) {
    case "loadState": {
      return action.data;
    }
    case "add":
      return {
        ...state,
        todoItems: [
          { id: generateId(), done: false, ...action.data.todoItem },
          ...state.todoItems,
        ],
      };
    case "delete":
      return {
        ...state,
        todoItems: state.todoItems.filter(({ id }) => id !== action.data.id),
      };
    case "edit":
      return {
        ...state,
        todoItems: state.todoItems.map((item) =>
          item.id === action.data.id ? action.data : item
        ),
      };
    case "toggleDone":
      const itemIndex = state.todoItems.findIndex(
        ({ id }) => id === action.data.id
      );
      const item = state.todoItems[itemIndex];

      return {
        ...state,
        todoItems: [
          ...state.todoItems.slice(0, itemIndex),
          { ...item, done: !item.done },
          ...state.todoItems.slice(itemIndex + 1),
        ],
      };
    default:
      throw new Error();
  }
}

export default todoItemsReducer;