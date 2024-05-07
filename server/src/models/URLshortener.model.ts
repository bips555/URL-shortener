import mongoose from "mongoose";
import { nanoid } from "nanoid";

const URLshortenerSchema = new mongoose.Schema({
    fullUrl:{
        type:String,
        required:true
    },
    shortUrl:{
        type:String,
        required:true,
        default:()=>nanoid().substring(0,10)
    },
    clicks:{
        type:Number,
        default:0
    }
},{timestamps:true})

const URLshortenerModel = mongoose.model('URLshortener',URLshortenerSchema)
export default URLshortenerModel