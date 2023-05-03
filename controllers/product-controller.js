const productschemma = require('../models/productschemma');
const listproduct = require('../models/productschemma');
const multer = require("multer");

var storage =
exports.ADDproduct = (req, res, next) => {
   try{
    
    const name = req.body.name;
    const category = req.body.category;
    const price = req.body.price;
    const image = req.body.image;
     productschemma.create({
       name:name,
       category:category,
       price:price,
       image:image
    })
    res.json("get adding product");
  }
  catch(err){
    res.json(err);
  }
}
exports.Getproduct = (req,res,next) => {
  try{
    const get = listproduct.find({ },function(err,get){
        if(get){
          res.json(get);
        }
    })
   
  }
  catch(err){
    res.json(err);
  }
}

exports.Updateproduct = async(req,res,next) => {
    try{
      const _id = req.body._id;
      const name = req.body.name;
      const category = req.body.category;
      const price = req.body.price;
      const image = req.body.image;
     await productschemma.findOneAndUpdate({_id:_id},{name:name});
      res.json(_id);
    }
    catch(err){
      res.json(err);
    }
 }
 exports.Deleteproduct = async(req,res,next) => {
     try{
      const _id = req.body._id;  
      const exist = productschemma.findById(_id);
      if(exist)
     { await productschemma.findByIdAndDelete(_id);
      res.json("product deleted");}
      else{
        res.json
      }
     }  
     catch(err){
      res.json(err);
     }
 }

 