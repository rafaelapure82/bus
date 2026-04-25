import { Router } from 'express';
import { RolesController } from './Roles.controller';

const router = Router();
const rolesController = new RolesController();

router.get('/', rolesController.findAll);
router.get('/:id', rolesController.findById);
router.post('/', rolesController.create);
router.put('/:id', rolesController.update);
router.delete('/:id', rolesController.remove);

export default router;
