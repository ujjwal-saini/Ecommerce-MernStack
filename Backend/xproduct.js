import fs from "fs";

const products = JSON.parse(
  fs.readFileSync("./products.json", "utf-8")
);

const newProducts = products.map((p) => {
  return {
    name: p.name,
    brand: p.brand,
    category: p.category,
    price: p.price,
    stock: p.stock,
    description: p.description,

    mainImage:p.image,
    images:p.images || [],

    unit: p.category === "groceries" ? "kg" : null,

    specifications: {},

    variants: {},

    features: [],
    aboutItem: [],

    reviews: [],
    averageRating: 0,
    numReviews: 0
  };
});

fs.writeFileSync(
  "./newProducts.json",
  JSON.stringify(newProducts, null, 2)
);

console.log("✅ Converted Successfully");