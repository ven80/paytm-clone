import express from "express"
import z from "zod"
import jwt from "jsonwebtoken"

import {User} from "../db.js"
import {Account} from "../db.js"
import { JWT_SECRET } from "../config.js"
import { authMiddleware } from "../middleware.js"


const userRouter = express.Router()

const signupSchema = z.object({
    userName: z.string().toLowerCase().min(6),
    firstName: z.string().min(50),
    lastName: z.string().max(50),
    password: z.string().min(8)
})

const signinSchema = z.object({
    userName: z.string().toLowerCase().min(6),
    password: z.string().min(8)
})

const updateBodySchema = z.object({
    firstName: z.string().min(50).optional(),
    lastName: z.string().min(50).optional(),
    password: z.string().min(8).optional()
})


userRouter.post("/signup", async (req, res) => {
    const body = req.body
    const success = signupSchema.safeParse(body)

    if(!success){
        return res.json({
            message: "Not a valid inputs"
        })
    }

    const user = await User.findOne({userName:  body.userName})

    if(user){
        return res.json({
            message: "Username is not available,plaese try another"
        })
    }


    const dbUser = await User.create(body)
    const userId = dbUser._id

    await Account.create({
        userId,
        balance: 1 + Math.random() * 10000
    })
    
    const token = jwt.sign({
        userId
    }, JWT_SECRET)

    return res.json({
        message: "User Created Successfully",
        userId,
        token: token
    })


})


userRouter.post("/signin", async (req, res) => {
    const body = req.body
    const success = signinSchema.safeParse(body)

    

    if(!success){
        return res.json({
            message: "User or Password is Invalid"
        })
    }

    const user = await User.findOne({userName:  body.userName, password: body.password})
    
    
    if(!user){
        return res.status(401).json({
            message: "User or Password is Invalid"
        })
    }

    const token = jwt.sign({
        userId: user._id
    }, JWT_SECRET)

    return res.status(200).json({
        message: "User Signed in Successfully",
        userId: user._id,
        token: token
    })


})

userRouter.put("/update", authMiddleware, async (req, res) => {

    const updateBody = req.body
    const {success}  = updateBodySchema.safeParse(updateBody)
    
    if(!success){
        return res.json({message: "Invalid Inputs"})
    }

    try{
        const updatedDB = await User.findOneAndUpdate({_id : req.userID}, updateBody.password)
        return res.json({message: "Updated Successfully"})
    }catch(e){
        return res.json({message: `${e}`})
    }


})

userRouter.get("/bulk", async(req, res) => {
    
    const filter = req.query.filter || ""

    const users = await User.find({
        $or: [
            {firstName: { "$regex": filter, "$options": "i"}},
            {lastName: { "$regex": filter, "$options": "i"}}
        ]
    })

    return res.json({
        user: users.map(user => ({
            userName: user.userName,
            firstName: user.firstName,
            lastName: user.lastName,
            userID: user._id
        }))
    })
})

export {userRouter}