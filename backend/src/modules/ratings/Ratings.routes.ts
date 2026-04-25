import { Router } from 'express';
import { RatingsController } from './Ratings.controller';

const router = Router();
const ratingsController = new RatingsController();

router.get('/', ratingsController.findAll);
router.get('/:id', ratingsController.findById);
router.post('/', ratingsController.create);
router.put('/:id', ratingsController.update);
router.delete('/:id', ratingsController.remove);

export default router;
