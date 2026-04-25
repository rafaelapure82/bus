import { Router } from 'express';
import { TicketsController } from './Tickets.controller';

const router = Router();
const ticketsController = new TicketsController();

router.get('/', ticketsController.findAll);
router.get('/:id', ticketsController.findById);
router.post('/', ticketsController.create);
router.put('/:id', ticketsController.update);
router.delete('/:id', ticketsController.remove);

export default router;
