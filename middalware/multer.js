const multer = require('multer');
const path = require("path")

module.exports = multer({
    storage: multer.diskStorage({
        filename: function (req, file, cb) {
            cb(null,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
        }})
});