import { Webhook } from "svix";
import User from "../models/User.js";

const CLERK_WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

export const handleWebhook = async (req, res) => {
  // Handle webhook events
  const payload = req.body;
  const headers = req.headers;

  try {
    // verify clerk webhook with svix
    const wh = new Webhook(CLERK_WEBHOOK_SECRET);
    const evt = wh.verify(JSON.stringify(payload), headers);

    switch (evt.type) {
      case "user.created":
        // Handle user created event
        await User.create({
          clerkId: evt.data.id,
          email: evt.data.emailAddresses[0].email_address,
          firstName: evt.data.first_name,
          lastName: evt.data.last_name,
        });

        console.log(User);
        break;

      case "user.updated":
        // update user
        await User.findOneAndUpdate(
          { clerkId: evt.data.id },
          {
            email: evt.data.emailAddresses[0].email_address,
            firstName: evt.data.first_name,
            lastName: evt.data.last_name,
          }
        );

        console.log(User);
        break;

      case "user.deleted":
        // delete user
        await User.findOneAndDelete({ clerkId: evt.data.id });

        console.log("User Deleted");
        break;

      default:
        console.log(`Unhandled event type: ${evt.type}`);
        break;
    }

    res.status(200).json({ message: "Webhook processed" });
  } catch (error) {
    console.error(`Error handling webhook: ${error.message}`);
    res.status(400).json({ message: "Invalid signature" });
  }
  // res.status(200).send("Webhook received");
};
