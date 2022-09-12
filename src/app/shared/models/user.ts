import { Timestamp } from "@angular/fire/firestore";

export interface User {
  uid: string;
  email?: string | null;
  displayName?: string | null;
  emailVerified: boolean;
}