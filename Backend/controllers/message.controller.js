import { Message } from "../models/message.model.js";
import { User } from "../models/user.model.js";
import { v2 as cloudinary } from "cloudinary";

// users will be displayed at the side bar
export const getUserForSideBar = async (req, res) => {
  try {
    const loggedInUser = req.user._id;
    const filteredUsers = await User.find({ id: { $ne: loggedInUser } }).select(
      -password
    );
    res.status(200).json(filteredUsers);
  } catch (error) {
    console.log("error in getuserforsidebar", error);
    res.status(400).json({ message: "Internal Server Error" });
  }
};

// get previous messages
export const getMessages = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const myId = req.user._id;
    const messages = await Message.find({
      $or: [
        { senderId: myId, receiverId: userToChatId },
        { senderId: userToChatId, receiverId: myId },
      ],
    });
    res.status(200).json(messages);
  } catch (error) {
    console.log("error in get message function", error);
    res.status(400).json({ message: "Internal Server Error" });
  }
};

// send messages
export const sendMessages = async (req, res) => {
  try {
    const { text, image } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    let imageUrl;

    if (image) {
      const uploadResponse = await cloudinary.uploader.upload(image);
      imageUrl = uploadResponse.secure_url;
    }
    const newMessage = new Message({
      senderId,
      receiverId,
      image: imageUrl,
      text,
    });

    // real time functionality will go here
    await newMessage.save();
    res.status(201).json(newMessage);
  } catch (error) {
    console.log("error in get send message function", error);
    res.status(400).json({ message: "Internal Server Error" });
  }
};