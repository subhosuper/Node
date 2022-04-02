// const fs = require('fs');
const Tour = require("./../models/tourModel");
const APIFeatures = require("../utils/apiFeatures");
// var tours = JSON.parse(
//     fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
// );

// exports.checkID = (req, res, next, val) => {
//     console.log("CheckID middleware runs: ", id);
//     const tourIndex = tours.findIndex(el => el.id === id);

//     if (tourIndex === -1){
//         return res
//                   .status(404)
//                   .json({
//                       status: "fail",
//                       message: "Invalid ID"
//                   });
//     }
//     next();
// }

// exports.checkBody = (req, res, next) => {
//     console.log("This middleware works ", req.body);
//     if (Object.keys(req.body).length === 0 && req.body.constructor === Object) {
//         return res
//                 .status(400)
//                 .json({
//                     message: "Request contains no body",
//                     status: "error"
//             })
//     }
//     next();
// }

exports.top5cheap = (req, res, next) => {
  req.query.limit = "5";
  req.query.sort = "-ratingsAverage,price";
  console.log(req.query);
  next();
};



exports.getAllTours = async (req, res) => {
  // res.status(200).json({
  //     results: tours.length,
  //     data: tours,
  //     requestTime: req.requestTime,
  //     status: "success"
  // });

  try {
    const apiFeatures = new APIFeatures(Tour.find(), req.query);
    const query = apiFeatures.filter().sort().limitFields().paginate();
    const tours = await query.query;

    res.status(200).json({
      status: "success",
      result: tours.length,
      data: {
        tours,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: "fail",
      message: JSON.parse(err),
    });
  }
};

const catchAsync = fn => {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  }
}

exports.newTour = catchAsync(async (req, res, next) => {
  // console.log(req.body);
  // const newId = tours[tours.length - 1].id + 1;
  // const newTour = {id: newId, ...req.body};
  // tours.push(newTour);

  // fs.writeFile(`${__dirname}/../dev-data/data/tours-simple.json`, JSON.stringify(tours), err=>{
  //     res
  //    .status(201)
  //    .json(
  //        {
  //            data: newTour,
  //            status: "success"
  //         }
  //         );
  // }
  // );
  // try {
  // new Error("thtcsd")
  const newTour = await Tour.create(req.body);
  res.status(201).json({
    status: "success",
    data: newTour,
  });
});


exports.getTour = async (req, res) => {
  // const id = parseInt(req.params.id); // req.params.id * 1 => Int(id) as any * some number = number
  // const tourIndex = tours.findIndex(el => el.id === id);

  // if (tourIndex === -1){
  //     return res
  //               .status(404)
  //               .json({
  //                   status: "fail",
  //                   message: "Invalid ID"
  //               });
  // }
  // res
  //    .status(200)
  //    .json({
  //        data: tours[tourIndex],
  //        status: "success"
  //    });

  try {
    const tour = await Tour.findById(req.params.id);
    res.status(200).json({
      data: tour,
      status: "success",
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

exports.updateTour = async (req, res) => {
  // const id = parseInt(req.params.id); // req.params.id * 1 => Int(id) as any * some number = number
  // const indexTour = tours.findIndex(el => el.id === id);

  // if (indexTour === -1){
  //     return res
  //               .status(404)
  //               .json({
  //                   status: "fail",
  //                   message: "Invalid ID"
  //               });
  // }
  // const newTour = tours;
  // newTour[indexTour]["description"] = reqBody;
  // fs.writeFile(`${__dirname}/../dev-data/data/tours-simple.json`, JSON.stringify(newTour), err=>{
  //     res
  //    .status(200)
  //    .json({
  //        status: "success",
  //        data: newTour
  //    });
  // })
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true, //to return new document after updating
      runValidators: true
    });

    res.status(200).json({
      status: "success",
      data: {
        tour,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "fail",
      message: err,
    });
  }
};

exports.deleteTour = async (req, res) => {
  // const id = parseInt(req.params.id); // req.params.id * 1 => Int(id) as any * some number = number
  // const indexTour = tours.findIndex(el => el.id === id);

  // if (indexTour === -1){
  //     return res
  //               .status(404)
  //               .json({
  //                   status: "fail",
  //                   message: "Invalid ID"
  //               });
  // }
  // const newTour = tours;
  // newTour.splice(indexTour, 1);
  // fs.writeFile(`${__dirname}/../dev-data/data/tours-simple.json`, JSON.stringify(newTour), err=>{
  //     res
  //    .status(204)
  //    .json({
  //        status: "success",
  //        data: null
  //    });
  // });
  try {
    const tour = await Tour.findByIdAndRemove(req.params.id, {
      new: true,
    });

    res.status(204).json({
      status: "success",
      message: "resource deleted",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "fail",
      message: err,
    });
  }
};

exports.getTourStats = async (req, res) => {
  try{
    const stats = await Tour.aggregate([
      { $match: { ratingsAverage: {$gte: 4.5}}},
      { $group: {
        _id: { $toUpper: "$difficulty"},
        numRecords: { $sum: 1},
        avgRating: { $avg: "$ratingsAverage" },
        avgPrice: { $avg: "$price"},
        minPrice: { $min: "$price"},
        maxPrice: { $max: "$price"}
      }},
      { $sort: { avgRating: 1 }}
    ])

    res.status(200).json({
      status: "success",
      data: {
        stats
      },
  });
} catch (err) {
    console.log(err);
    res.status(500).json({
      status: "fail",
      message: err,
    });
  }
}

exports.getYearSchedule = async (req, res) => {
  const year = req.params.year * 1;

  try{
    const yearQuery = await Tour.aggregate([
      { $unwind : "$startDates" },
      { $match : {
          startDates: {
            $gte : new Date(`${year}-01-01`),
            $lte : new Date(`${year}-12-31`)
          }
      } },
      { $group: {
          _id: { $month: "$startDates" },
          numTour: { $sum : 1 }
      } },
      { $project: {
          month: "$_id",
          numTour: 1,
          _id: 0
      }},
      { $sort: {
          month: 1
      } }
    ]);

    res
      .status(200)
      .json({
        status: "success",
        data: {
          yearQuery
        }
      });
    }
    catch(err) {
      res
        .status(500)
        .json({
          status: "fail",
          message: err
        });
    }
}
