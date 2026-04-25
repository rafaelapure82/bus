import { Router } from 'express';
import { AgentsController } from './Agents.controller';

const router = Router();
const agentsController = new AgentsController();

router.get('/', agentsController.findAll);
router.get('/:id', agentsController.findById);
router.post('/', agentsController.create);
router.put('/:id', agentsController.update);
router.delete('/:id', agentsController.remove);

export default router;
