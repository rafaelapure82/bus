import { Router } from 'express';
import { PassangersController } from './Passangers.controller';

const router = Router();
const passangersController = new PassangersController();

router.get('/', passangersController.findAll);
router.post('/', passangersController.create);

export default router;
