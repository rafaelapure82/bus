import { Request, Response } from 'express';
import { BlogsService } from './Blogs.service';

export class BlogsController {
  private blogsService = new BlogsService();

  findAll = async (req: Request, res: Response) => {
    try {
      const blogs = await this.blogsService.findAll();
      res.json(blogs);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  };

  findById = async (req: Request, res: Response) => {
    try {
      const blog = await this.blogsService.findById(Number(req.params.id));
      if (!blog) return res.status(404).json({ error: 'Blog not found' });
      res.json(blog);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  };

  create = async (req: Request, res: Response) => {
    try {
      const newBlog = await this.blogsService.create(req.body);
      res.status(201).json(newBlog);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  };

  update = async (req: Request, res: Response) => {
    try {
      const updatedBlog = await this.blogsService.update(Number(req.params.id), req.body);
      res.json(updatedBlog);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  };

  remove = async (req: Request, res: Response) => {
    try {
      await this.blogsService.remove(Number(req.params.id));
      res.status(204).send();
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  };
}
