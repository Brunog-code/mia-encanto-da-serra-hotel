import jwt from 'jsonwebtoken'
import {JwtUserPayload} from '../../types/custom.js'

export const generateToken = (user: JwtUserPayload) => {
    const SECRET_KEY = process.env.SECRET_KEY!
    return jwt.sign(
        {
        id: user.id,
        name: user.name,
        email: user.email,
        },
        SECRET_KEY,
        {expiresIn: "1h"}
    )
}