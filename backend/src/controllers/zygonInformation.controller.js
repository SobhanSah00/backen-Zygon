import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { asyncHandler } from "../utils/asyncHandeler.js"
import { ZygonInformation } from "../models/ZygonInformation.models.js"

const ZygonTable = asyncHandler(async (req, res) => {
    const { EventName, Year, WinnersName, Position, PonintSequre } = req.body;

    if ([EventName, Year, WinnersName, Position, PonintSequre].some(
        (fields) => String(fields).trim() === ''
    )) {
        throw new ApiError(400, "All fields are required");
    }

    const existingEntry = await ZygonInformation.findOne({ EventName, Year, WinnersName, Position, PonintSequre });
    if (existingEntry) {
        throw new ApiError(409, "This Zygon Table row informaiton  entry already exists.");
    }

    const zygonInfoInTable = await ZygonInformation.create({
        EventName, Year, WinnersName, Position, PonintSequre
    })

    if (!zygonInfoInTable) {
        throw new ApiError(404, "Zygon Information not found")
    }

    return res
        .status(201)
        .json(new ApiResponse(zygonInfoInTable, "Zygon Table Information created successfully"))
})

const UpdateZygonTable = asyncHandler(async (req, res) => {
    const { EventName, Year, WinnersName, Position, PonintSequre } = req.body;
    const { rowId } = req.params;
    if ([EventName, Year, WinnersName, Position, PonintSequre].some(
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
        EventName, Year, WinnersName, Position, PonintSequre
    })
    if (!zygonInfoInTable) {
        throw new ApiError(404, "Zygon Information not found")
    }
    return res
        .status(200)
        .json(new ApiResponse(zygonInfoInTable, "Zygon Table Information updated successfully"))

})

const GetAllZygonTableInformation = asyncHandler(async (req, res) => {
    const zygonInfoInTable = await ZygonInformation.find()
    if (!zygonInfoInTable) {
        throw new ApiError(404, "Zygon Information not found")
    }

    console.log(zygonInfoInTable)
    return res
        .status(200)
        .json(new ApiResponse(zygonInfoInTable, "Zygon Table Information retrieved successfully"))
})

const GetClassifyZygonInformationByEventName = asyncHandler(async (req, res) => {
    const { EventName } = req.params;

    // Case-insensitive search
    const zygonInfoInTable = await ZygonInformation.find({ 
        EventName: { $regex: new RegExp(`^${EventName}$`, "i") } 
    }).sort({ Position: 1,PonintSequre : -1 }); ;

    if (zygonInfoInTable.length === 0) {
        throw new ApiError(404, "Zygon Information not found");
    }

    return res.status(200).json(
        new ApiResponse(zygonInfoInTable, "Zygon Table Information retrieved successfully")
    );
});

const DeleteZygonTableRow = asyncHandler(async (req, res) => {
    const { rowId } = req.params;

    if (!rowId) {
        throw new ApiError(400, "Row ID is required");
    }

    const deletedEntry = await ZygonInformation.findByIdAndDelete(rowId);
    if (!deletedEntry) {
        throw new ApiError(404, "Zygon Information not found");
    }

    return res
        .status(200)
        .json(new ApiResponse(deletedEntry, "Zygon Table row deleted successfully"));
});

const CalCulateAllPoints = asyncHandler(async (req, res) => {
    // calculate all points from the specific year and then return the year, all points (add all points specific year) 
    const { year } = req.params;
    const zygonInfoInTable = await ZygonInformation.find({ Year: year })
    if (!zygonInfoInTable) {
        throw new ApiError(404, "Zygon Information not found")
    }
    const allPoints = zygonInfoInTable.reduce((acc, current) => {
        return acc + current.PonintSequre
    }, 0)
    return res
        .status(200)
        .json(new ApiResponse({ year, allPoints }, "All points calculated successfully"))
})

export {
    ZygonTable,
    UpdateZygonTable,
    GetAllZygonTableInformation,
    DeleteZygonTableRow,
    CalCulateAllPoints,
    GetClassifyZygonInformationByEventName
}