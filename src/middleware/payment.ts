import type { Request, Response, NextFunction } from 'express'
import { body, param, validationResult } from 'express-validator'
import Payment from '../models/Payment'

//interrface global para ajustar la validacion y traer el dato
declare global {
  namespace Express {
    interface Request {
      payment?: Payment
    }
  }
}

export const validatePaymentInput = async (req: Request, res: Response, next: NextFunction) => {

  await body('name')
    .notEmpty().withMessage('El nombre del abono es obligatorio').run(req)
  await body('amount')
    .notEmpty().withMessage('El valor del abono es obligatorio')
    .isNumeric().withMessage('Por favor ingrese solo números')
    .toFloat()
    .custom(value => Number(value) > 0).withMessage('El abono debe ser mayor a 0').run(req)

  next()

}
export const validaPaymentId = async (req: Request, res: Response, next: NextFunction) => {
  await param('paymentId')
    //es entero
    .isInt()
    .withMessage('id no válido')
    //valor mayor a 0
    .custom(value => value > 0).withMessage('id no válido')
    .run(req)

  let errors = validationResult(req)
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() })
    return
  }

  next()
}

//Middleware validamos  si el pago existe
export const validatePaymentExists = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { paymentId, creditId } = req.params
    const payment = await Payment.findByPk(paymentId)

    if (!payment) {
      const error = new Error('Pago no encontrado')
      res.status(404).json({ error: error.message })
      return
    }

    // Validar que el pago pertenece al crédito correcto
    //comparamos numeros
    if (payment.creditId !== Number(creditId)) {
      return res.status(400).json({ error: 'El pago no pertenece al crédito indicado' });
    }
    req.payment = payment
    next()
  } catch (error) {
    //console.log(error)
    res.status(500).json({
      error: 'Hubo un error'
    })
  }

}