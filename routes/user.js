// libraries
import express from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
// model
import { UserModel } from '../models/User.js'

export const userRouter = express.Router()


// POST

userRouter.post('/register', async (req, res) => { 
    const { username, password, avatar } = req.body;

    const user = await UserModel.findOne({ username })

    if (user) {
        res.json({
            error: "User already exists"
        })
    } 
    else {
        const hashedPassword = await bcrypt.hash(password, 5)

        const newUser = new UserModel({ 
            username, 
            password: hashedPassword,
            avatar,
            about: ""
        })
        await newUser.save()

        res.json(newUser) 
    }
})

userRouter.post('/log-in', async (req, res) => {
    const { username, password } = req.body;

    const user = await UserModel.findOne({ username })

    if (!user) {
        res.json({
            error: "User with this username doesnt exists"
        })
    } 
    else {
        const isPasswordCorrect = await bcrypt.compare(password, user.password)

        if (!isPasswordCorrect){
            res.json({
                error: "Incorrect password"
            })
        } 
        else {
            const token = jwt.sign({ id: user._id }, 'secret')
            res.json({
                token,
                userId: user._id
            })
        }
    }
})


// PATCH

userRouter.patch('/change-avatar/:userId', async (req, res) => {
    const { userId } = req.params;
    const { avatar } = req.body;

    try {
        await UserModel.findByIdAndUpdate(userId, { avatar: avatar }, { new: true });
        res.json({
            message: "Avatar was updated successfully"
        })
    }
    catch {
        res.json({
            error: "Unable to change the avatar"
        })
    }
})

userRouter.patch('/change-password/:userId', async (req, res) => {
    const { userId } = req.params;
    const { password, newPassword } = req.body;

    try {
        const user = await UserModel.findById(userId)
        const isPasswordCorrect = await bcrypt.compare(password, user.password)

        if (isPasswordCorrect) {
            const hashedPassword = await bcrypt.hash(newPassword, 5)

            user.password = hashedPassword;
            await user.save()
            
            res.json({
                message: "Password was successfully changed"
            })
        } else {
            res.json({
                error: "The password is not correct"
            })
        }
    }
    catch {
        res.json({
            error: "Unable to change the password"
        })
    }
})

userRouter.patch('/edit-about/:userId', async (req, res) => {
    const { userId } = req.params;
    const { about } = req.body; 

    try {
        const user = await UserModel.findById(userId)

        user.about = about;
        await user.save()

        res.json(user)
    }
    catch {
        res.json({
            error: "Unable to change the about page"
        })
    }
})