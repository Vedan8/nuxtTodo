import type { User } from "../types/user";

export const useAuth = () => {
  const user = useState<User | null>("user", () => null);

  const login = async (email: string, password: string) => {
    await $fetch("/api/auth/login", {
      method: "POST",

      body: {
        email,
        password,
      },
    });

    const data = await $fetch<User | null>("/api/auth/me");
    user.value = data || null;
  };

  const register = async (
    username: string,
    email: string,
    password: string,
  ) => {
    await $fetch("/api/auth/register", {
      method: "POST",

      body: {
        username,
        email,
        password,
      },
    });
  };

  const logout = async () => {
    await $fetch("/api/auth/logout", {
      method: "POST",
    });

    user.value = null;

    await navigateTo("/login");
  };

  const getCurrentUser = async () => {
    const { data } = await useFetch<User | null>("/api/auth/me");

    user.value = data.value || null;
  };

  return {
    user,
    login,
    register,
    logout,
    getCurrentUser,
  };
};
