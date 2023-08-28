import express from "express";
import passport from "passport";

import publisherCtrl from "../controllers/publisher.controller";

const router = express.Router();

router
  .route("/api/publishers")
  .get(publisherCtrl.readAll)
  .post(passport.authenticate("jwt"), publisherCtrl.create);
router
  .route("/api/publishers/:id")
  .get(publisherCtrl.readById)
  .put(passport.authenticate("jwt"), publisherCtrl.update)
  .delete(passport.authenticate("jwt"), publisherCtrl.remove);
router.route("/api/publishers/find/:filter").get(publisherCtrl.readByName);

export default router;
