import mongoose, {Schema} from "mongoose"

const ZygonInformationSchema = new Schema(
    {
        EventName : {
            type: String,
            required: true
        },
        Year : {
            type: Number,
            required: true
        },
        WinnersName : { // it contain all the names like 1st ,2nd , third
            type : String,
            required: true
        },
        Position : {
            type : Number,
            required: true
        }
    }
)

export const ZygonInformation = mongoose.model("ZygonInformation",ZygonInformationSchema)