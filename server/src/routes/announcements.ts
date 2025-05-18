import express from "express";
import {
  createAnnouncement,
  deleteAnnouncement,
  getAnnouncements,
  getAnnouncement,
  updateAnnouncement,
} from "../controllers/announcements";
import { protect } from "../middleware/auth";

const router = express.Router();

router.use(protect);

router.route("/").get(getAnnouncements).post(createAnnouncement);

router
  .route("/:id")
  .get(getAnnouncement)
  .put(updateAnnouncement)
  .delete(deleteAnnouncement);

export default router;
