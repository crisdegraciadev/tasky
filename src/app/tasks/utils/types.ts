import { Task } from '@shared/types/task';

export type BoardState = {
  board: {
    backlog: Task[];
    todo: Task[];
    doing: Task[];
    done: Task[];
  };
  loaded: boolean;
};

export type Board = {
  backlog: Task[];
  todo: Task[];
  doing: Task[];
  done: Task[];
};

export type TaskListType = 'backlog' | 'todo' | 'doing' | 'done';
