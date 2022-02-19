const fs = require('fs');

var tours = JSON.parse(
    fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

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

exports.getAllTours = (req, res)=>{
    res.status(200).json({
        results: tours.length,
        data: tours,
        requestTime: req.requestTime,
        status: "success"
    });
}

exports.newTour = (req, res)=>{
    console.log(req.body);
    const newId = tours[tours.length - 1].id + 1;
    const newTour = {id: newId, ...req.body};
    tours.push(newTour);

    fs.writeFile(`${__dirname}/../dev-data/data/tours-simple.json`, JSON.stringify(tours), err=>{
        res
       .status(201)
       .json(
           {
               data: newTour, 
               status: "success"
            }
            );
    }
    );
}

exports.getTour = (req, res)=>{
    const id = parseInt(req.params.id); // req.params.id * 1 => Int(id) as any * some number = number
    const tourIndex = tours.findIndex(el => el.id === id);

    if (tourIndex === -1){
        return res
                  .status(404)
                  .json({
                      status: "fail",
                      message: "Invalid ID"
                  });
    }
    res
       .status(200)
       .json({
           data: tours[tourIndex],
           status: "success"
       });
}

exports.updateTour = (req, res)=>{
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
    newTour[indexTour]["description"] = reqBody;
    fs.writeFile(`${__dirname}/../dev-data/data/tours-simple.json`, JSON.stringify(newTour), err=>{
        res
       .status(200)
       .json({
           status: "success",
           data: newTour
       });
    })
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
