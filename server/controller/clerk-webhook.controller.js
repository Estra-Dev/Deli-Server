import { Webhook } from "svix";
import User from "../models/User.js";

// const CLERK_WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

export const handleWebhook = async (req, res, next) => {
  console.log("incoming webhook");
  next();
  // try {
  //   const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET);
  //   const payload = req.body;
  //   const headers = req.headers;
  //   const evt = wh.verify(payload, headers);

  //   console.log("verified event type", evt.type);

  //   switch (evt.type) {
  //     case "user.created": {
  //       const userExists = await User.findOne({
  //         clerkId: evt.data.id,
  //       });
  //       // // Handle user created event
  //       if (!userExists) {
  //         // User does not exist
  //         console.log("User does not exist");
  //         // return res.status(200).json({ message: "User already exists" });
  //       }
  //       const newUser = await User.create({
  //         clerkId: evt.data.id,
  //         email: "user@example.com",
  //         firstName: evt.data.first_name,
  //         lastName: evt.data.last_name,
  //       });
  //       console.log(newUser);
  //       break;
  //     }
  //     case "user.updated": {
  //       // update user

  //       const updatedUser = await User.findOneAndUpdate(
  //         { clerkId: evt.data.id },
  //         {
  //           email: evt.data.email_addresses[0].email_address,
  //           firstName: evt.data.first_name,
  //           lastName: evt.data.last_name,
  //         }
  //       );
  //       console.log("Updated User:", updatedUser);
  //       break;
  //     }
  //     case "user.deleted": {
  //       // delete user
  //       await User.findOneAndDelete({ clerkId: evt.data.id });

  //       console.log("User Deleted");
  //       break;
  //     }
  //     default:
  //       console.log(`Unhandled event type: ${evt.type}`);
  //       break;
  //   }

  //   // res.json({ received: true });
  //   // res.status(200).json({ message: "Webhook received" });
  //   res.status(200).json({ message: "Webhook received", event: evt.type });
  // } catch (error) {
  //   console.log("Verification failed", error.message);
  //   res.status(400).json({ message: "Invalid signature" });
  // }
};
