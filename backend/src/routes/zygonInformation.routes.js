import { Router } from 'express'
import {
    ZygonTable,
    UpdateZygonTable,
    GetAllZygonTableInformation,
    DeleteZygonTableRow,
    CalCulateAllPoints,
    GetClassifyZygonInformationByEventName,
    DeleteAllRecordAtOnce
} from "../controllers/zygonInformation.controller.js"

const router = Router();

router.route("/PostZygonTable").post(ZygonTable)
router.route("/UpdateZygonTable/:rowId").patch(UpdateZygonTable)
router.route("/ZygonTable").get(GetAllZygonTableInformation)
router.route("/DeleteZygonRow/:rowId").delete(DeleteZygonTableRow)
router.route("/AllPoints/:year").get(CalCulateAllPoints)
router.route("/ClassifyZygonInformation/:EventName").get(GetClassifyZygonInformationByEventName)
router.route("/deleteAllRecords").delete(DeleteAllRecordAtOnce)

export default router