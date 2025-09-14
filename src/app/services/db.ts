import { Injectable } from '@angular/core';
import Dexie, { Table } from 'dexie';
import { Exercise } from '../models/exercise';
import { Workout } from '../models/workout';

const dbName = 'reppy';
const dbVersion = 1;

@Injectable({
  providedIn: 'root',
})
export class DbService extends Dexie {
  workouts!: Table<Workout, number>;
  exercises!: Table<Exercise, number>;

  constructor() {
    super(dbName);
    this.version(dbVersion).stores({
      workouts: '++id, order',
      exercises: '++id, workoutId',
    });

    this.configurePersistentStorage();
  }

  private async configurePersistentStorage(): Promise<void> {
    if (navigator.storage && navigator.storage.persist) {
      const isPersisted = await navigator.storage.persisted();
      if (!isPersisted) {
        await navigator.storage.persist();
      }
    }
  }
}
