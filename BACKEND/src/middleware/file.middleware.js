const multer = require("multer");

const uplaod = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, //5MB
  },
});

module.exports = uplaod;
