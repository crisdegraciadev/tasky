import { Task } from './task';

export type User = {
  name: string[];
  backlog: Task[];
  todo: Task[];
  doing: Task[];
  done: Task[];
};
