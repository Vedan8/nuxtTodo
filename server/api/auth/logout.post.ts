export default defineEventHandler((event) => {
  deleteCookie(event, "token");

  return {
    message: "Logged out",
  };
});
