import { Router } from "express";
import { checkAuth } from "../middleware";
import { getAsset } from "../controller/assets";

export const assetRouter = Router();

assetRouter.get(
  "/:id", //checkAuth,
  getAsset
);
