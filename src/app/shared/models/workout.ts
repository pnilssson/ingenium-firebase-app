import { NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";
import { WorkoutType } from "./workoutType";

export interface Workout {
  uid?: string;
  date: NgbDateStruct;
  type: WorkoutType;
  time: number;
  description?: string;
  completedDate: string;
  created: string;
}