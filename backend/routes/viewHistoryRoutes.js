

const express = require('express');
const { updateViewHistory, deleteViewHistory, getViewHistory, getTrendingProducts } = require('../controllers/viewHistoryController');
// const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// Update view history
router.post('/update', updateViewHistory);

// Delete product from view history//extract data from url with params
router.delete('/delete/:userId/:productId', deleteViewHistory);

// Get view history of a particular user
router.get('/user/:userId', getViewHistory);

// Get trending products
router.get('/trending', getTrendingProducts);

module.exports = router;
