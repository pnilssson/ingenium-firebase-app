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
    private router: Router
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

  async googleSignin() {
    const provider = new firebase.auth.GoogleAuthProvider();
    const credentials = await this.auth.signInWithPopup(provider);
    return this.updateUserData(credentials.user);
  }

  async signOut() {
    await this.auth.signOut();
    this.router.navigate(['/']);
  }

  private updateUserData(user: firebase.User | null) {
    if (user) {
      const userRef: AngularFirestoreDocument<User> = this.afs.doc(
        `users/${user.uid}`
      );

      const data: User = {
        uid: user.uid,
        email: user.email ?? undefined,
        displayName: user.displayName ?? undefined,
      };

      return userRef.set(data, { merge: true });
    }

    return user;
  }
}
