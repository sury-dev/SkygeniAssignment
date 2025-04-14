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

