import type { Request, Response, NextFunction } from 'express'
import { body, param, validationResult } from 'express-validator'
import Credit from '../models/Credit'

//interrface global para ajustar la validacion y traer el dato
declare global {
  namespace Express {
    interface Request {
      credit?: Credit
    }
  }
}
//valida si el id es valido, next continua hacia el siguiente middleware
export const validateCreditId = async (req: Request, res: Response, next: NextFunction) => {

  await param('creditId')
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
//Middleware validamos  si el credito existe
export const validateCreditExists = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { creditId } = req.params
    const credit = await Credit.findByPk(creditId)

    if (!credit) {
      const error = new Error('Crédito no encontrado')
      res.status(404).json({ error: error.message })
      return
    }
    req.credit = credit
    next()
  } catch (error) {
    //console.log(error)
    res.status(500).json({
      error: 'Hubo un error'
    })
  }

}

export const validateCreditInput = async (req: Request, res: Response, next: NextFunction) => {

  await body('name')
    .notEmpty().withMessage('El nombre del crédito es obligatorio').run(req)
  await body('amount')
    .notEmpty().withMessage('El valor del monto es obligatorio')
    .isNumeric().withMessage('Por favor ingrese solo numeros')
    .toFloat()
    .custom(value => Number(value) > 0).withMessage('El crédito debe ser mayor a 0').run(req)
  await body('comment')
    .notEmpty().withMessage('El detalle no debe estar vacio').run(req)
  await body('item')
    .notEmpty().withMessage('Ingrese un valor para items')
    .isNumeric().withMessage('Por favor ingrese solo numeros')
    .custom(value => Number(value) > 0).withMessage('El valor de items debe ser mayor a 0')
    .run(req)

  await body('phone')
    .notEmpty().withMessage('El teléfono no debe estar vacio').run(req)


  next()

}