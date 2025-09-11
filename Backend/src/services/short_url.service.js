import { generateNanoId } from "../utils/helper.js";
import { saveShortUrl } from "../dao/short_url.js";
import shortUrlSchema from "../models/shorturlmodel.js";
import { get } from "mongoose";
import { getCustomShortUrl } from "../dao/short_url.js";

export const createShortUrlWithoutUser = async (url) => {
    const shortUrl = await generateNanoId();
    if (!shortUrl) {
        throw new Error("Failed to generate short URL");
    }
    await saveShortUrl(shortUrl, url);
    return shortUrl;
};

export const createShortUrlWithUser = async (url, userId, slug=null) => {
    const shortUrl = slug || await generateNanoId();
    console.log(shortUrl, "this is short url");
    const exists = await getCustomShortUrl(slug);
    if (exists) {
        throw new Error("Custom short URL already exists");
    }
    await saveShortUrl(shortUrl, url, userId);
    return shortUrl;
};