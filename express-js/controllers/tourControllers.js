// const fs = require('fs');
const Tour = require("./../models/tourModel");
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


exports.getAllTours = async (req, res)=>{
    // res.status(200).json({
    //     results: tours.length,
    //     data: tours,
    //     requestTime: req.requestTime,
    //     status: "success"
    // });
    try{
        const tours = await Tour.find();
        res
            .status(200)
            .json({
                status: "success",
                result: tours.length,
                data: {
                    tours
                }
            })
    } catch(err){
        console.log(err)
        res
            .status(400)
            .json({
                status: "fail",
                message: "Error occured in data retrieval"
            })
    }
}

exports.newTour = async (req, res)=>{
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
    try{
        const newTour = await Tour.create(req.body);
        res
            .status(201)
            .json({
                status: "success",
                data: newTour
            })
    }
    catch(err){
        res
            .status(400)
            .json({
                status: "fail",
                message: "Invalid data sent!!"
            })
    }
}

exports.getTour = async (req, res)=>{
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

    try{
        const tour = await Tour.findById(req.params.id)
        res
            .status(200)
            .json({
                data: tour,
                status: "success"
            });
    }
    catch(err){
        res
            .status(400)
            .json({
                status: "fail",
                message: err
            });
    }
}

exports.updateTour = (req, res)=>{
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
}

exports.deleteTour = (req, res)=>{
    const id = parseInt(req.params.id); // req.params.id * 1 => Int(id) as any * some number = number
    const indexTour = tours.findIndex(el => el.id === id);

    if (indexTour === -1){
        return res
                  .status(404)
                  .json({
                      status: "fail",
                      message: "Invalid ID"
                  });
    }
    const newTour = tours;
    newTour.splice(indexTour, 1);
    fs.writeFile(`${__dirname}/../dev-data/data/tours-simple.json`, JSON.stringify(newTour), err=>{
        res
       .status(204)
       .json({
           status: "success",
           data: null
       });
    });
}
