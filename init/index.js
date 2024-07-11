const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js"); //require



const mongo_url = "mongodb://127.0.0.1:27017/wanderlust"; //Monogo DB connection
main()
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((err) => {
    console.log(`error-${err}`);
  });
async function main() {
  await mongoose.connect(mongo_url);
}

let initDB = async()=>{
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj)=>({...obj,owner:"66491f4bc75946c2c03a2d52"}));
    await Listing.insertMany(initData.data);
    console.log("data was initilized");
}

initDB();
