import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map, Observable } from 'rxjs';
import { Workout } from 'src/app/shared/models/workout';
import { WorkoutType } from 'src/app/shared/models/workoutType';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private afs: AngularFirestore) {}

  getTypes(): Observable<WorkoutType[]> {
    return this.afs.collection<WorkoutType>('types').valueChanges({idField: 'id'});
  }

  addWorkout(workout: Workout): any {
    return this.afs.collection(`workouts`).add(workout);
  }
}
