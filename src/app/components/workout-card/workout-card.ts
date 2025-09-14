import { Component, inject, input, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SvgIconComponent } from '@ngneat/svg-icon';
import { Exercise } from '../../models/exercise';
import { Workout } from '../../models/workout';
import { WorkoutService } from '../../services/workout';

@Component({
  selector: 'li[appWorkoutCard]',
  imports: [SvgIconComponent, RouterLink],
  templateUrl: './workout-card.html',
  styles: ``,
  host: {
    '[attr.data-workout-id]': 'workout().id',
  },
})
export class WorkoutCard {
  workoutService = inject(WorkoutService);

  readonly workout = input.required<Workout>();
  exercises: Exercise[] = [];
  readonly isExpanded = signal<boolean>(false);

  async deleteWorkout(id: number) {
    try {
      return await this.workoutService.deleteWorkout(id);
    } catch (error: unknown) {
      console.error(error);
      return false;
    }
  }

  async toggleDraftMode(e: Event) {
    e.stopPropagation();

    this.workoutService.updateWorkout(this.workout().id!, {
      isDraft: !this.workout().isDraft,
    });
  }
}
