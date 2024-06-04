import mongoose from "mongoose";

const feedSchema = new mongoose.Schema({
    name:String,
    email:String,
    text:String
})
export const Feed = mongoose.model('Fed',feedSchema)