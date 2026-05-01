const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Post = require("../models/Post");
const { protect } = require("../middleware/authMiddleware");

router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    const posts = await Post.find({ author: req.params.id }).sort({
      createdAt: -1,
    });
    res.json({ user, posts });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put("/:id/linkedin", protect, async (req, res) => {
  try {

    if (req.user._id.toString() !== req.params.id) {
      return res.status(401).json({ message: "Not authorized" });
    }
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { linkedIn: req.body.linkedIn },
      { new: true },
    ).select("-password");
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
module.exports = router;
