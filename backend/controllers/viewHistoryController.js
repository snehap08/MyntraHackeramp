// controllers/viewHistoryController.js

const ViewHistory = require('../models/ViewHistory');
const Product = require('../models/Product');
const User = require('../models/User');

// Update view history
exports.updateViewHistory = async (req, res) => {
  try {
    const { userId, productId } = req.body;

    // Check if the view history already exists
    let viewHistory = await ViewHistory.findOne({ user: userId, product: productId });

    if (!viewHistory) {
      viewHistory = new ViewHistory({ user: userId, product: productId });
      await viewHistory.save();
    }

    res.status(200).json({ viewHistory });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};

// Delete product from view history
exports.deleteViewHistory = async (req, res) => {
  try {
    const { userId, productId } = req.params;

    await ViewHistory.findOneAndDelete({ user: userId, product: productId });

    res.status(200).json({ message: 'Product deleted from view history' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};

// Get view history of a particular user
exports.getViewHistory = async (req, res) => {
  try {
    const userId = req.params.userId;

    const viewHistory = await ViewHistory.find({ user: userId }).populate('product');

    res.status(200).json(viewHistory);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};

// Get trending products
exports.getTrendingProducts = async (req, res) => {
  try {
    const trendingProducts = await ViewHistory.aggregate([
      {
        $group: {
          _id: "$product",
          count: { $sum: 1 }
        }
      },
      {
        $sort: { count: -1 }
      },
      {
        $limit: 10
      },
      {
        $lookup: {
          from: "products",
          localField: "_id",
          foreignField: "_id",
          as: "productDetails"
        }
      },
      {
        $unwind: "$productDetails"
      }
    ]);

    res.status(200).json(trendingProducts);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};
