import users from "../data/users.js"
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { JWT_EXPIRE_TIME } from "../constant.js"

dotenv.config()

export const login = async (req, res) => {
    const { email, password } = req.body
    const userFound = users.find(user => user.email === email)
    if (!userFound) return res.status(404).json({ message: 'User does not exist' })
    const isPasswordCorrect = await bcrypt.compare(password, userFound.password)
    if (!isPasswordCorrect) return res.status(400).json({ message: "Credentials ain't matching" })
    const token = jwt.sign({ email: userFound.email, id: userFound.id }, process.env.SECRET_JWT, { expiresIn: JWT_EXPIRE_TIME })
    res.status(200).json({ result: userFound, token })
}