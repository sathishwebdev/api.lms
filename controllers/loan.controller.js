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
            property : {
                name : data.propertyName,
                weight: data.propertyWeight,
                quantity : data.propertyQuantity
            },
            time : data.time,
            propOf : req.params.userId,
            storeId : user.storeId
        });

        loan.setLoanId(user.storeId, user.loans.length )

       let newLoan = await loan.save()

    //    let loansOfUser = await Loan.find({propOf : req.params.userId})

       let updateUserLoans = await User.findByIdAndUpdate(req.params.userId, {loans: [...user.loans, newLoan]})

        !updateUserLoans 
            ? res.status(400).send({result: false, error:true, message : "Error Occurs", data: null })
            : res.send({result: true, error:false, message : "Successfully created.", data: newLoan})

    }catch(error){
        res.status(400).send({result: false, error:true, message : error.message, detail: error, data: null})
    }
}

// GET LOAN BY LOAN ID

exports.getLoanByLoanId = async (req, res) =>{
    try{
        let loan = await Loan.findOne({loanId : req.params.loanId})
        !loan 
            ? res.status(400).send({result: false, error:true, message : "Error Occurs", data: null })
            : res.send({result: true, error:false, message : "Successfully created.", data: loan})
    }catch(error){
        res.status(400).send({result: false, error:true, message : error.message, detail: error, data: null})
    }
}

// Get Loans By user id

exports.getLoansByUserId = async (req, res) =>{
    try{
        let loans = await Loan.find({propOf : req.params.userId})
        !loans 
            ? res.status(400).send({result: false, error:true, message : "Error Occurs", data: null })
            : res.send({result: true, error:false, message : "Successfully created.", data: loans})
    }catch(error){
        res.status(400).send({result: false, error:true, message : error.message, detail: error, data: null})
    }
}

// INSIGHTS OF STORE

exports.storeInsight = async (req, res)=>{
    try{
        let loans = await Loan.find({propOf : req.params.userId})
        if(!loans){
            res.status(400).send({result: false, error:true, message : "Error Occurs", data: null })
        }else{
            
        }
    }catch(error){
        res.status(400).send({result: false, error:true, message : error.message, detail: error, data: null})
    }
}

