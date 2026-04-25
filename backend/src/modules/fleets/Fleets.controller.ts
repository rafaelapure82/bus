import { Request, Response } from 'express';
import { FleetsService } from './Fleets.service';

export class FleetsController {
  private fleetsService = new FleetsService();

  findAll = async (req: Request, res: Response) => {
    try {
      const fleets = await this.fleetsService.findAll();
      res.json(fleets);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  };

  findById = async (req: Request, res: Response) => {
    try {
      const fleet = await this.fleetsService.findById(Number(req.params.id));
      if (!fleet) return res.status(404).json({ error: 'Fleet not found' });
      res.json(fleet);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  };

  create = async (req: Request, res: Response) => {
    try {
      const newFleet = await this.fleetsService.create(req.body);
      res.status(201).json(newFleet);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  };

  update = async (req: Request, res: Response) => {
    try {
      const updatedFleet = await this.fleetsService.update(Number(req.params.id), req.body);
      res.json(updatedFleet);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  };

  remove = async (req: Request, res: Response) => {
    try {
      await this.fleetsService.remove(Number(req.params.id));
      res.status(204).send();
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  };
}
