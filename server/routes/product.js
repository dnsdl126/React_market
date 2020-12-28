const express = require('express');
const router = express.Router();
const multer = require('multer');
const { Product } = require('../models/Product')
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


router.post('/', (req, res) => {

    //받아온 정보들을 DB에 넣어준다.
    // req.body = 업로드할 상품 정보 
    const product = new Product(req.body)

    product.save((err) => {
        if (err) return res.status(400).json({ success: false, err })
        return res.status(200).json({ success: true })
    })


});

router.post('/products', (req, res) => {

    // product collection에 들어 있는 모든 상품 정보를 가져오기
    // populate : 데이터베이스에 상품을 누가 등록했는지에 대한 정보가 다필요하기때문에 사용

    Product.find()
        .populate("writer")
        .exec((err, productInfo) => {
            if (err) return res.status(400).json({ success: false, err })
            return res.status(200).json({ success: true, productInfo })
        })


});


module.exports = router;
