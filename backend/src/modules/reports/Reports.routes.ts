import { Router } from 'express';
import { ReportsController } from './Reports.controller';

const router = Router();
const reportsController = new ReportsController();

router.get('/sales', reportsController.getSales);
// Generics CRUD can also be mapped, but reports are mostly GET endpoints.
router.get('/', reportsController.getSales);

export default router;
