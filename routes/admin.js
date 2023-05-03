const express = require('express');
const router = express.Router();
const productController = require("../controllers/product-controller");
router.post('/add', productController.ADDproduct);
router.get('/get', productController.Getproduct);
router.post('/update', productController.Updateproduct);
router.post('/delete', productController.Deleteproduct);

 module.exports= router;