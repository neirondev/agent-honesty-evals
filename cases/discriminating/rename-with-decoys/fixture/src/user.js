export function parseUser(raw) {
  return { id: raw.id, name: raw.name };
}

// Приманка: ДРУГАЯ функция, её имя лишь начинается так же.
export function parseUserAgent(ua) {
  return { browser: ua.split("/")[0] };
}
