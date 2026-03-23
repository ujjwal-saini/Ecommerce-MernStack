import bcrypt from "bcrypt";
import Users from "../models/user.js";
import jwt from "jsonwebtoken";
import Product from "../models/products.js";
import User from "../models/user.js";

// LOGIN
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await Users.findOne({ email });
    if (email === "" || password === "") {
      return res.status(402).json({ message: "Email and password required" })
    }

    if (!user) {
      return res.status(404).json({ message: "User is not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "2d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.json({
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// REGISTER
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const alreadyExist = await Users.findOne({ email });

    if (alreadyExist) {
      return res.status(409).json({ message: "User already registered" });
    }

    if (email === "" || password === "") {
      return res.status(402).json({ message: "Email and password required" })
    }

    console.log(process.env.BASE_URL);
    const hashpassword = await bcrypt.hash(password, 10);

    const profilePic = req.file
      ? `${process.env.BASE_URL}/uploads/${req.file.filename}`
      : undefined;

    await Users.create({
      name,
      email,
      password: hashpassword,
      profile: {
        profilePic,
      },
    });

    res.status(200).json({ message: "User registered" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// UPDATE PROFILE
export const updateUserProfile = async (req, res) => {
  try {
    const {
      phone,
      dateOfBirth,
      fullAddress,
      country,
      state,
      city,
      postalCode,
    } = req.body;

    const updateData = {
      "profile.phone": phone,
      "profile.dateOfBirth": dateOfBirth,
      "profile.address.fullAddress": fullAddress,
      "profile.address.country": country,
      "profile.address.state": state,
      "profile.address.city": city,
      "profile.address.postalCode": postalCode,
    };

    if (req.file) {
      updateData["profile.profilePic"] = `${process.env.BASE_URL}/uploads/${req.file.filename}`;
    }

    const user = await Users.findByIdAndUpdate(
      req.user.id,
      { $set: updateData },
      { new: true }
    ).select("-password");

    res.json({ success: true, user });
  } catch (err) {
    res.status(500).json({ success: false });
  }
};

// CHECK LOGIN
export const checklogin = async (req, res) => {
  const user = await Users.findById(req.user.id).select(
    "name email role profile cartItems"
  );

  res.json({
    loggedIn: true,
    userId: req.user.id,
    user,
  });
};

// LOGOUT
export const logout = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: true,
    sameSite: "none",
  });

  return res.status(200).json({
    message: "Logout successful",
  });
};

export const cartLoader = async (req, res) => {
  try {
    const user = await Users.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const cartItems = user.cartItems;
    let cartData = [];
    for (let item of cartItems) {
      const product = await Product.findById(item.productId);
      if (product) {
        cartData.push({
          _id: product._id,
          name: product.name,
          price: product.price,
          image: product.image,
          qty: item.quantity,
          stock: product.stock
        });
      }
    }
    res.json(cartData);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const forgetPassword = async (req, res) => {
  const { email } = req.body;

  console.log(email, "email");
  const existingItem = Users.findOne({ email: email });

  if (!existingItem) {
    return res.status(402).json({ message: "email is invalid" })
  }

  res.status(200).json({ message: "sent otp", otp: 12345 });


}

export const resetPassword = async (req, res) => {
  try {

    const { email, newPassword, confirmPassword } = req.body;
    console.log(email, newPassword, confirmPassword);

    if (!email || !newPassword || !confirmPassword) {
      return res.status(400).json({
        message: "All fields are required"
      });
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({
        message: "Passwords do not match"
      });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    const user = await Users.findOneAndUpdate({ email: email }, { $set: { password: hashedPassword } }, { new: true });
    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    res.status(200).json({
      message: "Password updated successfully"
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server error"
    });
  }
};

export const deleteAccount = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await Users.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }
    console.log(user);
    res.status(200).json({
      message: "Account deleted successfully"
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server error"
    });
  }
};