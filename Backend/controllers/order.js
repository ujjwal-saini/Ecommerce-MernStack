import Order from "../models/orders.js";
import Users from "../models/user.js";
export const placeOrder = async (req, res) => {

    try {
        const order = new Order(req.body);
        console.log(order);
        await order.save();
        console.log(req.body.user);
        await Users.findByIdAndUpdate(
            req.body.user,
            { cartItems: [] }
        );

        res.status(201).json({
            success: true,
            message: "Order placed successfully",
            order
        });
    } catch (error) {
        console.log("ERROR:", error);
        res.status(500).json({
            success: false,
            message: "Order failed",
            error: error.message
        });

    }
};


// get all orders (admin)
export const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find().populate("user").populate("items.product").sort({ createdAt: -1 });
        res.json(orders);
    } catch (error) {
        res.status(500).json({
            message: "Error fetching orders"
        });
    }
};



// get user orders
export const getUserOrders = async (req, res) => {
    console.log(req.params.userId);
    try {
        const orders = await Order.find({user: req.params.userId }).sort({ createdAt: -1 });
        res.json(orders);
    } catch (error) {
        res.status(500).json({
            message: "Error"
        });
    }
};



// update order status
export const updateOrderStatus = async (req, res) => {

    try {

        const order = await Order.findByIdAndUpdate(
            req.params.id,
            { orderStatus: req.body.status },
            { new: true }
        );

        res.json(order);

    } catch (error) {

        res.status(500).json({
            message: "Error updating order"
        });

    }
};
export const cancelorder = async (req, res) => {
  try {

    const id = req.params.id;
    console.log("Cancel ID:", id);
    const order = await Order.findByIdAndDelete(id);
    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found"
      });
    }
    res.json({
      success: true,
      message: "Order cancelled successfully"
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error cancelling order"
    });
  }
};