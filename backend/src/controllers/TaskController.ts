import { Request, Response } from 'express';
import { TaskRepository } from '../repositories/TaskRepository';

export class TaskController {
  static async getAllTasks(req: Request, res: Response) {
    try {
      const tasks = await TaskRepository.findAll();
      res.json(tasks);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  static async getTaskById(req: Request, res: Response) {
    try {
      const task = await TaskRepository.findById(req.params.id);
      if (!task) {
        return res.status(404).json({ error: 'Task not found' });
      }
      res.json(task);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  static async createTask(req: Request, res: Response) {
    try {
      const { title, description } = req.body;
      if (!title) {
        return res.status(400).json({ error: 'Title is required' });
      }

      const task = await TaskRepository.create({
        title,
        description: description || '',
        completed: false
      });

      res.status(201).json(task);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  static async updateTask(req: Request, res: Response) {
    try {
      const { title, description, completed } = req.body;
      const task = await TaskRepository.update(req.params.id, {
        title,
        description,
        completed
      });

      if (!task) {
        return res.status(404).json({ error: 'Task not found' });
      }

      res.json(task);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  static async deleteTask(req: Request, res: Response) {
    try {
      const success = await TaskRepository.delete(req.params.id);
      if (!success) {
        return res.status(404).json({ error: 'Task not found' });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
} 