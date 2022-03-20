const express = require("express");
const router = express.Router();
const loanController = require('../controllers/loan.controller');

// ADD LOAN DETAIL
router.post("/add/:userId", loanController.createNewLoan )

// GET LOANS BY USER ID
router.get("/:userId", loanController.getLoansByUserId)

// GET LOAN DETAIL BY LOAN ID
router.get('/detail/:loanId', loanController.getLoanByLoanId)

// ADD LOAN AMOUNT DETAILS
router.post('/add/detail/:loanId', loanController.addLoanActivity)

// CLOSE ACCOUNT
router.put('/close/:loanId', loanController.closeAccount)

module.exports = router;