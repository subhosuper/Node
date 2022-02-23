const fs = require('fs');
const mongoose = require('mongoose');
const Tour = require("./../../models/tourModel");

const DB = "mongodb://admin:admin@127.0.0.1:27017/natours?authSource=admin";
mongoose.connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
})
.then(res => console.log("DB connection is successful"));

const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours-simple.json`, "utf-8"));

const importData = async () => {
    try{
        await Tour.create(tours);
        console.log("Data successfully loaded");
    } catch(err){
        console.log("Loading operation error: ", err)
    }
    process.exit();
}

const deleteData = async () => {
    try{

        await Tour.deleteMany();
        console.log("Deleted all data successfully");
    } catch(err){
        console.log("Delete operation error: ", err)
    }
    process.exit();
}

if (process.argv[2] === "--delete"){
    deleteData()
}
else if(process.argv[2] === "--load"){
    importData()
}