import { Router } from 'express';
import { InquiriesController } from './Inquiries.controller';

const router = Router();
const inquiriesController = new InquiriesController();

router.get('/', inquiriesController.findAll);
router.get('/:id', inquiriesController.findById);
router.post('/', inquiriesController.create);
router.put('/:id', inquiriesController.update);
router.delete('/:id', inquiriesController.remove);

export default router;
