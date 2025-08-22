import express from "express";
import { create, getDelivery } from "../controller/deliveries.controller.js";
import { requireAuth } from "@clerk/express";

const router = express.Router();

router.post("/create", requireAuth(), create);
router.post("/getdelivery", requireAuth(), getDelivery);

export default router;
