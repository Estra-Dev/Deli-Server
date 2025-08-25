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
      case "user.created": {
        const userExists = await User.findOne({
          email: evt.data.email_addresses[0].email_address,
        });
        // Handle user created event
        if (userExists) {
          // User already exists
          console.log("User already exists");
          // return res.status(200).json({ message: "User already exists" });
        }
        const newUser = await User.create({
          clerkId: evt.data.id,
          email: evt.data.email_addresses[0].email_address,
          firstName: evt.data.first_name,
          lastName: evt.data.last_name,
        });

        res.status(201).json(newUser);
        console.log(newUser);
        break;
      }
      case "user.updated": {
        // update user

        const userExists = await User.findOne({
          email: evt.data.email_addresses[0].email_address,
        });
        if (!userExists) {
          // User does not exist
          console.log("User does not exist");
          return res.status(200).json({ message: "User does not exist" });
        }
        const updatedUser = await User.findOneAndUpdate(
          { clerkId: evt.data.id },
          {
            email: evt.data.email_addresses[0].email_address,
            firstName: evt.data.first_name,
            lastName: evt.data.last_name,
          }
        );

        // res.status(200).json(updatedUser);
        console.log(updatedUser);
        break;
      }
      case "user.deleted": {
        // delete user
        await User.findOneAndDelete({ clerkId: evt.data.id });

        console.log("User Deleted");
        break;
      }
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
