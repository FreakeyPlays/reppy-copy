import { CdkDrag, CdkDragDrop, CdkDropList } from '@angular/cdk/drag-drop';
import { Component, inject, Signal, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SvgIconComponent } from '@ngneat/svg-icon';
import { WorkoutCard } from '../../components/workout-card/workout-card';
import { Workout } from '../../models/workout';
import { DbService } from '../../services/db';
import { WorkoutService } from '../../services/workout';

@Component({
  selector: 'app-edit',
  imports: [FormsModule, SvgIconComponent, WorkoutCard, CdkDrag, CdkDropList],
  templateUrl: './edit.html',
  styles: ``,
})
export class Edit {
  dbService = inject(DbService);
  workoutService = inject(WorkoutService);

  readonly newWorkoutTitle = signal<string>('');
  readonly workouts: Signal<Workout[]> = this.workoutService.workouts;

  async createNewWorkout() {
    if (!this.newWorkoutTitle().trim()) return;

    try {
      const workout = await this.workoutService.createWorkout(
        this.newWorkoutTitle().trim()
      );
      if (workout) {
        this.newWorkoutTitle.set('');
      }
    } catch (error: unknown) {
      console.error(error);
    }
  }

  async reorderWorkout(data: CdkDragDrop<Workout[]>) {
    if (data.previousIndex === data.currentIndex) return;

    await this.workoutService.reorderWorkouts(
      data.previousIndex,
      data.currentIndex,
      data.item.data.id
    );
  }
}
