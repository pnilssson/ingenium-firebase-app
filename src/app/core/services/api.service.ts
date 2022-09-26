import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Workout } from 'src/app/shared/models/workout';
import { WorkoutType } from 'src/app/shared/models/workoutType';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private afs: AngularFirestore) {}

  getTypes(): Observable<WorkoutType[]> {
    return this.afs
      .collection<WorkoutType>('types')
      .valueChanges({ idField: 'id' });
  }

  addWorkout(userId: string, workout: Workout): any {
    return this.afs
      .doc(`workouts/${userId}`)
      .collection('sessions')
      .add(workout);
  }

  updateWorkout(userId: string, workoutId: string, workout: Workout): any {
    return this.afs
      .doc(`workouts/${userId}/sessions/${workoutId}`)
      .update(workout);
  }

  getWorkoutsWithLimit(userId: string, limit: number): Observable<Workout[]> {
    return this.afs
      .doc(`workouts/${userId}`)
      .collection<Workout>('sessions', (ref) =>
        ref.orderBy('workoutDate', 'desc').limit(limit)
      )
      .valueChanges({ idField: 'uid' });
  }
}
