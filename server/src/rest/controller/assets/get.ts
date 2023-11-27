import { Request, Response } from "express";
import { dbError, s3 } from "../../../utils/functions";

export async function getAsset(req: Request, res: Response) {
  try {
    const { id } = req.params;
    console.log(id);
    const s3Stream = s3
      .getObject({
        Bucket: process.env.S3_BUCKET_NAME as string,
        Key: `post/${id}`,
      })
      .createReadStream();

    return s3Stream.pipe(res);
  } catch (error) {
    dbError(res, error, 500);
  }
}
