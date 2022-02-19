const app = require("./app");
const mongoose = require('mongoose');

const DB = "mongodb://admin:admin@127.0.0.1:27017/natours?authSource=admin";
mongoose.connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
})
.then(res => console.log("DB connection is successful"));

const tourSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "A tour should have a name"],
        unique: true
    },
    rating: {
        type: Number,
        default: 4.5
    },
    price: {
        type: Number,
        required: [true, "A tour should have a price"]
    }
});

const Tour = mongoose.model('Tour', tourSchema);

const testTour = new Tour({
    name: "The Forest Hiker",
    rating: 4.7,
    price: 15000
});

testTour.save()
                .then(doc => console.log("Document saved successfully", doc))
                .catch(err => console.log(err));


const port = 3000;
app.listen(port, ()=> {
    console.log(`App is listening at ${port}`);
});
