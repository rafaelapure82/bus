import { Router } from 'express';
import { LocationsController } from './Locations.controller';

const router = Router();
const locationsController = new LocationsController();

router.get('/', locationsController.findAll);
router.get('/:id', locationsController.findById);
router.post('/', locationsController.create);
router.put('/:id', locationsController.update);
router.delete('/:id', locationsController.remove);

export default router;
