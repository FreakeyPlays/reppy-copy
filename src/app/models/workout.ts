export interface Workout {
  id?: number;
  title: string;
  order: number;
  isDraft: boolean;
  createdAt: Date;
  updatedAt: Date;
}
