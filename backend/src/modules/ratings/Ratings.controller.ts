import { Request, Response } from 'express';
import { RatingsService } from './Ratings.service';

export class RatingsController {
  private ratingsService = new RatingsService();

  findAll = async (req: Request, res: Response) => {
    try {
      const ratings = await this.ratingsService.findAll();
      res.json(ratings);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  };

  findById = async (req: Request, res: Response) => {
    try {
      const rating = await this.ratingsService.findById(Number(req.params.id));
      if (!rating) return res.status(404).json({ error: 'Rating not found' });
      res.json(rating);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  };

  create = async (req: Request, res: Response) => {
    try {
      const newRating = await this.ratingsService.create(req.body);
      res.status(201).json(newRating);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  };

  update = async (req: Request, res: Response) => {
    try {
      const updatedRating = await this.ratingsService.update(Number(req.params.id), req.body);
      res.json(updatedRating);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  };

  remove = async (req: Request, res: Response) => {
    try {
      await this.ratingsService.remove(Number(req.params.id));
      res.status(204).send();
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  };
}
