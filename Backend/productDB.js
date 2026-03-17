import productJson from "./products.json" with { type: "json" };
import Product from "./models/products.js";
import connectDB from "./connection/mongo.js";
import "dotenv/config";

const start = async () => {
    try {
        await connectDB();
        await Product.deleteMany();
        await Product.create(productJson);
        console.log("Data inserted successfully");
    } catch (error) {
        console.log(error);
    }
};

start();