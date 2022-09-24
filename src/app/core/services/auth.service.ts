import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable, of, switchMap, tap } from 'rxjs';

import firebase from 'firebase/compat/app';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { User } from 'src/app/shared/models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user$: Observable<User | undefined>;

  constructor(
    private auth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router,
  ) {
    this.user$ = this.auth.authState.pipe(
      switchMap((user) => {
        if (user) {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          return of(undefined);
        }
      })
    );
  }

  async createUserWithEmailAndPassword(email: string, password: string, name: string | null = null) {
    const credentials = await this.auth.createUserWithEmailAndPassword(email, password);
    credentials.user?.sendEmailVerification();
    this.updateUserData(credentials.user, name);
    this.router.navigate(['/athlete/dashboard']);
  }

  async googleSignin() {
    const provider = new firebase.auth.GoogleAuthProvider();
    const credentials = await this.auth.signInWithPopup(provider);
    this.updateUserData(credentials.user);
    this.router.navigate(['/athlete/dashboard']);
  }

  async signInWithEmailAndPassword(email: string, password: string) {
    const credentials = await this.auth.signInWithEmailAndPassword(email, password);
    this.updateUserData(credentials.user);

    this.router.navigate(['/athlete/dashboard']);
  }

  async sendPasswordResetEmail(email: string) {
    await this.auth.sendPasswordResetEmail(email);
  }

  async signOut() {
    await this.auth.signOut();
    this.router.navigate(['/home']);
  }

  private updateUserData(user: firebase.User | null, name: string | null = null) {
    if (user) {
      const userRef: AngularFirestoreDocument<User> = this.afs.doc(
        `users/${user.uid}`
      );

      const data: User = {
        uid: user.uid,
        email: user.email ?? null,
        displayName: user.displayName ?? name,
        emailVerified: user.emailVerified,
        created: user.metadata.creationTime
      };

      userRef.set(data);
    }
  }
}
