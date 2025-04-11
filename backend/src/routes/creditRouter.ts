//para usar las rutas
import {Router}from 'express'
import { CreditController } from '../controllers/CreditController'
import {body} from 'express-validator'
import { handleInputErrors } from '../middleware/validation'
const router = Router()
//llamamos al controlador
 
router.get('/', CreditController.getAll)
router.get('/:id', CreditController.getCreditById)

router.post('/', 
        body('name')
            .notEmpty().withMessage('El nombre del credito es obligatorio'),
        body('amount')
            .notEmpty().withMessage('El valor del monto es obligatorio')
            .isNumeric().withMessage('Por favor ingrese solo numeros')
            .custom(value=> value > 0).withMessage('El credito debe ser mayor a 0'),    
    handleInputErrors,        
    CreditController.create)
router.put('/:id', CreditController.updateCreditById)
router.delete('/:id', CreditController.deleteCreditById)


export default router