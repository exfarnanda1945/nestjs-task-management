import { BadRequestException, PipeTransform } from '@nestjs/common';
import { TaskStatus } from '../enum/task.status.enum';

export class TaskStatusValidationPipe implements PipeTransform {
  readonly status = [TaskStatus.OPEN, TaskStatus.IN_PROGRESS, TaskStatus.OPEN];

  transform(value: any) {
    value = value.toUpperCase();

    if (!this.isStatusIsValid(value)) {
      throw new BadRequestException(`"${value} is an invalid status "`);
    }

    return value;
  }

  private isStatusIsValid(status: any): boolean {
    return this.status.indexOf(status) !== -1;
  }
}
