import { Request, Response } from 'express';
import { PaymethodsService } from './Paymethods.service';

export class PaymethodsController {
  private paymethodsService = new PaymethodsService();

  findAll = async (req: Request, res: Response) => {
    try {
      const paymethods = await this.paymethodsService.findAll();
      res.json(paymethods);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  };

  findById = async (req: Request, res: Response) => {
    try {
      const paymethod = await this.paymethodsService.findById(Number(req.params.id));
      if (!paymethod) return res.status(404).json({ error: 'Paymethod not found' });
      res.json(paymethod);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  };

  create = async (req: Request, res: Response) => {
    try {
      const newPaymethod = await this.paymethodsService.create(req.body);
      res.status(201).json(newPaymethod);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  };

  update = async (req: Request, res: Response) => {
    try {
      const updatedPaymethod = await this.paymethodsService.update(Number(req.params.id), req.body);
      res.json(updatedPaymethod);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  };

  remove = async (req: Request, res: Response) => {
    try {
      await this.paymethodsService.remove(Number(req.params.id));
      res.status(204).send();
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  };
}
