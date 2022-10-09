import { Timestamp } from "firebase/firestore";

export interface WorkoutType {
  id?: string;
  name: string;
  created: Timestamp;
}