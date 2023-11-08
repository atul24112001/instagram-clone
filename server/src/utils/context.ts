import UserService from "../services/user";
import { verifyToken } from "./functions";
import { Request } from "express";

export const context = async ({ req }: any) => {
  const ctx = {
    currentUser: null,
  };

  const token = req.headers["token"];
  if (token) {
    const payload = await verifyToken(token);
    if (payload && typeof payload == "object") {
      const user = await UserService.getUserById(payload.id);
      return {
        currentUser: user,
      };
    }
  }
  return ctx;
};
