import { Router } from 'express';
import { EmployeesController } from './Employees.controller';

const router = Router();
const employeesController = new EmployeesController();

router.get('/', employeesController.findAll);
router.get('/:id', employeesController.findById);
router.post('/', employeesController.create);
router.put('/:id', employeesController.update);
router.delete('/:id', employeesController.remove);

export default router;
