import express from "express";
import { handleWebhook } from "../controller/clerk-webhook.controller.js";

const router = express.Router();

router.post("/clerk-webhooks", handleWebhook);

export default router;
