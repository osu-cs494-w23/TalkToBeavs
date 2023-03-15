import { Router } from "express";
import joi from "joi";
import User from "../../models/User/User.js";
const router = Router();

router.post("/", async (req, res) => {
  const schema = joi.object({
    password: joi.string().required(),
    email: joi
      .string()
      .pattern(new RegExp("^[a-zA-Z._%+-]+@oregonstate.edu$"))
      .required(),
  });

  try {
    const { error } = schema.validate(req.body);

    if (error) {
      return res.status(401).json({ message: error.details[0].message });
    }

    const user = await User.findOne({ email: req.body.email });

    if (user) {
      return res.status(200).json({ message: "Welcome Back!", user: user });
    }

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

export default router;
