import { inject, Injectable, signal } from '@angular/core';
import { Workout } from '../models/workout';
import { DbService } from './db';

@Injectable({
  providedIn: 'root',
})
export class WorkoutService {
  db = inject(DbService);

  private readonly workoutsSignal = signal<Workout[]>([]);
  workouts = this.workoutsSignal.asReadonly();

  constructor() {
    this.refreshWorkouts();
  }

  async refreshWorkouts(): Promise<void> {
    try {
      const workoutsResult = await this.db.workouts.orderBy('order').toArray();
      this.workoutsSignal.set(workoutsResult);
    } catch (error) {
      console.error('Error loading workouts:', error);
    }
  }

  async createWorkout(title: string): Promise<Workout | null> {
    try {
      const maxOrder = await this.db.workouts.orderBy('order').last();
      const newOrder = maxOrder ? maxOrder.order + 1 : 0;

      const workout: Omit<Workout, 'id'> = {
        title,
        order: newOrder,
        isDraft: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const id = await this.db.workouts.add(workout);
      const createdWorkout = { ...workout, id };

      await this.refreshWorkouts();
      return createdWorkout;
    } catch (error) {
      console.error('Error creating workout:', error);
      return null;
    }
  }

  async getWorkoutById(id: number): Promise<Workout | null> {
    try {
      const workout = await this.db.workouts.get(id);
      return workout || null;
    } catch (error) {
      console.error('Error getting workout:', error);
      return null;
    }
  }

  async updateWorkout(id: number, updates: Partial<Workout>): Promise<boolean> {
    try {
      await this.db.workouts.update(id, {
        ...updates,
        updatedAt: new Date(),
      });
      await this.refreshWorkouts();
      return true;
    } catch (error) {
      console.error('Error updating workout:', error);
      return false;
    }
  }

  async deleteWorkout(id: number): Promise<boolean> {
    try {
      const workoutToDelete = await this.db.workouts.get(id);
      if (!workoutToDelete) {
        console.warn(`Workout with id ${id} not found`);
        return false;
      }

      await this.db.exercises.where('workoutId').equals(id).delete();
      await this.db.workouts.delete(id);

      await this.db.workouts
        .where('order')
        .above(workoutToDelete?.order)
        .modify((workout) => {
          workout.order = --workout.order;
        });

      await this.refreshWorkouts();
      return true;
    } catch (error) {
      console.error('Error deleting workout:', error);
      return false;
    }
  }

  async reorderWorkouts(from: number, to: number, id: number) {
    try {
      if (from > to) {
        await this.db.workouts
          .where('order')
          .between(to, from, true, false)
          .modify((workout) => {
            ++workout.order;
          });
      } else {
        await this.db.workouts
          .where('order')
          .between(from, to, false, true)
          .modify((workout) => {
            --workout.order;
          });
      }

      await this.updateWorkout(id, {
        order: to,
      });

      return true;
    } catch (error) {
      console.error('Error reordering workout:', error);
      return false;
    }
  }
}
