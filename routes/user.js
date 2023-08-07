// libraries
import express from 'express'
import bcrypt from 'bcrypt'
// model
import { UserModel } from '../models/User.js'

export const userRouter = express.Router()


userRouter.post('/register', async (req, res) => { 
    const { username, password } = req.body;

    const user = await UserModel.findOne({ username })

    if (user) {
        res.json({
            error: "User already exists"
        })
    } else {
        const hashedPassword = await bcrypt.hash(password, 5)

        const newUser = new UserModel({ username, password: hashedPassword })

        await newUser.save()

        res.json(newUser) 
    }
})
