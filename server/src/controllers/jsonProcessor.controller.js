import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import fs from "fs";

export const getFileData = asyncHandler(async (req, res, next) => {
    try {
        if (req.jsonData) { // if json data is already present in the request, then no need to read the file again
            return res.status(200).json(new ApiResponse(200, req.jsonData, "File data retrieved successfully"));
        }
        else{
            throw new ApiError(404, "No file data found in the request");
        }
    } catch (error) {
        return res.status(error.statusCode || 500).json(
            new ApiResponse(
                error.statusCode || 500,
                null,
                error.message || "Something went wrong"
            )
        )
    }
});

export const uploadFileData = asyncHandler(async (req, res, next) => {
    try {
        const fileData = req.body.jsonData; // getting the file data from the request body

        //validating the file data
        if (!fileData || fileData.length === 0) {
            // checking if the file data is empty or not
            throw new ApiError(400, "File data is required");
        }

        // checking if the file data is in valid json format or not
        let  jsonData = null;
        try {
            jsonData = JSON.parse(fileData); // parsing the file data to json format
        } catch (error) {
            throw new ApiError(400, "File is not in valid json format : " + error.message);
        }

        // checking if the json data is empty or not
        if (!jsonData || Object.keys(jsonData).length === 0) {
            throw new ApiError(404, "File is empty or not in valid format");
        }

        // writing the new file data to the file
        fs.writeFileSync(
            `./public/${process.env.DEFAULT_USER_FILE_NAME}`, // file to be created or overwritten
            JSON.stringify(jsonData, null, 2), // converting the json data to string format and adding indentation of 2 spaces
            "utf-8"
        );

        // sending success response
        return res.status(200).json(new ApiResponse(200, jsonData, "File data uploaded successfully"));

    } catch (error) {
        return res.status(error.statusCode || 500).json(
            new ApiResponse(
                error.statusCode || 500,
                null,
                error.message || "Something went wrong"
            )
        )
    }
});