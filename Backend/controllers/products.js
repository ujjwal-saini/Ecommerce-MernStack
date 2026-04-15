import Product from "../models/products.js";

// CREATE PRODUCT
export const addProducts = async (req, res) => {
  try {
    const {
      name,
      price,
      description,
      category,
      brand,
      stock,
      mainImage,
      images,
      unit,
      specifications,
      variants,
      features,
      aboutItem
    } = req.body;
    console.log(req.body);

    if (!name || !price || !category) {
      return res.status(400).json({
        success: false,
        message: "Name, price and category are required"
      });
    }

    const newProduct = new Product({
      name,
      price,
      description,
      category,
      brand,
      stock,
      mainImage,
      images: images || [],
      unit: unit || null,
      specifications: specifications || {},
      variants: variants || {},
      features: features || [],
      aboutItem: aboutItem || [],
      reviews: [],
      averageRating: 0,
      numReviews: 0
    });

    const savedProduct = await newProduct.save();

    res.status(201).json({
      success: true,
      message: "Product added successfully",
      data: savedProduct
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// GET ALL PRODUCTS
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();

    res.status(200).json({
      success: true,
      count: products.length,
      data: products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET SINGLE PRODUCT
export const getSingleProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Invalid product ID",
    });
  }
};

// UPDATE PRODUCT
export const updateProduct = async (req, res) => {
  try {
    console.log(req.body);
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      data: updatedProduct,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// DELETE PRODUCT
export const deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);

    if (!deletedProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const productSearch = async (req, res) => {
  try {
    const { search } = req.query;
    const queryObject = {};
    if (search) {
      queryObject.$or = [
        { name: { $regex: search, $options: "i" } },
        { brand: { $regex: search, $options: "i" } },
        { company: { $regex: search, $options: "i" } },
        { category: { $regex: search, $options: "i" } }
      ];
    }
    const products = await Product.find(queryObject);
    res.status(200).json({
      success: true,
      count: products.length,
      products
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const addCommentproduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const { userName, userImage, rating, comment } = req.body;

    if (!rating || !comment) {
      return res.status(400).json({
        success: false,
        message: "Rating and comment required"
      });
    }

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found"
      });
    }

    const newReview = {
      userName,
      userImage,
      rating,
      comment,
      createdAt: new Date()
    };
    console.log(newReview);

    product.reviews.unshift(newReview);

    product.numReviews = product.reviews.length;

    product.averageRating =
      product.reviews.reduce(
        (acc, item) => acc + item.rating,
        0
      ) / product.reviews.length;

    await product.save();

    res.status(200).json({
      success: true,
      message: "Review added",
      data: product.reviews
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });


  };





}