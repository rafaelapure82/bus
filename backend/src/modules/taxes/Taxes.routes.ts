import { Router } from 'express';
import { TaxesController } from './Taxes.controller';

const router = Router();
const taxesController = new TaxesController();

router.get('/', taxesController.findAll);
router.get('/:id', taxesController.findById);
router.post('/', taxesController.create);
router.put('/:id', taxesController.update);
router.delete('/:id', taxesController.remove);

export default router;
