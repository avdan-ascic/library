import express from "express";
import passport from "passport";
import multer from "multer";

import authorCtrl from "../controllers/author.controller";

const storage = multer.memoryStorage();
const upload = multer({ storage });

const router = express.Router();

router
  .route("/api/authors")
  .get(authorCtrl.readAll)
  .post(
    passport.authenticate("jwt"),
    upload.single("image"),
    authorCtrl.create
  );
router
  .route("/api/authors/:id")
  .get(authorCtrl.readById)
  .post(passport.authenticate("jwt"), authorCtrl.addBook)
  .put(passport.authenticate("jwt"), upload.single("image"), authorCtrl.update)
  .delete(passport.authenticate("jwt"), authorCtrl.remove);
router.route("/api/authors/find/:filter").get(authorCtrl.readByName);

export default router;
