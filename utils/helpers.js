export const getCookies = (req) => {
  let cookies = {};

  const cookiesArray = req.headers.cookie.split(';');

  cookiesArray.forEach((cookie) => {
      const [key, value] = cookie.trim().split('=');
      cookies[key] = value;
  });

  return cookies;
}