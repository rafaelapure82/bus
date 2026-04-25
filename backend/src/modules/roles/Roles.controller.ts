import { Request, Response } from 'express';
import { RolesService } from './Roles.service';

export class RolesController {
  private rolesService = new RolesService();

  findAll = async (req: Request, res: Response) => {
    try {
      const roles = await this.rolesService.findAll();
      res.json(roles);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  };

  findById = async (req: Request, res: Response) => {
    try {
      const role = await this.rolesService.findById(Number(req.params.id));
      if (!role) return res.status(404).json({ error: 'Role not found' });
      res.json(role);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  };

  create = async (req: Request, res: Response) => {
    try {
      const newRole = await this.rolesService.create(req.body);
      res.status(201).json(newRole);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  };

  update = async (req: Request, res: Response) => {
    try {
      const updatedRole = await this.rolesService.update(Number(req.params.id), req.body);
      res.json(updatedRole);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  };

  remove = async (req: Request, res: Response) => {
    try {
      await this.rolesService.remove(Number(req.params.id));
      res.status(204).send();
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  };
}
