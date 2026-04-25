import { Router } from 'express';
import { CouponsController } from './Coupons.controller';

const router = Router();
const couponsController = new CouponsController();

router.get('/', couponsController.findAll);
router.get('/:id', couponsController.findById);
router.post('/', couponsController.create);
router.put('/:id', couponsController.update);
router.delete('/:id', couponsController.remove);

export default router;
