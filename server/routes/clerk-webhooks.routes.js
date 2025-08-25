import express from "express";
import { handleWebhook } from "../controller/clerk-webhook.controller.js";
import bodyParser from "body-parser";

const router = express.Router();

router.post(
  "/clerk-webhooks",
  bodyParser.raw({ type: "application/json" }),
  handleWebhook
);

export default router;
