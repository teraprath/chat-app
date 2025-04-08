import { Router } from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { getContacts, getMessages, sendMessage } from "../controllers/contact.controller.js";

const router = Router();

router.get("/all", protectRoute, getContacts);
router.get("/:id", protectRoute, getMessages);
router.post("/send/:id", protectRoute, sendMessage);

export default router;
