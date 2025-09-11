import shortUrlSchema from "../models/shorturlmodel.js";
import { AppError } from "../utils/errorhandler.js";

export const saveShortUrl = async (shortUrl, longurl, userId) => {
    try{
        const newUrl = new shortUrlSchema ({
            full_url: longurl,
            short_url: shortUrl
        })
        if (userId) {
            newUrl.user = userId;
        }
        await newUrl.save()
    } catch(err){
         if(err.code == 11000){
            throw new AppError("Short URL already exists", 409)
         }
          throw new Error(err);
    }
};
    
export const getShortUrl = async (shortUrl) => {
    return await shortUrlSchema.findOneAndUpdate(
        {short_url: shortUrl},
        {$inc: {clicks: 1}},
        {new: true}
    )
}

export const getCustomShortUrl = async (slug) => {
    return await shortUrlSchema.findOne({short_url: slug});
}
