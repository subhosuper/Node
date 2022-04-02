const express = require('express');
const tourController = require("./../controllers/tourControllers");
const router = express.Router();

// router.param('id', tourController.checkID);

router
    .route("/top-5-cheap")
    .get(tourController.top5cheap, tourController.getAllTours)

router
    .route("/tour-stats")
    .get(tourController.getTourStats);

router
    .route("/tour-schedule-2021/:year")
    .get(tourController.getYearSchedule);

router
    .route("/")
    .get(tourController.getAllTours)
    .post(tourController.newTour);
    // .post(tourController.checkBody, tourController.newTour);


router
    .route("/:id")
    .get(tourController.getTour)
    .patch(tourController.updateTour)
    .delete(tourController.deleteTour);


module.exports = router;
