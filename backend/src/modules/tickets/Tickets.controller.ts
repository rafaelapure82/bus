import { Request, Response } from 'express';
import { TicketsService } from './Tickets.service';

export class TicketsController {
  private ticketsService = new TicketsService();

  findAll = async (req: Request, res: Response) => {
    try {
      const tickets = await this.ticketsService.findAll();
      res.json(tickets);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  };

  findById = async (req: Request, res: Response) => {
    try {
      const ticket = await this.ticketsService.findById(Number(req.params.id));
      if (!ticket) return res.status(404).json({ error: 'Ticket not found' });
      res.json(ticket);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  };

  create = async (req: Request, res: Response) => {
    try {
      const newTicket = await this.ticketsService.create(req.body);
      res.status(201).json(newTicket);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  };

  update = async (req: Request, res: Response) => {
    try {
      const updatedTicket = await this.ticketsService.update(Number(req.params.id), req.body);
      res.json(updatedTicket);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  };

  remove = async (req: Request, res: Response) => {
    try {
      await this.ticketsService.remove(Number(req.params.id));
      res.status(204).send();
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  };
}
