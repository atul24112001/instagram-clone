import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const prisma = new PrismaClient();

export const hashText = async (text: string) => {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(text, salt);
  return hash;
};

export const verifyHash = async (text: string, hash: string) => {
  const result = await bcrypt.compare(text, hash);
  return result;
};

export const getToken = (payload: any, expiresIn: string = "365d") => {
  const token = jwt.sign(payload, process.env.SECRET as string, { expiresIn });
  return token;
};

export const verifyToken = async (token: string, expiresIn: number = 356) => {
  try {
    const secret = process.env.SECRET as string;
    const payload = jwt.verify(token, secret);
    return payload;
  } catch (error: any) {
    console.log(error.message);
    return null;
  }
};
