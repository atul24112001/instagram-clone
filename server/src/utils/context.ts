import { User } from "../types";
import { prisma, verifyToken } from "./functions";

type Context = {
  currentUser: null | User;
};

export const context = async ({ req }: any) => {
  const ctx: Context = {
    currentUser: null,
  };

  const token = req.headers["token"];

  if (token) {
    const payload = await verifyToken(token);
    if (payload && typeof payload == "object") {
      const user = await prisma.user.findFirst({
        where: {
          id: payload.id,
        },
      });
      if (user && user.token === token) {
        ctx["currentUser"] = user;
      }
    }
  }
  return ctx;
};
