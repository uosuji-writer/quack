import { Middleware } from "@planigale/planigale";
import type { Core } from "../../../core/mod.ts";
import { AccessDenied } from "../errors.ts";

export const authMiddleware = (core: Core): Middleware => async (req, next) => {
  let token = getBearer(req.headers);
  if (!token) {
    token = req.cookies.get("token");
  }
  if (token) {
    req.state.token = token;
    req.state.session = await core.session.get({ token });
    if (!req.state.session) {
      // req.cookies.delete("token");
      return await auth(req, next);
    }
    req.state.user = await core.user.get({ id: req.state.session.userId });
    // console.log(req.state.user)
  }
  return await auth(req, next);
};

function getBearer(headers: Record<string, string>): string | undefined {
  const bearer = headers.authorization || "";
  return bearer.split(/[\s]+/)[1];
}

export const auth: Middleware = async (req, next) => {
  const isPublic = req.route?.definition.public ?? false;
  const authEnabled = !isPublic;
  if (!authEnabled || req.state.user) {
    return await next();
  }
  throw new AccessDenied("Access Denied");
};
