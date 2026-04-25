import { Request, Response } from 'express';
import { SchedulesService } from './Schedules.service';

export class SchedulesController {
  private schedulesService = new SchedulesService();

  findAll = async (req: Request, res: Response) => {
    try {
      const schedules = await this.schedulesService.findAll();
      res.json(schedules);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  };

  findById = async (req: Request, res: Response) => {
    try {
      const schedule = await this.schedulesService.findById(Number(req.params.id));
      if (!schedule) return res.status(404).json({ error: 'Schedule not found' });
      res.json(schedule);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  };

  create = async (req: Request, res: Response) => {
    try {
      const newSchedule = await this.schedulesService.create(req.body);
      res.status(201).json(newSchedule);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  };

  update = async (req: Request, res: Response) => {
    try {
      const updatedSchedule = await this.schedulesService.update(Number(req.params.id), req.body);
      res.json(updatedSchedule);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  };

  remove = async (req: Request, res: Response) => {
    try {
      await this.schedulesService.remove(Number(req.params.id));
      res.status(204).send();
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  };
}
