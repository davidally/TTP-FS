const express = require("express");
const isAuth = require('../../middleware');
const TransactionsController = require('../../controllers/transactions');

const router = express.Router();

/**
 * @route POST api/transaction/buyStock
 * @desc Save stock purchase transaction.
 * @access Private
 */
router.post('/buyStock', isAuth, TransactionsController.make_stock_purchase);

/**
 * @route GET api/transactions
 * @desc Get stock transactions.
 * @access Private
 */
router.get('/', isAuth, TransactionsController.get_stock_transactions);   

/**
 * TEST ROUTE: Give yourself $5000
 */
router.post('/addFunds', isAuth, TransactionsController.add_five_funds);

module.exports = router;