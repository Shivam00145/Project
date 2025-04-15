const express=require("express");
const router=express.Router({ mergeParams:true });
const wrapAsync=require("../utils/wrapAsync.js");
const ExpressError=require("../utils/ExpressError.js");
const Lists=require("../models/list.js");
const Review=require("../models/review.js");
const {validatereview, isLoggedIn, isAuthor}=require("../middleware.js");


const reviewController= require("../controllers/review.js");


//review post
router.post("/" ,isLoggedIn , validatereview, wrapAsync(reviewController.createReview));



//review delete
router.delete("/:rid",isLoggedIn, isAuthor, wrapAsync(reviewController.destroyReview));


module.exports = router;