import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import fs from "fs";

export const getFileData = asyncHandler(async (req, res, next) => {
    try {
        if (req.jsonData) { // if json data is already present in the request, then no need to read the file again
            return res.status(200).json(new ApiResponse(200, req.jsonData, "File data retrieved successfully"));
        }
        else {
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
        let jsonData = null;
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

export const countDataProcessor = asyncHandler(async (req, res, next) => {
    try {
        if (!req.jsonData) {
            throw new ApiError(404, "No file data found in the request");
        }

        // processing the json data
        let n = req.jsonData.length; // getting the length of the json data

        const calcData = []; // creating an empty array to store the response data

        for (let i = 0; i < n; i++) {
            const label = req.jsonData[i].label; // getting the label of the json data
            const count = req.jsonData[i].count; // getting the count of the json data
            let lost; // getting the lost of the json data
            let qualified; // getting the qualified of the json data
            if (i < n - 1) {
                lost = count - req.jsonData[i + 1].count; // getting the lost of the json data
                qualified = req.jsonData[i + 1].count; // getting the qualified of the json data
            }
            else {
                lost = '-'; // setting the lost to '-' if it is the last element
                qualified = '-'; // setting the qualified to '-' if it is the last element
            }
            const winPercent = Math.round((req.jsonData[n - 1].count / count) * 100); // getting the win percent of the json data
            let stagePercent; // getting the stage percent of the json data
            if (i != 0) {
                stagePercent = Math.round(req.jsonData[i].diffRate * 100); // getting the stage percent of the json data
            }
            else {
                stagePercent = '-'; // setting the stage percent to '-' if it is the first element
            }
            calcData.push({
                label,
                count,
                lost,
                qualified,
                winPercent,
                stagePercent
            })
        }

        calcData.push({
            label: 'Total',
            count: '-',
            lost: req.jsonData[0].count - req.jsonData[n - 1].count,
            qualified: '-',
            winPercent: '-',
            stagePercent: '-'
        })

        return res.status(200).json(
            new ApiResponse(
                200,
                {
                    totalCount: n,
                    maxCount: Math.round(req.jsonData[0].count),
                    data: calcData
                },
                "Data processed successfully"
            )
        )

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

export const acvDataProcessor = asyncHandler(async (req, res, next) => {
    try {
        if (!req.jsonData) {
            throw new ApiError(404, "No file data found in the request");
        }

        // processing the json data
        let n = req.jsonData.length; // getting the length of the json data

        const calcData = []; // creating an empty array to store the response data

        for (let i = 0; i < n; i++) {
            const label = req.jsonData[i].label; // getting the label of the json data
            const acv = Math.round(req.jsonData[i].acv); // getting the count of the json data
            let lost; // getting the lost of the json data
            let qualified; // getting the qualified of the json data
            if (i < n - 1) {
                lost = acv - Math.round(req.jsonData[i + 1].acv); // getting the lost of the json data
                qualified = Math.round(req.jsonData[i + 1].acv); // getting the qualified of the json data
            }
            else {
                lost = '-'; // setting the lost to '-' if it is the last element
                qualified = '-'; // setting the qualified to '-' if it is the last element
            }
            const winPercent = Math.round((req.jsonData[n - 1].acv / acv) * 100); // getting the win percent of the json data
            let stagePercent; // getting the stage percent of the json data
            if (i != 0) {
                stagePercent = Math.round(req.jsonData[i].diffacvRate * 100); // getting the stage percent of the json data
            }
            else {
                stagePercent = '-'; // setting the stage percent to '-' if it is the first element
            }
            calcData.push({
                label,
                acv,
                lost,
                qualified,
                winPercent,
                stagePercent
            })
        }

        calcData.push({
            label: 'Total',
            acv: '-',
            lost: Math.round(req.jsonData[0].acv - req.jsonData[n - 1].acv),
            qualified: '-',
            winPercent: '-',
            stagePercent: '-'
        })

        return res.status(200).json(
            new ApiResponse(
                200,
                {
                    totalCount: n,
                    maxCount : Math.round(req.jsonData[0].acv),
                    data: calcData
                },
                "Data processed successfully"
            )
        )

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