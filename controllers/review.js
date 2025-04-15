const Lists=require("../models/list.js");
const Review=require("../models/review.js");



module.exports.createReview=async(req, res)=>{
    let list= await Lists.findById(req.params.id);
    let newReview= new Review(req.body.Review);
    newReview.author=req.user._id;
    // console.log(newReview);
    // console.log(req.body);
    list.reviews.push(newReview);

    await newReview.save();
    await list.save();
    req.flash("success","Review Added!");
    // res.send("Complete");
    res.redirect(`/lists/${list._id}`);

};


module.exports.destroyReview= async(req, res)=>{
    let {id, rid}=req.params;

    await Lists.findByIdAndUpdate(id, {$pull: {reviews: rid}});
    await Review.findByIdAndDelete(rid);
    req.flash("success","Review Deleted!");
    res.redirect(`/lists/${id}`);
};