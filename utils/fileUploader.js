const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/uploads')
  },
  filename: (req, file, cb) => {
      console.log({inMulter: req.body})
    cb(null, req.body.userId + path.extname(file.originalname))
  }
})

const upload = multer({ storage })

module.exports = upload
