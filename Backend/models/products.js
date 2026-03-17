import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  name: String,
  price: Number,
  description: String,
  image: String,
  category: String,
  stock: Number,
  brand: String,
});

const Product = mongoose.model("Product", ProductSchema);

export default Product;