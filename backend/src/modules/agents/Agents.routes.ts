import { Router } from 'express';
import { AgentsController } from './Agents.controller';
import { upload } from '../../middleware/upload';

const router = Router();
const agentsController = new AgentsController();

router.get('/', agentsController.findAll);
router.get('/:id', agentsController.findById);
router.post('/', upload.fields([
  { name: 'profile_picture', maxCount: 1 },
  { name: 'nid_picture', maxCount: 1 }
]), agentsController.create);

router.put('/:id', upload.fields([
  { name: 'profile_picture', maxCount: 1 },
  { name: 'nid_picture', maxCount: 1 }
]), agentsController.update);

router.delete('/:id', agentsController.remove);

export default router;
