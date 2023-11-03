import { Tag, Task } from '@shared/types/task';

export type TaskCreateDialogData = {
  tags: Tag[];
};

export type TaskCreateFormData = Omit<Task, 'tags'> & {
  tags: string[];
};
