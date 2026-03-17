import Users from "../models/user.js";

export const addToCart = async (req, res) => {
  const { productId, quantity = 1, userId } = req.body;

  try {
    const user = await Users.findById(userId);

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const existingItem = user.cartItems.find(
      (item) => item.productId.toString() === productId
    );

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      user.cartItems.push({ productId, quantity });
    }

    await user.save();

    return res.status(200).json({
      success: true,
      cart: user.cartItems,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateCartItem = async (req, res) => {
  const { productId, quantity, userId } = req.body;

  try {
    const user = await Users.findById(userId);

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const item = user.cartItems.find(
      (i) => i.productId.toString() === productId
    );

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Item not found in cart",
      });
    }

    item.quantity = Math.max(item.quantity + quantity, 1);

    await user.save();

    return res.status(200).json({
      success: true,
      cart: user.cartItems,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const removeCartItem = async (req, res) => {
  try {

    const { userId, productId } = req.body;

    const user = await Users.findById(userId);

    user.cartItems = user.cartItems.filter(
      (item) => item.productId.toString() !== productId
    );

    await user.save();

    res.json({ message: "Item removed from cart" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};