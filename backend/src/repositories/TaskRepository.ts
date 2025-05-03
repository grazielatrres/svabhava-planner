import { Task } from '../models/Task';

// In-memory storage for tasks
const tasks: Task[] = [];

export class TaskRepository {
  static async findAll(): Promise<Task[]> {
    return tasks;
  }

  static async findById(id: string): Promise<Task | undefined> {
    return tasks.find(task => task.id === id);
  }

  static async create(taskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>): Promise<Task> {
    const newTask: Task = {
      id: Math.random().toString(36).substr(2, 9),
      ...taskData,
      completed: false,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    tasks.push(newTask);
    return newTask;
  }

  static async update(id: string, taskData: Partial<Task>): Promise<Task | undefined> {
    const index = tasks.findIndex(task => task.id === id);
    if (index === -1) return undefined;

    tasks[index] = {
      ...tasks[index],
      ...taskData,
      updatedAt: new Date()
    };

    return tasks[index];
  }

  static async delete(id: string): Promise<boolean> {
    const index = tasks.findIndex(task => task.id === id);
    if (index === -1) return false;

    tasks.splice(index, 1);
    return true;
  }
} 