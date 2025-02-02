import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { asyncHandler } from "../utils/asyncHandeler.js"
import { ZygonInformation } from "../models/ZygonInformation.models.js"

const ZygonTable = asyncHandler(async (req, res) => {
    const { EventName, Year, WinnersName, Position } = req.body;

    if ([EventName, Year, WinnersName, Position].some(
        (fields) => String(fields).trim() === ''
    )) {
        throw new ApiError(400, "All fields are required");
    }

    const existingEntry = await ZygonInformation.findOne({ EventName, Year, WinnersName, Position });
    if (existingEntry) {
        throw new ApiError(409, "This Zygon Table row informaiton  entry already exists.");
    }

    const zygonInfoInTable = await ZygonInformation.create({
        EventName, Year, WinnersName, Position
    })

    if (!zygonInfoInTable) {
        throw new ApiError(404, "Zygon Information not found")
    }

    return res
        .status(201)
        .json(new ApiResponse(zygonInfoInTable, "Zygon Table Information created successfully"))
})

const UpdateZygonTable = asyncHandler(async (req, res) => {
    const { EventName, Year, WinnersName, Position } = req.body;
    const { rowId } = req.params;
    if ([EventName, Year, WinnersName, Position].some(
        (fields) => String(fields).trim() === ''
    )) {
        throw new ApiError(400, "All fields are required");
    }
    const existingEntry = await ZygonInformation.findOne({
        EventName, Year, WinnersName, Position
    });
    if (existingEntry) {
        throw new ApiError(409, "This Zygon Table row information entry already exists.");
    }
    const zygonInfoInTable = await ZygonInformation.findByIdAndUpdate(rowId, {
        EventName, Year, WinnersName, Position
    })
    if (!zygonInfoInTable) {
        throw new ApiError(404, "Zygon Information not found")
    }
    return res
        .status(200)
        .json(new ApiResponse(zygonInfoInTable, "Zygon Table Information updated successfully"))

})

const GetAllZygonTableInformation = asyncHandler(async (req,res) => {
    const zygonInfoInTable = await ZygonInformation.find()
    if (!zygonInfoInTable) {
        throw new ApiError(404, "Zygon Information not found")
    }
    return res
    .status(200)
    .json(new ApiResponse(zygonInfoInTable, "Zygon Table Information retrieved successfully"))
})

export {
    ZygonTable,
    UpdateZygonTable,
    GetAllZygonTableInformation
}