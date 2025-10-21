import {Request, Response, NextFunction} from 'express'

export const cronAcess = (req: Request, res: Response, next: NextFunction) => {
   if(req.query.key !== process.env.CRON_SECRET_KEY){
      return res.status(403).json({message: "Acesso negado"})
   }
   next()
}



