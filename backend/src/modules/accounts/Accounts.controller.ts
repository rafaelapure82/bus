import { Request, Response } from 'express';
import { AccountsService } from './Accounts.service';

export class AccountsController {
  private accountsService = new AccountsService();

  findAll = async (req: Request, res: Response) => {
    try {
      const accounts = await this.accountsService.findAll();
      res.json(accounts);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  };

  findById = async (req: Request, res: Response) => {
    try {
      const account = await this.accountsService.findById(Number(req.params.id));
      if (!account) return res.status(404).json({ error: 'Account not found' });
      res.json(account);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  };

  create = async (req: Request, res: Response) => {
    try {
      const newAccount = await this.accountsService.create(req.body);
      res.status(201).json(newAccount);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  };

  update = async (req: Request, res: Response) => {
    try {
      const updatedAccount = await this.accountsService.update(Number(req.params.id), req.body);
      res.json(updatedAccount);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  };

  remove = async (req: Request, res: Response) => {
    try {
      await this.accountsService.remove(Number(req.params.id));
      res.status(204).send();
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  };
}
