const mongoose= require("mongoose");
const initData= require("./data.js");
const Lists=require("../models/list.js");

const mongo_URL="mongodb://127.0.0.1:27017/place";

main().then(() => {console.log("Connected")} ).catch( (err)=>console.log(err) );

async function main() {
    await mongoose.connect(mongo_URL);
}

const initDB= async () => {
    await Lists.deleteMany({});
    initData.data=initData.data.map((obj)=>({ ...obj, owner:'67f24a39b4c4ac39fdba1126'}));
    await Lists.insertMany(initData.data);
    console.log("Data initialize");
};

initDB();