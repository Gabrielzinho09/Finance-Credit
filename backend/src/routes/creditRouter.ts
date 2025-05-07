//para usar las rutas
import { Router } from 'express'
import { CreditController } from '../controllers/CreditController'
import { body, param } from 'express-validator'
import { handleInputErrors } from '../middleware/validation';
import { validateCreditExists, validateCreditId, validateCreditInput } from '../middleware/credit';
const router = Router()

//valida todos los endpoints con ID desde el middleawre params hace que se globalice 
router.param('creditId', validateCreditId)
router.param('creditId', validateCreditExists)

//llamamos al controlador

router.get('/', CreditController.getAll)
router.get('/search', CreditController.searchCredits)
router.get('/:creditId',
    CreditController.getCreditById)

router.post('/',
    //valida campos
    validateCreditInput,
    //muestra errores
    handleInputErrors,
    CreditController.create)

router.put('/:creditId',
    validateCreditInput,
    handleInputErrors,
    CreditController.updateCreditById)

router.delete('/:creditId',
    CreditController.deleteCreditById)


export default router