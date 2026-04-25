import { Request, Response } from 'express';
import { InquiriesService } from './Inquiries.service';

export class InquiriesController {
  private inquiriesService = new InquiriesService();

  findAll = async (req: Request, res: Response) => {
    try {
      const inquiries = await this.inquiriesService.findAll();
      res.json(inquiries);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  };

  findById = async (req: Request, res: Response) => {
    try {
      const inquiry = await this.inquiriesService.findById(Number(req.params.id));
      if (!inquiry) return res.status(404).json({ error: 'Inquiry not found' });
      res.json(inquiry);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  };

  create = async (req: Request, res: Response) => {
    try {
      const newInquiry = await this.inquiriesService.create(req.body);
      res.status(201).json(newInquiry);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  };

  update = async (req: Request, res: Response) => {
    try {
      const updatedInquiry = await this.inquiriesService.update(Number(req.params.id), req.body);
      res.json(updatedInquiry);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  };

  remove = async (req: Request, res: Response) => {
    try {
      await this.inquiriesService.remove(Number(req.params.id));
      res.status(204).send();
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  };
}
