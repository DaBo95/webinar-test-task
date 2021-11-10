export interface TodoItem {
  id: string;
  title: string;
  details?: string;
  done: boolean;
}

export interface TodoItemsState {
  todoItems: TodoItem[];
}

export interface ITodoItemsAction<T, P> {
  type: T;
  data: P;
}

export type TodoItemsAction =
  | ITodoItemsAction<"loadState" | "reorder", { todoItems: TodoItem[] }>
  | ITodoItemsAction<"add", { todoItem: { title: string; details?: string } }>
  | ITodoItemsAction<"delete" | "toggleDone", { id: string }>
  | ITodoItemsAction<"edit", TodoItem>;
