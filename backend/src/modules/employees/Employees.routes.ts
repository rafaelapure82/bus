import { Router } from 'express';
import { EmployeesController } from './Employees.controller';
import { upload } from '../../middleware/upload';

const router = Router();
const employeesController = new EmployeesController();

router.get('/', employeesController.findAll);
router.get('/:id', employeesController.findById);
router.post('/', upload.fields([
  { name: 'profile_picture', maxCount: 1 },
  { name: 'nid_picture', maxCount: 1 },
  { name: 'license_picture', maxCount: 1 },
  { name: 'circulation_picture', maxCount: 1 },
  { name: 'vehicle_papers_picture', maxCount: 1 }
]), employeesController.create);

router.put('/:id', upload.fields([
  { name: 'profile_picture', maxCount: 1 },
  { name: 'nid_picture', maxCount: 1 },
  { name: 'license_picture', maxCount: 1 },
  { name: 'circulation_picture', maxCount: 1 },
  { name: 'vehicle_papers_picture', maxCount: 1 }
]), employeesController.update);

router.delete('/:id', employeesController.remove);

export default router;
