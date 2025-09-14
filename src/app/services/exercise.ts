import { inject, Injectable } from '@angular/core';
import { Exercise } from '../models/exercise';
import { DbService } from './db';

@Injectable({
  providedIn: 'root',
})
export class ExerciseService {
  db = inject(DbService);

  async createExercise(
    exercise: Omit<Exercise, 'id'>
  ): Promise<Exercise | null> {
    try {
      const id = await this.db.exercises.add(exercise);
      const createdExercise = { ...exercise, id };
      return createdExercise;
    } catch (error) {
      console.error('Error creating exercise:', error);
      return null;
    }
  }

  async getExerciseById(id: number): Promise<Exercise | null> {
    try {
      const exercise = await this.db.exercises.get(id);
      return exercise || null;
    } catch (error) {
      console.error('Error getting exercise:', error);
      return null;
    }
  }

  async getAllExercisesByWorkoutId(
    workoutId: number
  ): Promise<Exercise[] | null> {
    try {
      const exercises = await this.db.exercises
        .where('workoutId')
        .equals(workoutId)
        .toArray();
      return exercises || null;
    } catch (error) {
      console.error('Error getting all exercises by Workout ID:', error);
      return null;
    }
  }

  async getAllExercises(): Promise<Exercise[] | null> {
    try {
      const exercises = await this.db.exercises.toArray();
      return exercises || null;
    } catch (error) {
      console.error('Error getting all exercises:', error);
      return null;
    }
  }

  async updateExercise(
    id: number,
    updates: Partial<Exercise>
  ): Promise<boolean> {
    try {
      await this.db.exercises.update(id, {
        ...updates,
        updatedAt: new Date(),
      });

      await this.db.exercises.get(id);
      return true;
    } catch (error) {
      console.error('Error updating exercise:', error);
      return false;
    }
  }

  async deleteExercise(id: number): Promise<boolean> {
    try {
      await this.db.exercises.get(id);
      await this.db.exercises.delete(id);

      return true;
    } catch (error) {
      console.error('Error deleting exercise:', error);
      return false;
    }
  }
}
