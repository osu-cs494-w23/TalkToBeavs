import { Router } from "express";
import User from "../../models/User.js";
const router = Router();

router.get("/", async (req, res) => {
  const { name } = req.query;

  try {
    const user = await User.find({ name: name });
    if (user.length > 0) {
      return res.status(200).json(user);
    } else {
      return res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

export default router;
