import express from "express";

import {addProducts, getProducts, getSingleProduct, updateProduct,deleteProduct , productSearch} from "../controllers/products.js";
import {register, login,checklogin,logout,updateUserProfile ,cartLoader} from "../controllers/user.js";
import {addToCart,updateCartItem , removeCartItem} from "../controllers/cart.js";
import protect from "../middleware/authmiddleware.js";
import upload from "../middleware/upload.js";


const router = express.Router();

// authentication check already login cookies
router.get("/me", protect, checklogin);

// update profile detail
router.put("/updateprofile", protect, upload.single("profilePic"), updateUserProfile);

// login signup
router.post("/register", upload.single("profilePic"), register);
router.post("/login", login);
router.post("/logout", logout);

// user page product routing
router.post("/addproduct", addProducts);
router.get("/products", getProducts);
router.get("/product/:id", getSingleProduct);
router.put("/updateproduct/:id", updateProduct);
router.delete("/deleteproduct/:id", deleteProduct);
router.get("/productSearch",productSearch);
router.get("/getcart/:userId",cartLoader);

// add to cart
router.post("/addtocart", addToCart);
router.post("/updatecart", updateCartItem);
router.post("/removecart", removeCartItem);

export default router;