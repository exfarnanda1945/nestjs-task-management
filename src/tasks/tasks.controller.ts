import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto, TaskDto } from './dto/task.dto';
import { DeleteResult } from 'typeorm';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';
import { TaskStatus } from './enum/task.status.enum';
import { GetTaskFilterDto } from './dto/get-task-fliter.dto';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get('/:id')
  getTaskById(@Param('id', ParseIntPipe) id: number): Promise<TaskDto> {
    return this.tasksService.getTaskById(id);
  }

  @Post()
  createTask(
    @Body(ValidationPipe) createTask: CreateTaskDto,
  ): Promise<TaskDto> {
    return this.tasksService.createTask(createTask);
  }

  @Delete('/:id')
  deleteTask(@Param('id', ParseIntPipe) id: number): Promise<DeleteResult> {
    return this.tasksService.deleteTask(id);
  }

  @Patch('/:id/status')
  updateTaskStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('status', TaskStatusValidationPipe) status: TaskStatus,
  ): Promise<TaskDto> {
    return this.tasksService.updateStatusTask(id, status);
  }

  @Get()
  getTasks(
    @Query(ValidationPipe) filter: GetTaskFilterDto,
  ): Promise<TaskDto[]> {
    return this.tasksService.getTask(filter);
  }
}
