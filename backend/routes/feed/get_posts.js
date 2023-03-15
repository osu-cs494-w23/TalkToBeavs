import { Router } from "express";
import Post from "../../models/Feed/Post.js";
import Feed from "../../models/Feed/Feed.js";

const router = Router();

router.get("/", async (req, res) => {
    try {
        const feed = await Feed.find({}).populate("posts").exec();
    
        return res.status(200).json({ message: "Posts retrieved", posts: feed });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
});

export default router;