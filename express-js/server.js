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

const port = 3000;
app.listen(port, ()=> {
    console.log(`App is listening at ${port}`);
});

