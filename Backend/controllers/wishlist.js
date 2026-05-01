// controllers/wishlistController.js
import User from "../models/user.js";


// ✅ ADD TO WISHLIST
export const addWishlist = async (req, res) => {
  try {
    const { userId, productId } = req.body;

    const user = await User.findById(userId);

    if (!user) return res.status(404).json({ msg: "User not found" });

    // already exists?
    if (user.wishlist.includes(productId)) {
      return res.status(200).json({ msg: "Already in wishlist" });
    }

    user.wishlist.push(productId);
    await user.save();

    res.status(200).json({ msg: "Added to wishlist", wishlist: user.wishlist });

  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
};


//  REMOVE FROM WISHLIST
export const removeWishlist = async (req, res) => {
  try {
    const { userId, productId } = req.body;

    const user = await User.findById(userId);

    if (!user) return res.status(404).json({ msg: "User not found" });

    user.wishlist = user.wishlist.filter(
      (id) => id.toString() !== productId
    );

    await user.save();

    res.status(200).json({ msg: "Removed from wishlist", wishlist: user.wishlist });

  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
};


//  GET WISHLIST (with product details)
export const getWishlist = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId).populate("wishlist");

    if (!user) return res.status(404).json({ msg: "User not found" });

    res.status(200).json(user.wishlist);

  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
};