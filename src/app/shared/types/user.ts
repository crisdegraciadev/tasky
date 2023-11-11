import { Tag, Task } from './task';

export type User = {
  name: string;
  tags: Tag[];
  backlog: Task[];
  todo: Task[];
  doing: Task[];
  done: Task[];
};
