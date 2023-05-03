const mongoose = require('mongoose');

productschemma = new mongoose.Schema({
    name: {
        type: String
    },
    category: {
        type: String 
    },
    price : {
        type : String
    },
    image : {
        type : String
    }
})

module.exports = mongoose.model("product", productschemma);
