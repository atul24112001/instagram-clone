import { Request, Response, NextFunction } from "express";
import { dbError, prisma, verifyToken } from "../../utils/functions";

export async function checkAuth(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const authorization = req.header("authorization");
    const token = authorization?.split(" ")[1];
    if (!token) {
      dbError(res, "Access Denied.", 400);
      return;
    }

    const payload: any = verifyToken(token);
    if (!payload) {
      dbError(res, "Access Denied.", 400);
      return;
    }

    const user = await prisma.user.findFirst({
      where: {
        id: payload?.id ?? "",
      },
    });

    if (!user) {
      dbError(res, "User not found!", 404);
      return;
    }

    if (user.token !== token || !user.isLogin) {
      dbError(res, "Unauthorized token!", 401);
      return;
    }

    req.currentUser = {
      email: user.email,
      id: user.id,
      token: null,
      isLogin: true,
      name: user.name,
      password: user.password,
    };
    next();
    return;
  } catch (error) {
    res.status(500).json({
      message: "Internal server error.",
    });
  }
}
