import express from "express"
import z from "zod"
import jwt from "jsonwebtoken"

import {Account, User} from "../db.js"
import { JWT_SECRET } from "../config.js"
import { authMiddleware } from "../middleware.js"


const accountRouter = express.Router()

const transferMoneySchema = z.object({
    to: z.string(),
    amount: z.string(),
})

const balanceSchema = z.object({
    id: z.string(),
    amount: z.string(),
})

accountRouter.get("/balance", authMiddleware, async (req, res) => {
    
    const account  = await Account.findOne({
        userId: req.query.userId
    })
    
    if (account?.balance == null){
        return res.status(200).json({     
            balance: 0
        })
    }

    return res.status(200).json({     
        balance: parseInt(account.balance)
    })

   
})

accountRouter.post("/transfer", authMiddleware, async (req, res) => {

    const success = transferMoneySchema.safeParse(req.body)

    if(!success){
        return res.json({
            message: "Invalid creds"
        })
    }


    const recipientUser = await User.findOne({userId: success.data.id})
    const recipientAccount  = await Account.findOne({userId:recipientUser._id})
    const senderAccount = await Account.findOne({userId: req.userId})

    //Check if userId exists
    if(!recipientUser._id){
        return res.json({
            message: "User Id does not Invalid"
        })
    }
    
    //Check for Insufficient Balance
    if(senderAccount?.balance == null){
        return res.json({
            message: "Insufficient Balance"
        })
    }
    
    
    await Account.updateOne({userId: recipientUser._id}, {$inc: {balance : success.data.amount}})
    await Account.updateOne({userId: req.userId}, {$inc: {balance : - success.data.amount}})

    

    return res.json({
        message : "Transaction was successful"
    })



})

export {accountRouter}