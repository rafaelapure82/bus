import { Request, Response } from 'express';
import { LocationsService } from './Locations.service';

export class LocationsController {
  private locationsService = new LocationsService();

  findAll = async (req: Request, res: Response) => {
    try {
      const locations = await this.locationsService.findAll();
      res.json(locations);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  };

  findById = async (req: Request, res: Response) => {
    try {
      const location = await this.locationsService.findById(Number(req.params.id));
      if (!location) return res.status(404).json({ error: 'Location not found' });
      res.json(location);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  };

  create = async (req: Request, res: Response) => {
    try {
      const newLocation = await this.locationsService.create(req.body);
      res.status(201).json(newLocation);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  };

  update = async (req: Request, res: Response) => {
    try {
      const updatedLocation = await this.locationsService.update(Number(req.params.id), req.body);
      res.json(updatedLocation);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  };

  remove = async (req: Request, res: Response) => {
    try {
      await this.locationsService.remove(Number(req.params.id));
      res.status(204).send();
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  };
}
