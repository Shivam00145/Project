const Lists=require("../models/list.js");



module.exports.index=async(req, res) => {
    let allList=await Lists.find({});
    res.render("Lists/index.ejs", { allList });
};


module.exports.renderNewForm=(req,res) => {
    // console.log(req.user);
    res.render("Lists/new.ejs");
};


module.exports.showList=async(req,res) => {
    let {id}= req.params;
    let item=await Lists.findById(id).populate({path:"reviews", populate:{ path: "author" },}).populate("owner");
    if(!item){
        req.flash("error","List you requested for does not exist");
        res.redirect("/lists");
    }
    // console.log(item);
    res.render("Lists/show.ejs", {item});
};


module.exports.editList=async(req,res) => {
    let {id}=req.params;
    let item=await Lists.findById(id);
    if(!item){
        req.flash("error","List you requested for does not exist");
        res.redirect("/lists");
    }
    let imageUrl = item.image.url;
    imageUrl=imageUrl.replace("/upload", "/upload/h_300,w_250");
    // console.log(imageUrl);
    ///e_blur:300etc
    res.render("Lists/edit.ejs", {item, imageUrl});
};

module.exports.createList=async(req,res) => {
    // let {title,description,image,price,location,country}=res.body;
    // let List=req.body.List;
    // if(!req.body.List){
    //     throw new ExpressError(400,"Send valid data for List");
    // }
    
    // if(!newlist.description){
    //     throw new ExpressError(400,"Description is missing!");
    // }
    // if(!newlist.price){
    //     throw new ExpressError(400,"price is missing!");
    // }
    // if(!newlist.location){
    //     throw new ExpressError(400,"location is missing!");
    // }//ets;
    
    const url=req.file.path;
    const filename=req.file.filename;
    let newlist=new Lists(req.body.List);
    newlist.owner=req.user._id;
    newlist.image={url, filename};
    await newlist.save();
    req.flash("success","New List created!");
    res.redirect("/lists");
    // console.log(List);
};

module.exports.search=async(req,res,next)=>{
    const search=req.body;
    const item=await Lists.findOne({title:search.search}).populate({path:"reviews", populate:{ path: "author" },}).populate("owner");
    if(!item){
        req.flash("error","List you requested for does not exist");
        res.redirect("/lists");
    }else{
        res.render("Lists/show.ejs", {item});
    }
    // console.log(list);
    // console.log(search.search);
    // res.render("Lists/show.ejs", {list});
};




module.exports.updateList=async(req,res) =>{
    // if(!req.body.List){
    //     throw new ExpressError(400,"Send valid data for List");
    // }
    let {id}=req.params;
    // let newlist=new Lists(req.body.List);
    let list=await Lists.findByIdAndUpdate(id, {...req.body.List});

    if(typeof req.file!= "undefined"){
        const url=req.file.path;
        const filename=req.file.filename;
    
        list.image={url, filename};
        await list.save();
    }


    req.flash("success","List Updated!");
    res.redirect(`/lists/${id}`);
};


module.exports.destroyList=async(req,res) => {
    let {id}=req.params;
    await Lists.findByIdAndDelete(id);
    req.flash("success","List Deleted!");
    res.redirect("/lists");
};