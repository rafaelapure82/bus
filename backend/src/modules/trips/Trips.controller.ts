import { Request, Response } from 'express';
import { TripsService } from './Trips.service';

export class TripsController {
  private tripsService = new TripsService();

  findAll = async (req: Request, res: Response) => {
    try {
      const trips = await this.tripsService.findAll();
      res.json(trips);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  };

  findById = async (req: Request, res: Response) => {
    try {
      const trip = await this.tripsService.findById(Number(req.params.id));
      if (!trip) return res.status(404).json({ error: 'Trip not found' });
      res.json(trip);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  };

  create = async (req: Request, res: Response) => {
    try {
      const newTrip = await this.tripsService.create(req.body);
      res.status(201).json(newTrip);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  };

  update = async (req: Request, res: Response) => {
    try {
      const data = { ...req.body };
      if (data.fleet_id) data.fleet_id = Number(data.fleet_id);
      if (data.schedule_id) data.schedule_id = Number(data.schedule_id);
      if (data.pick_location_id) data.pick_location_id = Number(data.pick_location_id);
      if (data.drop_location_id) data.drop_location_id = Number(data.drop_location_id);
      if (data.vehicle_id) data.vehicle_id = Number(data.vehicle_id);
      if (data.driver_id) data.driver_id = Number(data.driver_id);

      const updatedTrip = await this.tripsService.update(Number(req.params.id), data);
      res.json(updatedTrip);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  };

  remove = async (req: Request, res: Response) => {
    try {
      await this.tripsService.remove(Number(req.params.id));
      res.status(204).send();
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  };
}
