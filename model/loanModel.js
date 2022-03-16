const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config()

const LoanSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true
    },
    contact : {
      type: String,
      required: true
    },
    dateOfIssue:{
        type: String,
        default : new Date().toLocaleDateString('en-IN')
    },
    loanId : {
      type: String,
      required: true
    },
    amount : {
      type: Number,
      required: true
    },
    rateOfInterest : {
      type: Number,
      default: 2
    },
    activities :[],
    property : {},
    propOf : {
      type : String,
      required: true
    },
    status: {
      type: String,
      default :"active"
    }

  });

LoanSchema.methods.setLoanId = function(storeId, count){
  this.loanId = `${storeId}-${count+1}`
}
  
  const Loan = mongoose.model("loans", LoanSchema);
  module.exports = Loan;
  