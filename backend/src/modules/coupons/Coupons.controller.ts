import { Request, Response } from 'express';
import { CouponsService } from './Coupons.service';

export class CouponsController {
  private couponsService = new CouponsService();

  findAll = async (req: Request, res: Response) => {
    try {
      const coupons = await this.couponsService.findAll();
      res.json(coupons);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  };

  findById = async (req: Request, res: Response) => {
    try {
      const coupon = await this.couponsService.findById(Number(req.params.id));
      if (!coupon) return res.status(404).json({ error: 'Coupon not found' });
      res.json(coupon);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  };

  create = async (req: Request, res: Response) => {
    try {
      const newCoupon = await this.couponsService.create(req.body);
      res.status(201).json(newCoupon);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  };

  update = async (req: Request, res: Response) => {
    try {
      const updatedCoupon = await this.couponsService.update(Number(req.params.id), req.body);
      res.json(updatedCoupon);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  };

  remove = async (req: Request, res: Response) => {
    try {
      await this.couponsService.remove(Number(req.params.id));
      res.status(204).send();
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  };
}
