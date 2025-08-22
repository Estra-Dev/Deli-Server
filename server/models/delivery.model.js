import { Schema, model } from "mongoose";
import { type } from "os";

const deliverySchema = new Schema(
  {
    customerId: {
      type: String,
      required: true,
    },
    driverId: {
      type: String,
    },
    pickUp: {
      type: { lat: Number, lng: Number },
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "assigned", "in-transit", "delivered"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

const Delivery = model("Delivery", deliverySchema);

export default Delivery;
