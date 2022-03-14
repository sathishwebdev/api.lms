const User = require("../model/userModel")
const Loan = require('../model/loanModel')

//  GET LOAN DETAILS BY USER ID

exports.getLoansByUserId = async (req, res)=>{
   try{ let response = await Loan.find({propOf : req.params.userId})
        !response 
        ? res.status(400).send({result: false, error:true, message : "Error Occurs", data: null })
        : res.send({result: true, error:false, message : "Successfully fetched", data: response })
    }catch(err){
        res.status(400).send({result: false, error:true, message : error.message, detail: error, data: null})
    }
}

// CREATE NEW LOAN

exports.createNewLoan = async (req, res) =>{
    try {
        let data = req.body
        let user = await User.findById(req.params.userId)

        // create user
        let loan = new Loan({
            name: data.name,
            address: data.address,
            contact: data.contact,
            amount: data.amount,
            property : data.property,
            propOf : req.params.userId
        });

        loan.setLoanId(data.storeId, user.loans.length )

       let newLoan = await loan.save()

    //    let loansOfUser = await Loan.find({propOf : req.params.userId})

       let updateUserLoans = await User.findByIdAndUpdate(req.params.userId, {loans: [...user.loans, newLoan]})

        !updateUserLoans 
            ? res.status(400).send({result: false, error:true, message : "Error Occurs", data: null })
            : res.send({result: true, error:false, message : "Successfully created.", data: updateUserLoans})



    }catch(err){
        res.status(400).send({result: false, error:true, message : error.message, detail: error, data: null})
    }
}