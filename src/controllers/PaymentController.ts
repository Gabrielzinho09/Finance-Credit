import type { Request, Response } from 'express'
import Payment from '../models/Payment'

export class PaymentController {
    
  
    static create = async (req: Request, res: Response) => {
     try {
      //nuevo gasto
      //req. body es el objeto que el usuario ingresa es decir el nuevo abono o pago
        const payment = new Payment(req.body)
        // Establecemos la relación del abono con el crédito correspondiente
        //la llave foranea en mi modelo es creditId la cual asociamos con el credito correspondiente
        // Lo asocia al crédito actual (por ejemplo, con id 3)
        payment.creditId = req.credit.id
        await payment.save()
        res.status(201).json({message:'Pago agregado con éxito' ,payment})
     } catch (error) {
        //console.log(error)
        res.status(500).json({error:'Hubo un error'})
     }
    }
  
    static getById = async (req: Request, res: Response) => {
      res.json(req.payment)
    }

    static updateById = async (req: Request, res: Response) => {
       await req.payment.update(req.body)
      res.json('Pago actualizado correctamente')
    }
  
    static deleteById = async (req: Request, res: Response) => {
      await req.payment.destroy()
      res.json('Pago eliminado')
    }
}