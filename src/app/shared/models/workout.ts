import { NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";
import { WorkoutType } from "./workoutType";

export interface Workout {
  id?: string;
  time: number;
  description?: string;
  date: NgbDateStruct;
  type: WorkoutType;
  uid: string;
}