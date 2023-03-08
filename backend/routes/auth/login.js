import { Router } from "express";
import joi from "joi";
import User from "../../models/User.js";
const router = Router();

router.post("/", async (req, res) => {
  const schema = joi.object({
    password: joi.string().required(),
    email: joi
      .string()
      .pattern(new RegExp("^[a-zA-Z._%+-]+@oregonstate.edu$"))
      .required(),
  });
      

  if (!req.body.email) {
    return res.status(400).json({ message: "Email is required" });
  }

  if (!req.body.password) {
    return res.status(400).json({ message: "Password is required" });
  }

  try {
    const { error } = schema.validate(req.body);

    if (error) {
      return res.status(400).json(error.details[0].message);
    }

    const user = await User.find({ email: req.body.email });

    if (user.length > 0) {
      if (user[0].password === req.body.password) {
        return res.status(200).json({ message: "Welcome back!" });
      } else {
        return res.status(400).json({ message: "Incorrect password" });
      }
    } else {
      return res.status(201).json({ message: `User not found` });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

export default router;
