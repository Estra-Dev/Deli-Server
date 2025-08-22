import Delivery from "../models/delivery.model.js";

export const create = async (req, res) => {
  try {
    const delivery = new Delivery(req.body);
    await delivery.save();
    res.status(201).json(delivery);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getDelivery = async (req, res) => {
  try {
    const deliveeries = await Delivery.find();
    res.status(200).json(deliveeries);
  } catch (error) {
    console.log(first);
    res.status(400).json({ error: error.message });
  }
};
