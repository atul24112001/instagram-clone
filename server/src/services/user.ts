import { GraphQLError } from "graphql";
import { getToken, hashText, prisma, verifyHash } from "../utils/functions";
import { CreateUserPayload } from "../../types";

class UserService {
  private static async checkAuth() {
    return async () => {};
  }
  public static async createUser(payload: CreateUserPayload) {
    const { email, name, password, userName } = payload;
    const hashedPassword = await hashText(password);

    const emailIsNoUnique = await this.getUserById(email);

    if (emailIsNoUnique) {
      throw new GraphQLError("Email already exist, please login.", {
        extensions: {
          code: "FORBIDDEN",
        },
      });
    }

    const user = await prisma.user.create({
      data: {
        email,
        name,
        userName,
        password: hashedPassword,
      },
    });

    const token = getToken({
      email,
      id: user.id,
    });

    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        token,
        isLogin: true,
      },
    });

    return {
      message: "Sign up successfully!",
      token,
      name,
      email,
      id: user.id,
    };
  }

  public static async login(payload: CreateUserPayload) {
    const { email, password } = payload;
    const userExist = await this.getUserById(email);

    if (!userExist) {
      throw new GraphQLError("User Not found, please sign up.", {
        extensions: {
          code: "FORBIDDEN",
        },
      });
    }
    const correctPassword = await verifyHash(password, userExist.password);
    if (!correctPassword) {
      throw new GraphQLError(
        "Invalid Password, please enter correct password.",
        {
          extensions: {
            code: "FORBIDDEN",
          },
        }
      );
    }
    const token = getToken({
      email,
      id: userExist.id,
    });

    await prisma.user.update({
      where: {
        id: userExist.id,
      },
      data: {
        token,
        isLogin: true,
      },
    });

    return {
      message: "Login Successful",
      token,
      name: userExist.name,
      email,
      id: userExist.id,
    };
  }

  public static async getUserById(id: string) {
    const user = await prisma.user.findFirst({
      where: {
        OR: [{ id: id }, { email: id }],
      },
    });
    if (user) {
      return user;
    }

    return null;
  }

  public static async verifyUser(context: any) {
    if (!context.currentUser) {
      throw new GraphQLError("Verification failed.", {
        extensions: {
          code: "FORBIDDEN",
        },
      });
    }
    return {
      id: context.currentUser.id,
      name: context.currentUser.name,
      email: context.currentUser.email,
      useName: context.currentUser.userName,
    };
  }

  public static async verifyToken(token: string) {
    // const payload = await verifyToken(token);
    //  if(ctx)

    throw new GraphQLError("Verification failed.", {
      extensions: {
        code: "FORBIDDEN",
      },
    });
  }
}

export default UserService;
