import { Request, Response } from 'express';
import { ReportsService } from './Reports.service';

export class ReportsController {
  private reportsService = new ReportsService();

  getSales = async (req: Request, res: Response) => {
    try {
      // Mocked for migration setup
      res.json({ message: 'Sales report module placeholder' });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  };
}
