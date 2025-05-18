import express from "express";
import {
  createAnnouncement,
  deleteAnnouncement,
  getAnnouncements,
  getAnnouncement,
  updateAnnouncement,
} from "../controllers/announcements";

const router = express.Router();

router.route("/").get(getAnnouncements).post(createAnnouncement);

router
  .route("/:id")
  .get(getAnnouncement)
  .put(updateAnnouncement)
  .delete(deleteAnnouncement);

export default router;
