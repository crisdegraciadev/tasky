import { Tag, Task } from './task';

export type User = {
  profile: Profile;
  tags: Tag[];
  backlog: Task[];
  todo: Task[];
  doing: Task[];
  done: Task[];
};

export type Profile = {
  name: string;
  email: string;
};
