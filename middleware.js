const Lists=require("./models/list.js");
const ExpressError=require("./utils/ExpressError.js");
const { listSchema, reviewSchema }=require("./schema.js");
const Review=require("./models/review.js");


module.exports.isLoggedIn = (req,res,next)=>{
    if(!req.isAuthenticated()){
        req.session.redirectUrl= req.originalUrl;
        req.flash("error","please, login first!");
        return res.redirect("/login");
    }
    next();
};

module.exports.saveRedirectUrl= (req,res,next) =>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl=req.session.redirectUrl;
    }
    next();
};

module.exports.isOwner= async(req,res,next) =>{
    let {id}=req.params;
    const list= await Lists.findById(id);
    if(!list.owner._id.equals(res.locals.currUser._id)){
        req.flash("error","You don't have permission to Edit");
        res.redirect(`/lists/${id}`);
        return;
    }
    next();
};


module.exports.validatelist=(req, res, next)=>{
    let {error} = listSchema.validate(req.body);
    if(error){
        let errmsg=error.details.map((el)=>el.message).join(",");
        throw new ExpressError(400, errmsg);
    }
    else{
        next();
    }
};


module.exports.validatereview=(req, res, next)=>{
    let {error} = reviewSchema.validate(req.body);
    if(error){
        let errmsg=error.details.map((el)=>el.message).join(",");
        throw new ExpressError(400, errmsg);
    }
    else{
        next();
    }
};


module.exports.isAuthor= async(req,res,next) =>{
    let {id, rid}=req.params;
    const view= await Review.findById(rid);
    if(!view.author._id.equals(res.locals.currUser._id)){
        req.flash("error","You don't have permission to delete");
        res.redirect(`/lists/${id}`);
        return;
    }
    next();
};
