//para usar las rutas
import { Router } from 'express'
import { CreditController } from '../controllers/CreditController'
import { handleInputErrors } from '../middleware/validation';
import { validateCreditExists, validateCreditId, validateCreditInput } from '../middleware/credit';
import { PaymentController } from '../controllers/PaymentController';
import { validaPaymentId, validatePaymentExists, validatePaymentInput } from '../middleware/payment';
const router = Router()

//valida todos los endpoints con ID desde el middleawre params hace que se globalice 
router.param('creditId', validateCreditId)
router.param('creditId', validateCreditExists)
//valida el paymentd Id
router.param('paymentId',validaPaymentId)
router.param('paymentId',validatePaymentExists)
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
///-----------------------------PAYMENTS ROUTES----------------------------------------//
//Routes for credit_payments
//patron roa = reutilizacion recursos 
// api/credit/10/payment(post) 
//arquitectura oirientada a recursos


router.post('/:creditId/payments',
    validatePaymentInput,
    handleInputErrors,
    PaymentController.create)

//no usamos validaciones ya que traemos unicamente data 
router.get('/:creditId/payments/:paymentId',PaymentController.getById)

router.put('/:creditId/payments/:paymentId',
    validatePaymentInput,
    handleInputErrors,
    PaymentController.updateById)
    
router.delete('/:creditId/payments/:paymentId',PaymentController.deleteById)

export default router   