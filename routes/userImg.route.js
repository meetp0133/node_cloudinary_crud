const express = require("express")
const route = new express.Router
const uploader = require("../middalware/multer");
const controller = require("../controller/imgController")

route.post("/upload", uploader.single("file"), controller.upload)
route.post("/get_image/:id", controller.getImage)
route.post("/delete_image/:id", controller.deleteImage)
route.post("/view_user/:id", controller.viewUser)
route.post("/update_image/:id", uploader.single("file"), controller.updateImage)

module.exports = route