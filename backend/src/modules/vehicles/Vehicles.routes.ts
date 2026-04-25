import { Router } from 'express';
import { VehiclesController } from './Vehicles.controller';

const router = Router();
const vehiclesController = new VehiclesController();

router.get('/', vehiclesController.findAll);
router.get('/:id', vehiclesController.findById);
router.post('/', vehiclesController.create);
router.put('/:id', vehiclesController.update);
router.delete('/:id', vehiclesController.remove);

export default router;
