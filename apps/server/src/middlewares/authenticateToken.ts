import {Request, Response, NextFunction} from 'express'
import jwt from "jsonwebtoken";
import {JwtUserPayload} from '../types/custom.js'

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers['authorization']?.split(' ')[1]

    if(!token){
        return res.status(401).json({message: 'Token não fornecido'})
    }

    //se for enviado pela header do front
    jwt.verify(token, process.env.SECRET_KEY!, (err, user) => {
        if(err){
            return res.status(403).json({message: 'Token inválido'})
        }
        req.user = user as JwtUserPayload;
        next()
    })
}



