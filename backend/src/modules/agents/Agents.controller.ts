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
      const newAgent = await this.agentsService.create(req.body);
      res.status(201).json(newAgent);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  };

  update = async (req: Request, res: Response) => {
    try {
      const updatedAgent = await this.agentsService.update(Number(req.params.id), req.body);
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
