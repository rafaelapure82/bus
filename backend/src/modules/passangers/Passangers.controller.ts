import { Request, Response } from 'express';
import { PassangersService } from './Passangers.service';

export class PassangersController {
  private passangersService = new PassangersService();

  findAll = async (req: Request, res: Response) => {
    try {
      const passangers = await this.passangersService.findAll();
      res.json(passangers);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  };

  create = async (req: Request, res: Response) => {
    try {
      const newPassanger = await this.passangersService.create(req.body);
      res.status(201).json(newPassanger);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  };
}
