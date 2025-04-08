import User from "../models/user.model.js";
import Message from "../models/message.model.js";
import cloudinary from "../lib/cloudinary.js";

export const getContacts = async (req, res) => {
  try {

    const userId = req.user._id;
    const filteredContacts = await User.find({ _id: {$ne:userId} }).select("-password");

    res.status(200).json({filteredContacts});

  } catch (error) {
    console.log("Error in getContacts controller", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getMessages = async (req, res) => {
  try {

    const senderId = req.user._id;
    const { id: receiverId } = req.params;

    const filteredMessages = await Message.find({
      $or: [
        { senderId: senderId, receiverId: receiverId },
        { senderId: receiverId, receiverId: senderId },
      ],
    });

    res.status(200).json({filteredMessages});

  } catch (error) {
    console.log("Error in getMessages controller", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const sendMessage = async (req, res) => {
  try {

    const { text, image } = req.body;
    const senderId = req.user._id;
    const { id: receiverId } = req.params;

    let imageUrl;
    if (image) {
      const uploadResponse = await cloudinary.uploader.upload(image);
      imageUrl = uploadResponse.secure_url;
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      text,
      image: imageUrl,
    });

    await newMessage.save();

    // TODO: Realtime functioniallity with socket.io

    res.status(201).json(newMessage);

  } catch (error) {
    console.log("Error in sendMessage controller", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
