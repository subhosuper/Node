const express = require('express');
const tourController = require("./../controllers/tourControllers");
const router = express.Router();

// router.param('id', tourController.checkID);

router
    .route("/")
    .get(tourController.getAllTours)
    .post(tourController.checkBody, tourController.newTour);

router
    .route("/:id")
    .get(tourController.getTour)
    .patch(tourController.updateTour)
    .delete(tourController.deleteTour);


module.exports = router;
