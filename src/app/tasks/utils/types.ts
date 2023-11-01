import { Task } from '@shared/types/task';

type ListState = {
  tasks: Task[];
  loaded: boolean;
};

export type BoardState = {
  backlog: ListState;
  todo: ListState;
  doing: ListState;
  done: ListState;
};

export type BoardUpdate = {
  backlog: Task[];
  todo: Task[];
  doing: Task[];
  done: Task[];
};

export type TaskListType = 'backlog' | 'todo' | 'doing' | 'done';
