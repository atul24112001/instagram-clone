import { getToken, hashText, prisma, verifyHash } from "../utils/functions";

export interface CreateUserPayload {
  email: string;
  password: string;
  name: string;
}

class UserService {
  public static async createUser(payload: CreateUserPayload) {
    const { email, name, password } = payload;
    const hashedPassword = await hashText(password);

    const emailIsNoUnique = await this.getUserById(email);

    if (emailIsNoUnique) {
      return {
        message: "Email already exist, please login.",
        status: 400,
      };
    }

    const user = await prisma.user.create({
      data: {
        email,
        name,
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

    await prisma.profile.create({
      data: {
        userId: user.id,
      },
    });
    return {
      message: "Sign up successfully!",
      token,
      status: 200,
    };
  }

  public static async login(payload: CreateUserPayload) {
    const { email, password } = payload;
    const userExist = await this.getUserById(email);

    if (!userExist) {
      return {
        message: "User Not found, please sign up",
        status: 400,
      };
    }
    const correctPassword = await verifyHash(password, userExist.password);
    if (!correctPassword) {
      return {
        message: "Invalid Password, please enter correct password.",
        status: 400,
      };
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
      status: 200,
    };
  }

  public static async getUserById(id: string) {
    try {
      const user = await prisma.user.findFirst({
        where: {
          OR: [{ id: id }, { email: id }],
        },
      });
      if (user) {
        return user;
      }
    } catch (error) {
      console.log(error);
    }
    return null;
  }

  public static async verifyUser(context: any) {
    if (!context.currentUser) {
      return {
        message: "Verification failed.",
        status: 400,
      };
    }
    return {
      id: context.currentUser.id,
      name: context.currentUser.name,
      email: context.currentUser.email,
    };
  }
}

export default UserService;
