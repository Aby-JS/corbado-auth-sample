export const getBearerTokenFromCookie = () => {
  const cookies = document.cookie.split(";");
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    if (cookie.startsWith("cbo_short_session=")) {
      return cookie.substring("cbo_short_session=".length);
    }
  }
};
