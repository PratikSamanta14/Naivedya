const mongoose = require('mongoose');
require('dotenv').config();

const Product = require('./models/Product');
const Pandit = require('./models/Pandit');
const Category = require('./models/Category');

const MONGO_URI = process.env.MONGO_URI || "mongodb+srv://naivedyainfo_db_user:naivedya%402026@cluster-naivedya.b7ipgez.mongodb.net/naivedya?retryWrites=true&w=majority&appName=Cluster-Naivedya";

async function countDocs() {
  await mongoose.connect(MONGO_URI);
  const products = await Product.countDocuments();
  const pandits = await Pandit.countDocuments();
  const categories = await Category.countDocuments();
  
  console.log(`Products: ${products}`);
  console.log(`Pandits: ${pandits}`);
  console.log(`Categories: ${categories}`);
  process.exit();
}

countDocs();
