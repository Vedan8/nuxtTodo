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

    await getTodos();
  };

  const updateTodo = async (id: string, completed: boolean) => {
    await $fetch(
      `/api/todos/${id}`,

      {
        method: "PUT",

        body: {
          completed,
        },
      },
    );

    await getTodos();
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
