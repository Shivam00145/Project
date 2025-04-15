const express=require("express");
const router=express.Router();
const wrapAsync=require("../utils/wrapAsync.js");
const Lists=require("../models/list.js");
const {isLoggedIn, isOwner, validatelist}=require("../middleware.js");

const listController=require("../controllers/list.js");

const multer  = require('multer');
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });

//New Route
router.get("/new", isLoggedIn , listController.renderNewForm);

router.route("/")
.get(wrapAsync(listController.index))
.post(isLoggedIn , upload.single('List[image]'), validatelist, wrapAsync(listController.createList));


router.route("/:id")
.get(wrapAsync(listController.showList))
.put(isLoggedIn , isOwner, upload.single('List[image]'), validatelist, wrapAsync(listController.updateList))
.delete(isLoggedIn , isOwner, wrapAsync(listController.destroyList));

//Edit Route
router.get("/:id/edit", isLoggedIn , isOwner, wrapAsync(listController.editList));

router.post("/search", wrapAsync(listController.search));

module.exports = router;