import { Router } from 'express';
import { PaymethodsController } from './Paymethods.controller';

const router = Router();
const paymethodsController = new PaymethodsController();

router.get('/', paymethodsController.findAll);
router.get('/:id', paymethodsController.findById);
router.post('/', paymethodsController.create);
router.put('/:id', paymethodsController.update);
router.delete('/:id', paymethodsController.remove);

export default router;
