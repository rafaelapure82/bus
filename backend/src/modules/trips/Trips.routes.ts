import { Router } from 'express';
import { TripsController } from './Trips.controller';

const router = Router();
const tripsController = new TripsController();

router.get('/', tripsController.findAll);
router.get('/:id', tripsController.findById);
router.post('/', tripsController.create);
router.put('/:id', tripsController.update);
router.delete('/:id', tripsController.remove);

export default router;
