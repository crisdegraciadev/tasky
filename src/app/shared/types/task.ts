export type Task = {
  title: string;
  description: string;
  tags: Tag[];
  startDate: Date;
  endDate?: Date;
};

export type Tag = {
  value: string;
  color: '#D32F2F' | '#303F9F' | '#1976D2';
};
