const express = require("express");
const router = express.Router();
const cmsController = require("../controllers/cms.controllers");
const {
  cmsValidator,
  validateChangeStatus,
} = require("../validator/cms.validator");
// Todo update/delete/search
router
  .route("/")
  .get(cmsController.getListCms)
  .post( cmsController.createCms);

// router.put("/status/:id", validateChangeStatus, cmsController.changeStatus);
router
  .route("/:id")
  .get(cmsController.getCMSById)
  .put(cmsController.updateCMS)
  .delete(cmsController.deleteCMS);
router.get("/page/:name", cmsController.getCMSByName);
module.exports = router;
