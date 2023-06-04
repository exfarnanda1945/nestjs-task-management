import { IsNotEmpty } from 'class-validator';
import { TaskStatus } from '../enum/task.status.enum';

export class TaskDto {
  id: number;
  title: string;
  description: string;
  status: TaskStatus;
}

export class CreateTaskDto {
  @IsNotEmpty()
  title: string;
  @IsNotEmpty()
  description: string;
}
