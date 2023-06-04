import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto, TaskDto } from './dto/task.dto';
import { Task } from './task.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskStatus } from './enum/task.status.enum';
import { ConfigService } from '@nestjs/config';

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
}
