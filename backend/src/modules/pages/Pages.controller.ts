import { Request, Response } from 'express';
import { PagesService } from './Pages.service';

export class PagesController {
  private pagesService = new PagesService();

  findAll = async (req: Request, res: Response) => {
    try {
      const pages = await this.pagesService.findAll();
      res.json(pages);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  };

  findById = async (req: Request, res: Response) => {
    try {
      const page = await this.pagesService.findById(Number(req.params.id));
      if (!page) return res.status(404).json({ error: 'Page not found' });
      res.json(page);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  };

  create = async (req: Request, res: Response) => {
    try {
      const newPage = await this.pagesService.create(req.body);
      res.status(201).json(newPage);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  };

  update = async (req: Request, res: Response) => {
    try {
      const updatedPage = await this.pagesService.update(Number(req.params.id), req.body);
      res.json(updatedPage);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  };

  remove = async (req: Request, res: Response) => {
    try {
      await this.pagesService.remove(Number(req.params.id));
      res.status(204).send();
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  };
}
