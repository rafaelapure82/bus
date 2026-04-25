import { Request, Response } from 'express';
import { TaxesService } from './Taxes.service';

export class TaxesController {
  private taxesService = new TaxesService();

  findAll = async (req: Request, res: Response) => {
    try {
      const taxes = await this.taxesService.findAll();
      res.json(taxes);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  };

  findById = async (req: Request, res: Response) => {
    try {
      const tax = await this.taxesService.findById(Number(req.params.id));
      if (!tax) return res.status(404).json({ error: 'Tax not found' });
      res.json(tax);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  };

  create = async (req: Request, res: Response) => {
    try {
      const newTax = await this.taxesService.create(req.body);
      res.status(201).json(newTax);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  };

  update = async (req: Request, res: Response) => {
    try {
      const updatedTax = await this.taxesService.update(Number(req.params.id), req.body);
      res.json(updatedTax);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  };

  remove = async (req: Request, res: Response) => {
    try {
      await this.taxesService.remove(Number(req.params.id));
      res.status(204).send();
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  };
}
