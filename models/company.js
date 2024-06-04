import mongoose from "mongoose";

const ComSchema = new mongoose.Schema({
    name:String,
    email:String,
    password:String
})

const feedSchema = new mongoose.Schema({
    name:String,
    email:String,
    text:String
})
export const Com = mongoose.model('Com',ComSchema)
export const Feed = mongoose.model('Fed',feedSchema)
//eiVF2Wo1URZc98aN