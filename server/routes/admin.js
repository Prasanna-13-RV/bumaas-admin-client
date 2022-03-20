const express = require("express");
const app = express();

const router = express.Router({mergeParams: true});
const methodOverride = require("method-override");
const db = require("../database");

const {
    admingetcustomer,
    adminpostcustomer,
    adminviewcustomer,
    adminupdatecustomer,
    admindeletecustomer,
} = require("../controllers/customer_master.controllers");

const {
    admingetinventory,
    adminpostinventory,
    adminviewinventory,
    adminupdateinventory,
    admindeleteinventory,
} = require("../controllers/inventory_master.controllers");

const {
    admingetproject,
    adminpostproject,
    adminviewproject,
    adminupdateproject,
    admindeleteproject,
} = require("../controllers/project_master.controllers");

router.get("/customer", admingetcustomer);
router.post("/customer", adminpostcustomer);
router.get("/customer/:id", adminviewcustomer);
router.put("/customer/update/:id", adminupdatecustomer);
router.delete("/customer/delete/:id", admindeletecustomer);


router.get("/inventory", admingetinventory);
router.post("/inventory", adminpostinventory);
router.get("/inventory/:id", adminviewinventory);
router.put("/inventory/update/:id", adminupdateinventory);
router.delete("/inventory/delete/:id", admindeleteinventory);

router.get("/customer/project/:id", admingetproject);
router.post("/customer/:id/project", adminpostproject);

router.get("/customer/:customerid/project/:projectid", adminviewproject);
router.put("/customer/:customerid/project/update/:projectid", adminupdateproject);
router.delete("/customer/:customerid/project/:projectid", admindeleteproject);

module.exports = router;
