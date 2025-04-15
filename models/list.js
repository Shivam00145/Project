const mongoose= require("mongoose");
const Schema=mongoose.Schema;
const Review=require("./review.js");
const { ref } = require("joi");

const ListSchema=new Schema({
    title:{
        type: String,
        required: true,
    },
    description:{
        type: String,
    },
    image:{
        url: String,
        filename: String,
    },
    price:{
        type: Number,
    },
    location:{
        type: String,
    },
    country:{
        type: String,
    },
    reviews:[{
        type: Schema.Types.ObjectId,
        ref: "Review",
    }],
    owner:{
        type: Schema.Types.ObjectId,
        ref: "User",
    }
});


ListSchema.post("findOneAndDelete", async(Lists)=>{
    if(Lists){
        await Review.deleteMany({_id: {$in: Lists.reviews}});
    }
});


const Lists=mongoose.model("Lists", ListSchema);

module.exports = Lists;