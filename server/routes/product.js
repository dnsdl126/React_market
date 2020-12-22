const express = require('express');
const router = express.Router();
const multer = require('multer');
//=================================
//             Product
//=================================


var storage = multer.diskStorage({
    //destination : 어디에 파일이 저장되는지 알려주는 부분

    destination: (req, file, cb) => {
        cb(null, 'uploads/')
    },
    //filename : upload라는 폴더 안에 파일을 저장할때 어떤이름으로 저장할껀지
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`)
    }
})

var upload = multer({ storage: storage }).single("file")


router.post('/uploadImage', (req, res) => {

    //가져온 이미지를 저장해 주면 된다.
    // multer install
    upload(req, res, err => {
        if (err) {
            return res.json({ success: false, err })
        }
        return res.json({ success: true, image: res.req.file.path, fileName: res.req.file.filename })
    })



});


module.exports = router;
