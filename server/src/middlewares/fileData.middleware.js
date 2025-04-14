import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import fs from "fs";

// This middleware will get the file data from server and convert it into json format and then passed to the controller
export const passFileData = asyncHandler(async (req, res, next) => {
    try {
        // securing a dafault file location
        let filePath = `./public/${process.env.DEFAULT_FILE_NAME}`;
        // checking if the file exists or not
        if (!fs.existsSync(`./public/${process.env.DEFAULT_USER_FILE_NAME}`)) {
            // if the userFile is not present then checking if the default file is present or not
            if(!fs.existsSync(`./public/${process.env.DEFAULT_FILE_NAME}`)) {
                // throwing error if both are not present
                throw new ApiError(404, "No file found in the public directory");
            }
        }
        else{
            // if the userFile is present then setting the filePath to userFile
            // this is done to avoid the file not found error in case the userFile is not present
            filePath = `./public/${process.env.DEFAULT_USER_FILE_NAME}`;
        }

        let jsonData = null;
        try {
            // reading the file and converting it into json format
            const fileData = fs.readFileSync(filePath, "utf-8");
            jsonData = JSON.parse(fileData);
        } catch (error) {
            // throwing error if the file is not in valid json format
            throw new ApiError(400, "File is not in valid json format : " + error.message);
        }

        // checking if the json data is empty or not
        if (!jsonData || Object.keys(jsonData).length === 0) {
            throw new ApiError(404, "File is empty or not in valid format");
        }

        // checking if the json data is already present in the request, then no need to read the file again
        req.jsonData = jsonData;

        // calling the next middleware or controller
        next();
    } catch (error) {

        // sending custom error to get appropriate response for errors retrieval on client side
        return res.status(error.statusCode || 500).json(
            new ApiResponse(
                error.statusCode || 500,
                null,
                error.message || "Something went wrong"
            )
        )
    }
});