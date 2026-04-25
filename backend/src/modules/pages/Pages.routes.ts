import { Router } from 'express';
import { PagesController } from './Pages.controller';

const router = Router();
const pagesController = new PagesController();

router.get('/', pagesController.findAll);
router.get('/:id', pagesController.findById);
router.post('/', pagesController.create);
router.put('/:id', pagesController.update);
router.delete('/:id', pagesController.remove);

export default router;
