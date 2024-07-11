const mongoose = require("mongoose"); // Require Mongoose
const { listingSchema } = require("../schema");
const Schema = mongoose.Schema; // Creating shorthand for Schema

// Define review schema
const reviewSchema = new Schema({
    comment: String, // Capitalized 'String'
    rating: {
        type: Number, // Capitalized 'Number'
        min: 1,
        max: 5,
    },
    createdAt: {
        type: Date,
        default: Date.now(), // Corrected the default value assignment
    },
    author:{
        type:Schema.Types.ObjectId,
        ref:"user",
    }
});



module.exports = mongoose.model("Review", reviewSchema); // Export the model
