const express = require("express");
const router = express.Router();

const {
  createMessage,
  getMessages,
  markMessageAsRead,
  deleteMessage
} = require("../controllers/messageController");

const { protect, adminOnly } = require("../middleware/authMiddleware");

// Public contact form
router.post("/", createMessage);

// Admin message management
router.get("/", protect, adminOnly, getMessages);
router.patch("/:id/read", protect, adminOnly, markMessageAsRead);
router.delete("/:id", protect, adminOnly, deleteMessage);

module.exports = router;