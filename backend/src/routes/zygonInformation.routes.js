import { Router } from 'express'
import {
    ZygonTable,
    UpdateZygonTable,
    GetAllZygonTableInformation,
    DeleteZygonTableRow
} from "../controllers/zygonInformation.controller.js"

const router = Router();

router.route("/PostZygonTable").post(ZygonTable)
router.route("/UpdateZygonTable/:rowId").patch(UpdateZygonTable)
router.route("/ZygonTable").get(GetAllZygonTableInformation)
router.route("/DeleteZygonRow/:rowId").delete(DeleteZygonTableRow)

export default router