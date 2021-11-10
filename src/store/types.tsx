export interface TodoItem {
    id: string;
    title: string;
    details?: string;
    done: boolean;
  }
  
  export interface TodoItemsState {
    todoItems: TodoItem[];
  }
  