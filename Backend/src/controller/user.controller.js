import wrapasync from "../utils/tryCatchWrapper.js";
import { getAllUserUrlsDao } from "../dao/user.dao.js";

export const getAllUserUrls = wrapasync(async (req, res) => {
    const {_id} = req.user;
    const urls = await getAllUserUrlsDao(_id)
    res.status(200).json({
       message: "User urls fetched successfully",
       urls
    })
})