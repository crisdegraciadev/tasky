import { Tag, Task } from '@shared/types/task';
import { Profile } from '@shared/types/user';

export type TaskCreateDialogData = {
  tags: Tag[];
};

export type TaskCreateFormData = Omit<Task, 'tags'> & {
  tags: string[];
};

export type TagState = {
  tags: Tag[];
};

export type ProfileState = {
  profile?: Profile;
  loaded: boolean;
};
