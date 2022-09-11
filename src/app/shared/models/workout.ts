import { Timestamp } from "@angular/fire/firestore";
import { Type } from "./type";

export interface Workout {
  id?: string;
  time: number;
  description?: string;
  date: Timestamp;
  type: Type;
}