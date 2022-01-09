const Product = require('../models/product');
const dotenv = require('dotenv');
const connectDatabase = require('../config/database');

// taking all the products data
const products = require('../data/product.json');

// setting dotenv file
dotenv.config({path: 'backend/config/config.env'});

connectDatabase();

const seedProducts = async()=>{
    try{
        await Product.deleteMany();
        console.log('All products are deleted');

        await Product.insertMany(products);
        console.log('All products are inserted');

        process.exit();
    } catch(error){
        console.log(error);
        process.exit();
    }
}

seedProducts();
