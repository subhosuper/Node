const express = require('express');
const morgan = require('morgan');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();
app.use(morgan('dev'));
app.use(express.json()); //Attaches body in JSON form to request
app.use(express.static(`${__dirname}/public`))

app.use((req, res, next)=>{
    req.requestTime = new Date().toISOString();
    next();
})

app.use("/api/v1/tours", tourRouter);
app.use("/api/v1/users", userRouter);

app.all('*', (req, res, next)=>{           //Operational error handling with arong routes to application (localhost)
    res
        .status(404)
        .json({
            status: "fail",
            message: `Can't find route ${req.originalUrl}`
        });
});

app.use((err, req, res, next)=>{
    err.statusCode = err.statusCode || 500;
    err.status = err.status || "error";
    err.message = err.message || "Something went wrong";
    res
        .status(err.statusCode)
        .json({
            status: err.statusCode,
            message: err.message
        });
});

module.exports = app;
