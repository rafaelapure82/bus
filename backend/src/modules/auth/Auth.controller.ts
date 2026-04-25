import { Request, Response } from 'express';
import { AuthService } from './Auth.service';

export class AuthController {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  login = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      console.log('--- LOGIN ATTEMPT ---');
      console.log('User/Email:', email);
      const result = await this.authService.login(email, password);
      console.log('Login Successful:', email);
      res.json(result);
    } catch (error: any) {
      console.error('Login Failed:', error.message);
      res.status(401).json({ error: error.message });
    }
  };

  register = async (req: Request, res: Response) => {
    try {
      const { email, password, name } = req.body;
      const result = await this.authService.register(email, password, name);
      res.status(201).json(result);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  };

  getProfile = async (req: Request, res: Response) => {
    try {
      const userId = (req as any).user.userId;
      const result = await this.authService.getProfile(userId);
      res.json(result);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  };

  updateProfile = async (req: Request, res: Response) => {
    try {
      const userId = (req as any).user.userId;
      const result = await this.authService.updateProfile(userId, req.body);
      res.json(result);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  };

  uploadProfileImage = async (req: Request, res: Response) => {
    try {
      if (!req.file) throw new Error('No se recibió ninguna imagen');
      const userId = (req as any).user.userId;
      const imageUrl = `/uploads/profiles/${req.file.filename}`;
      const result = await this.authService.updateProfileImage(userId, imageUrl);
      res.json(result);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  };

  uploadProfileBanner = async (req: Request, res: Response) => {
    try {
      if (!req.file) throw new Error('No se recibió ninguna imagen');
      const userId = (req as any).user.userId;
      const imageUrl = `/uploads/profiles/${req.file.filename}`;
      const result = await this.authService.updateProfileBanner(userId, imageUrl);
      res.json(result);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  };
}
