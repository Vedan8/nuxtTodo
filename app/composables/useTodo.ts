import type { Todo } from "~/types/todo";

export const useTodo = () => {
  const todos = useState<Todo[]>("todos", () => []);

  const getTodos = async () => {
    const { data } = await useFetch<Todo[]>("/api/todos");

    todos.value = data.value || [];
  };

  const createTodo = async (title: string) => {
    await $fetch(
      "/api/todos/create",

      {
        method: "POST",

        body: {
          title,
        },
      },
    );

    const data = await $fetch<Todo[]>("/api/todos");
    todos.value = data || [];
  };

  const updateTodo = async (id: string, completed: boolean) => {
    const todo = todos.value.find(t => t._id === id);
    if (todo) {
      todo.completed = completed;
    }

    await $fetch(
      `/api/todos/${id}`,

      {
        method: "PUT",

        body: {
          completed,
        },
      },
    );
  };

  const deleteTodo = async (id: string) => {
    await $fetch(
      `/api/todos/${id}`,

      {
        method: "DELETE",
      },
    );

    todos.value = todos.value.filter((todo) => todo._id !== id);
  };

  return {
    todos,
    getTodos,
    createTodo,
    updateTodo,
    deleteTodo,
  };
};
