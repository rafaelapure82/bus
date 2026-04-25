import { Request, Response } from 'express';
import { AgentsService } from './Agents.service';

export class AgentsController {
  private agentsService = new AgentsService();

  findAll = async (req: Request, res: Response) => {
    try {
      const agents = await this.agentsService.findAll();
      res.json(agents);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  };

  findById = async (req: Request, res: Response) => {
    try {
      const agent = await this.agentsService.findById(Number(req.params.id));
      if (!agent) return res.status(404).json({ error: 'Agent not found' });
      res.json(agent);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  };

  create = async (req: Request, res: Response) => {
    try {
      const data = { ...req.body };
      const files = req.files as { [fieldname: string]: Express.Multer.File[] };

      if (files) {
        if (files['profile_picture']) data.profile_picture = files['profile_picture'][0].path;
        if (files['nid_picture']) data.nid_picture = files['nid_picture'][0].path;
      }

      // Convert string IDs to numbers
      if (data.location_id) data.location_id = Number(data.location_id);
      if (data.country_id) data.country_id = Number(data.country_id);
      if (data.user_id) data.user_id = Number(data.user_id);
      if (data.discount) data.discount = parseFloat(data.discount);

      const newAgent = await this.agentsService.create(data);
      res.status(201).json(newAgent);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  };

  update = async (req: Request, res: Response) => {
    try {
      const data = { ...req.body };
      const files = req.files as { [fieldname: string]: Express.Multer.File[] };

      if (files) {
        if (files['profile_picture']) data.profile_picture = files['profile_picture'][0].path;
        if (files['nid_picture']) data.nid_picture = files['nid_picture'][0].path;
      }

      if (data.location_id) data.location_id = Number(data.location_id);
      if (data.country_id) data.country_id = Number(data.country_id);
      if (data.user_id) data.user_id = Number(data.user_id);
      if (data.discount) data.discount = parseFloat(data.discount);

      const updatedAgent = await this.agentsService.update(Number(req.params.id), data);
      res.json(updatedAgent);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  };

  remove = async (req: Request, res: Response) => {
    try {
      await this.agentsService.remove(Number(req.params.id));
      res.status(204).send();
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  };
}
