import express from "express";
import passport from "passport";
import multer from "multer";

import bookCtrl from "../controllers/book.controller";

const storage = multer.memoryStorage();
const upload = multer({ storage });

const router = express.Router();

router
  .route("/api/books")
  .get(bookCtrl.readAll)
  .post(passport.authenticate("jwt"), upload.single("image"), bookCtrl.create);
router
  .route("/api/books/:id")
  .get(bookCtrl.readById)
  .post(passport.authenticate("jwt"), bookCtrl.addAuthor)
  .put(passport.authenticate("jwt"), upload.single("image"), bookCtrl.update)
  .delete(passport.authenticate("jwt"), bookCtrl.remove);
router.route("/api/books/find/:filter").get(bookCtrl.readByName);
router.route("/api/books/publisher/:id").get(bookCtrl.readByPubId);

export default router;
