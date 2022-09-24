export interface User {
  uid: string;
  email?: string | null;
  displayName?: string | null;
  emailVerified: boolean;
  created?: string | undefined;
}