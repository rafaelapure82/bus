import { Router } from 'express';
import { SchedulesController } from './Schedules.controller';

const router = Router();
const schedulesController = new SchedulesController();

router.get('/', schedulesController.findAll);
router.get('/:id', schedulesController.findById);
router.post('/', schedulesController.create);
router.put('/:id', schedulesController.update);
router.delete('/:id', schedulesController.remove);

export default router;
