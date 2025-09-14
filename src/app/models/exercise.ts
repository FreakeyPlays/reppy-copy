export interface Exercise {
  id?: number;
  title: string;
  sets: number;
  reps: number;
  weight: number;
  workoutId: number;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
}
