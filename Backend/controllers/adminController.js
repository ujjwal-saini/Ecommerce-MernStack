import User from "../models/user.js";
import Product from "../models/products.js";
import Order from "../models/orders.js";

export const adminDashboard = async (req, res) => {
    try {

        // total users
        const usersLength = await User.countDocuments({
            role: { $ne: "admin" }
        });

        // total products
        const productsLength = await Product.countDocuments();

        // total orders
        const ordersLength = await Order.countDocuments();

        // total revenue
        const revenueData = await Order.aggregate([
            {
                $group: {
                    _id: null,
                    total: { $sum: "$totalAmount" },
                },
            },
        ]);

        const totalRevenue = revenueData[0]?.total || 0;

        // recent orders
        const recentOrders = await Order.find()
            .sort({ createdAt: -1 })
            .limit(5);

        // recent users
        const recentUsers = await User.find({ role: { $ne: "admin" } })
            .sort({ createdAt: -1 })
            .limit(5);

        // monthly sales
        const monthlySales = await Order.aggregate([
            {
                $group: {
                    _id: { $month: "$createdAt" },
                    total: { $sum: "$totalAmount" },
                    orders: { $sum: 1 }   // 👈 total orders in month
                },
            },
            {
                $sort: { _id: 1 },
            },
        ]);

        // month name convert
        const months = [
            "",
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
        ];

        const formattedMonthlySales = monthlySales.map((m) => ({
            month: months[m._id],
            total: m.total,
            orders: m.orders
        }));

        res.json({
            usersLength,
            productsLength,
            ordersLength,
            totalRevenue,
            recentOrders,
            recentUsers,
            monthlySales: formattedMonthlySales,
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Dashboard error",
        });
    }
};

export const getAllCustomers = async (req, res) => {
    try {

        const customers = await User.find(
            { role: { $ne: "admin" } },
            {
                password: 0,
                cartItems: 0
            }
        ).sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            data: customers
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message: "Customer fetch error"
        });

    }
};

export const deleteCustomer = async (req, res) => {
    try {

        const { id } = req.params;

        await User.findByIdAndDelete(id);

        res.status(200).json({
            success: true,
            message: "Customer deleted successfully"
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Delete error"
        });

    }
};