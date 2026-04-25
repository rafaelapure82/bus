import { Request, Response } from 'express';
import { VehiclesService } from './Vehicles.service';

export class VehiclesController {
  private vehiclesService = new VehiclesService();

  findAll = async (req: Request, res: Response) => {
    try {
      const vehicles = await this.vehiclesService.findAll();
      res.json(vehicles);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  };

  findById = async (req: Request, res: Response) => {
    try {
      const vehicle = await this.vehiclesService.findById(Number(req.params.id));
      if (!vehicle) return res.status(404).json({ error: 'Vehicle not found' });
      res.json(vehicle);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  };

  create = async (req: Request, res: Response) => {
    try {
      const newVehicle = await this.vehiclesService.create(req.body);
      res.status(201).json(newVehicle);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  };

  update = async (req: Request, res: Response) => {
    try {
      const updatedVehicle = await this.vehiclesService.update(Number(req.params.id), req.body);
      res.json(updatedVehicle);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  };

  remove = async (req: Request, res: Response) => {
    try {
      await this.vehiclesService.remove(Number(req.params.id));
      res.status(204).send();
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  };
}
