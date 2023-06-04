import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto, TaskDto } from './dto/task.dto';
import { Task } from './task.entity';
import { DeleteResult, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskStatus } from './enum/task.status.enum';
import { ConfigService } from '@nestjs/config';
import { GetTaskFilterDto } from './dto/get-task-fliter.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task) private taskRepository: Repository<Task>,
  ) {}

  async getTaskById(id: number): Promise<TaskDto> {
    const find = await this.taskRepository.findOne({ where: { id } });

    if (!find) {
      throw new NotFoundException(`Task with "${id}" not found`);
    }

    const task: TaskDto = {
      id: find.id,
      description: find.description,
      status: find.status,
      title: find.title,
    };

    return task;
  }

  async createTask(createTask: CreateTaskDto): Promise<TaskDto> {
    const { title, description } = createTask;
    const task = new Task();
    task.title = title;
    task.description = description;
    task.status = TaskStatus.OPEN;

    await task.save();

    return task;
  }

  async deleteTask(id: number): Promise<DeleteResult> {
    const task = await this.taskRepository.delete(id);

    if (task.affected === 0) {
      throw new NotFoundException(`Task with "${id}" not found`);
    }

    return task;
  }

  async updateStatusTask(id: number, status: TaskStatus): Promise<TaskDto> {
    const task = await this.getTaskById(id);
    task.status = status;
    await this.taskRepository.save(task);

    return task;
  }

  async getTask(filter: GetTaskFilterDto): Promise<TaskDto[]> {
    const query = this.taskRepository.createQueryBuilder('task');

    if (filter.status) {
      query.andWhere('task.status = :status', { status: filter.status });
    }

    if (filter.search) {
      query.andWhere(
        '(task.title LIKE :search OR task.description LIKE :search)',
        { search: `%${filter.search}%` },
      );
    }

    const tasks = await query.getMany();

    return tasks.map((task) => ({
      id: task.id,
      description: task.description,
      status: task.status,
      title: task.title,
    }));
  }
}
