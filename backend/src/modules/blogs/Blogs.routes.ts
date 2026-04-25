import { Router } from 'express';
import { BlogsController } from './Blogs.controller';

const router = Router();
const blogsController = new BlogsController();

router.get('/', blogsController.findAll);
router.get('/:id', blogsController.findById);
router.post('/', blogsController.create);
router.put('/:id', blogsController.update);
router.delete('/:id', blogsController.remove);

export default router;
