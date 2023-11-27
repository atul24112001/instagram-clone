import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import AWS from "aws-sdk";
import { Kafka } from "kafkajs";

const broker = process.env.KAFKA_HOST as string;

export const kafka = new Kafka({
  brokers: [broker],
  clientId: "instagram-clone",
});

export const prisma = new PrismaClient();

AWS.config.update({
  accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
  region: process.env.AWS_S3_REGION,
});

export const s3 = new AWS.S3();

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
