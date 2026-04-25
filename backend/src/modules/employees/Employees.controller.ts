import { Request, Response } from 'express';
import { EmployeesService } from './Employees.service';

export class EmployeesController {
  private employeesService = new EmployeesService();

  findAll = async (req: Request, res: Response) => {
    try {
      const employees = await this.employeesService.findAll();
      res.json(employees);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  };

  findById = async (req: Request, res: Response) => {
    try {
      const employee = await this.employeesService.findById(Number(req.params.id));
      if (!employee) return res.status(404).json({ error: 'Employee not found' });
      res.json(employee);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  };

  create = async (req: Request, res: Response) => {
    try {
      const newEmployee = await this.employeesService.create(req.body);
      res.status(201).json(newEmployee);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  };

  update = async (req: Request, res: Response) => {
    try {
      const updatedEmployee = await this.employeesService.update(Number(req.params.id), req.body);
      res.json(updatedEmployee);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  };

  remove = async (req: Request, res: Response) => {
    try {
      await this.employeesService.remove(Number(req.params.id));
      res.status(204).send();
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  };
}
