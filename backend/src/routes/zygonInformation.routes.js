import { Router } from 'express'
import {
    ZygonTable,
    UpdateZygonTable,
    GetAllZygonTableInformation
} from "../controllers/zygonInformation.controller.js"

const router = Router();

router.route("/ZygonTable").post(ZygonTable)
router.route("/UpdateZygonTable/:rowId").patch(UpdateZygonTable)
router.route("/ZygonTable").get(GetAllZygonTableInformation)

export default router