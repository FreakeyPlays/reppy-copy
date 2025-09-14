import { Routes } from '@angular/router';
import { ChooseWorkout } from './view/choose-workout/choose-workout';
import { EditWorkout } from './view/edit-workout/edit-workout';
import { Edit } from './view/edit/edit';
import { Home } from './view/home/home';

export const routes: Routes = [
  {
    path: '',
    component: Home,
  },
  {
    path: 'choose',
    component: ChooseWorkout,
  },
  {
    path: 'edit',
    component: Edit,
  },
  {
    path: 'edit/:id',
    component: EditWorkout,
  },
  {
    path: '**',
    redirectTo: '',
  },
];
