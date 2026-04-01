import express from "express";

import { addProducts, getProducts, getSingleProduct, updateProduct, deleteProduct, productSearch } from "../controllers/products.js";
import { register, login, checklogin, logout, updateUserProfile, cartLoader, forgetPassword, resetPassword, deleteAccount } from "../controllers/user.js";
import { addToCart, updateCartItem, removeCartItem } from "../controllers/cart.js";
import protect from "../middleware/authmiddleware.js";
import upload from "../middleware/upload.js";
import {placeOrder,getAllOrders,getUserOrders,updateOrderStatus , cancelorder} from "../controllers/order.js";


const router = express.Router();

// authentication check already login cookies
router.get("/me", protect, checklogin);

// update profile detail
router.put("/updateprofile", protect, upload.single("profilePic"), updateUserProfile);

// login signup
router.post("/register", upload.single("profilePic"), register);
router.post("/login", login);
router.post("/logout", logout);
router.post("/forget-password", forgetPassword);
router.patch("/reset-password", resetPassword);
router.delete("/delete/:id", deleteAccount);

// user page product routing
router.post("/addproduct", addProducts);
router.get("/products", getProducts);
router.get("/product/:id", getSingleProduct);
router.put("/updateproduct/:id", updateProduct);
router.delete("/deleteproduct/:id", deleteProduct);
router.get("/productSearch", productSearch);
router.get("/getcart/:userId", cartLoader);

//orders
router.post("/orders",placeOrder);
router.get("/getorders",getAllOrders);
router.get("/myorders/:userId",getUserOrders);
router.put("/orders/:id",updateOrderStatus);
router.put("/cancelorder/:id", cancelorder);

// add to cart
router.post("/addtocart", addToCart);
router.post("/updatecart", updateCartItem);
router.post("/removecart", removeCartItem);



export default router;
