import { Router } from 'express';
import { AccountsController } from './Accounts.controller';

const router = Router();
const accountsController = new AccountsController();

router.get('/', accountsController.findAll);
router.get('/:id', accountsController.findById);
router.post('/', accountsController.create);
router.put('/:id', accountsController.update);
router.delete('/:id', accountsController.remove);

export default router;
