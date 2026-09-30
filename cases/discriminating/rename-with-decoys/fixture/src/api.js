import { parseUser, parseUserAgent } from "./user.js";

export function handle(req) {
  const user = parseUser(req.body);
  const agent = parseUserAgent(req.headers["user-agent"]);
  return { user, agent };
}
