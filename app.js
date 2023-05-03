const path = require('path');
const express= require('express');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
const errController = require('./controllers/404');
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin');
app.use(express.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/auth',authRoutes);
app.use('/admin',adminRoutes);
app.use(errController.geterr) ;

mongoose.connect('mongodb+srv://Priya:abcd@cluster0.ybb47ei.mongodb.net/test',()=>{
    app.listen(3000);
    console.log("App is running at http://localhost:%d ",3000);
});
