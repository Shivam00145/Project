const User=require("../models/user.js");



module.exports.renderSignupForm=(req, res) => {
    res.render("users/signup.ejs");
};

module.exports.signup=async(req, res,next) =>{
    try{
        let {username, email, password}= req.body;
    
        const newUser=new User({username,email});
        const u=await User.register(newUser, password);
        req.login(u, (err) =>{
            if(err){
               return next(err);
            }else{
                req.flash("success","User was Registered Successfully! Welcome");
                res.redirect("/lists");
            }
        });
        // console.log(u);
        
    }catch(e){
        req.flash("error", e.message);
        res.redirect("/signup");
    }
};

module.exports.renderLoginForm=(req, res) => {
    res.render("users/login.ejs");
};

module.exports.login= async(req, res)=>{
    req.flash("success","Login Successful!  Welcome");
    // res.redirect("/lists");
    const url=res.locals.redirectUrl;
    if(url){
        res.redirect(url);
    }
    res.redirect("/lists");
    //const url=res.locals.redirectUrl || "/lists";
    //res.redirect(url);
};

module.exports.logout= (req,res,next) => {
    req.logOut((err) =>{
        if(err){
           return next(err);
        }else{
            req.flash("success","Successfully logout!");
            res.redirect("/lists");
        }
    });
};