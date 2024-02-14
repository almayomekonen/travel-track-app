const express = require("express");
const { check } = require("express-validator");
const fileUpload = require("../middleware/file-upload");
const checkAuth = require("../middleware/check-auth");

const placesControllers = require("../controllers/places-controllers");
const {travelTrack, buildTrack} = require('../util/ChatGpt')

const routes = express.Router();

routes.get("/:pid", placesControllers.getPlaceById);

routes.get("/user/:uid", placesControllers.getPlacesByUserId);

routes.post("/travelTrack", travelTrack);

routes.use(checkAuth);

routes.post(
  "/",
  fileUpload.single("image"),
  [
    check("title").not().isEmpty(),
    check("description").isLength({ min: 6 }),
    check("address").not().isEmpty(),
  ],
  placesControllers.createPlace
);

routes.post("/build", buildTrack);

routes.patch(
  "/:pid",
  [check("title").not().isEmpty(), check("description").isLength({ min: 6 })],
  placesControllers.updatePlace
);

routes.delete("/:pid", placesControllers.deletePlace);

module.exports = routes;