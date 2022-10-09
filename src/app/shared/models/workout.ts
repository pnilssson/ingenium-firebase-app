import { NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";
import { Timestamp } from "firebase/firestore";
import { WorkoutType } from "./workoutType";

export interface Workout {
  uid?: string;
  date: NgbDateStructWithWeek;
  type: WorkoutType;
  subType: WorkoutType | null;
  time: number;
  description?: string;
  completed: boolean;
  workoutDate: Timestamp;
  created: Timestamp;
}

export interface NgbDateStructWithWeek extends NgbDateStruct {
  week: number;
}