import { Component } from '@angular/core';
import { ExerciseList } from '../../components/exercise-list/exercise-list';
import { Greeting } from '../../components/greeting/greeting';
import { QuickActions } from '../../components/quick-actions/quick-actions';

@Component({
  selector: 'app-home',
  imports: [Greeting, QuickActions, ExerciseList],
  templateUrl: './home.html',
  styles: ``,
})
export class Home {}
