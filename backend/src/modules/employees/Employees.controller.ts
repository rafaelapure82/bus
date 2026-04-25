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
      const data = { ...req.body };
      const files = req.files as { [fieldname: string]: Express.Multer.File[] };

      if (files) {
        if (files['profile_picture']) data.profile_picture = files['profile_picture'][0].path;
        if (files['nid_picture']) data.nid_picture = files['nid_picture'][0].path;
        if (files['license_picture']) data.license_picture = files['license_picture'][0].path;
        if (files['circulation_picture']) data.circulation_picture = files['circulation_picture'][0].path;
        if (files['vehicle_papers_picture']) data.vehicle_papers_picture = files['vehicle_papers_picture'][0].path;
      }

      // Convert string IDs to numbers if coming from form-data
      if (data.employeetype_id) data.employeetype_id = Number(data.employeetype_id);
      if (data.country_id) data.country_id = Number(data.country_id);

      const newEmployee = await this.employeesService.create(data);
      res.status(201).json(newEmployee);
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
        if (files['license_picture']) data.license_picture = files['license_picture'][0].path;
        if (files['circulation_picture']) data.circulation_picture = files['circulation_picture'][0].path;
        if (files['vehicle_papers_picture']) data.vehicle_papers_picture = files['vehicle_papers_picture'][0].path;
      }

      if (data.employeetype_id) data.employeetype_id = Number(data.employeetype_id);
      if (data.country_id) data.country_id = Number(data.country_id);

      const updatedEmployee = await this.employeesService.update(Number(req.params.id), data);
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
