import { Router } from 'express';
import { FleetsController } from './Fleets.controller';

const router = Router();
const fleetsController = new FleetsController();

router.get('/', fleetsController.findAll);
router.get('/:id', fleetsController.findById);
router.post('/', fleetsController.create);
router.put('/:id', fleetsController.update);
router.delete('/:id', fleetsController.remove);

export default router;
