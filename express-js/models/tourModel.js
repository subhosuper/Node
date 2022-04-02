const mongoose = require('mongoose');
const slugify = require("slugify");

const tourSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "A tour should have a name"],
        unique: true,
        maxlength: [40, "A name must have less than or equal to 40 characters"],
        minlength: [10, "A name must have more than or equal to 10 characters"]
    },
    slug: String,
    secretTour: {
        type: Boolean,
        default: false
    },
    ratingsAverage: {
        type: Number,
        default: 4.5,
        min: [1, "Rating must be grater than or equal to 1.0"],
        max: [5, "Rating must be below or equal to 5.0"]
    },
    ratingsQuantity: {
        type: Number,
        default: 0
    },
    price: {
        type: Number,
        required: [true, "A tour should have a price"]
    },  
    priceDiscount: {
        type: String,
        validate: {
          validator: function(val) {
            return val < this.price;
          },
          message: "Price discount {VALUE} should be less than price"
        },
        required: [true, 'User phone number required']
    },
    duration: {
        type: Number,
        required: [true, "A tour must have a duration"]
    },
    maxGroupSize: {
        type: Number,
        required: [true, "A tour must have a group size"]
    },
    difficulty: {
        type: String,
        required: [true, "A tour must have a difficulty"],
        enum: {
            values: ["easy", "difficult", "medium"],
            message: "Difficulty can either be easy, medium or difficult"
        }
    },
    summary: {
        type: String,
        trim: true,      // Removes white spaces from both sides get trimmed out, for Strings only
        required: [true, "A tour must have a summary"]
    },
    imageCover: {
        type: String,
        required: [true, "A tour must have a cover image"]
    },
    images: [String],
    createdAt: {
        type: Date,
        default: Date.now(),
        // select: false ///hides attribute permanently
    },
    startDates: [Date],
},
{ toJSON: { virtuals: true } },
{ toObject: { virtuals: true } }
);

tourSchema.virtual('durationWeeks').get(function(){
    return this.duration / 7;
});

// DOCUMENT MIDDLEWARE. "pre" - before the event is triggered
tourSchema.pre('save', function(next){
    this.slug = slugify(this.name);
    next();
});

tourSchema.pre('save', function(next){
    console.log("Will save document");
    next();
});

tourSchema.post('save', function(doc, next){
    console.log("Document saved");
    // console.log(doc, typeof(doc));
    next();
});

tourSchema.pre(/^find/, function(next){
    this.find({secretTour: {$ne: true}});
    this.start = Date.now();
    next();
});

tourSchema.post(/^find/, function(doc, next){
    console.log(`Query took , ${Date.now()-this.start} millisseconds to complete`);
    next();
});

tourSchema.pre('aggregate', function(next){
    this.pipeline().unshift({$match: { 
                                secretTour: { 
                                    $ne: true 
                                } 
                            }});
    next();
});

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour
