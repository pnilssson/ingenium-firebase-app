import { Timestamp } from "@angular/fire/firestore";

export interface User {
  uid: string;
  email?: string;
  displayName?: string;
  created?: Timestamp;
}