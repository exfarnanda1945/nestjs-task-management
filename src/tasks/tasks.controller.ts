import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto, TaskDto } from './dto/task.dto';

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
}
