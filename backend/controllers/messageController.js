const Message = require("../models/Message");

// Submit a contact message
const createMessage = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        message: "Please fill in all fields"
      });
    }

    if (
      name.length > 100 ||
      email.length > 254 ||
      subject.length > 150 ||
      message.length > 5000
    ) {
      return res.status(400).json({
        message: "One or more fields exceed the allowed length"
      });
    }

    const newMessage = await Message.create({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      subject: subject.trim(),
      message: message.trim()
    });

    res.status(201).json({
      message: "Your message has been sent successfully",
      data: newMessage
    });
  } catch (error) {
    res.status(500).json({
      message: "Unable to send your message"
    });
  }
};

// Get all contact messages (admin)
const getMessages = async (req, res) => {
  try {
    const messages = await Message.find()
      .sort({ createdAt: -1 });

    res.status(200).json({
      totalMessages: messages.length,
      messages
    });
  } catch (error) {
    res.status(500).json({
      message: "Unable to retrieve messages"
    });
  }
};

// Mark a message as read (admin)
const markMessageAsRead = async (req, res) => {
  try {
    const message = await Message.findByIdAndUpdate(
      req.params.id,
      { isRead: true },
      { new: true }
    );

    if (!message) {
      return res.status(404).json({
        message: "Message not found"
      });
    }

    res.status(200).json({
      message: "Message marked as read",
      data: message
    });
  } catch (error) {
    res.status(500).json({
      message: "Unable to update message"
    });
  }
};

// Delete a message (admin)
const deleteMessage = async (req, res) => {
  try {
    const message = await Message.findByIdAndDelete(req.params.id);

    if (!message) {
      return res.status(404).json({
        message: "Message not found"
      });
    }

    res.status(200).json({
      message: "Message deleted successfully"
    });
  } catch (error) {
    res.status(500).json({
      message: "Unable to delete message"
    });
  }
};

module.exports = {
  createMessage,
  getMessages,
  markMessageAsRead,
  deleteMessage
};