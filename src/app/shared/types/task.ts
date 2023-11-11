export type Task = {
  title: string;
  description: string;
  tags: Tag[];
  startDate: Date;
  endDate?: Date;
};

export type Tag = {
  value: string;
  color:
    | '#D32F2F' // red-700
    | '#F44336' // red-700 (alternative)
    | '#303F9F' // indigo-700
    | '#3F51B5' // indigo-700 (alternative)
    | '#1976D2' // blue-700
    | '#2196F3' // blue-700 (alternative)
    | '#388E3C' // green-700
    | '#2E7D32' // green-700 (alternative)
    | '#795548' // brown-700
    | '#8D6E63' // brown-700 (alternative)
    | '#BF360C' // deep-orange-700
    | '#DD2C00' // deep-orange-700 (alternative)
    | '#607D8B' // blue-grey-700
    | '#455A64' // blue-grey-700 (alternative)
    | '#673AB7' // deep-purple-700
    | '#9C27B0' // purple-700
    | '#E91E63' // pink-700
    | '#C2185B' // pink-700 (alternative)
    | '#00ACC1' // cyan-700
    | '#0097A7' // cyan-700 (alternative)
    | '#009688' // teal-700
    | '#004D40' // teal-700 (alternative)
    | '#FFEB3B' // yellow-700
    | '#FFC400'; // yellow-700 (alternative)
};
