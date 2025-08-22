export const handleWebhook = (req, res) => {
  // Handle webhook events
  res.status(200).send("Webhook received");
};
