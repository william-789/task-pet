import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import IUser from 'src/app/models/user.model';
import { delay, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private usersCollection: AngularFirestoreCollection<IUser>;
  public isAuthenticated$: Observable<boolean>;
  public isAuthenticatedWithDelay$: Observable<boolean>;

  constructor (
    private auth: AngularFireAuth,
    private db: AngularFirestore
  ) {
    this.usersCollection = db.collection('users')
    this.isAuthenticated$ = auth.user.pipe(
      map(user => !!user )//transforms user in a boolean value
    )
    this.isAuthenticatedWithDelay$ = this.isAuthenticated$.pipe(
      delay(1000)
    )
  }
  
  public async createUser (userData: IUser) {
    if(!userData.password){
      throw new Error("Password needs t be provided.")
    }

    const userCredentials = await this.auth.createUserWithEmailAndPassword(userData.email, userData.password);

    if(!userCredentials.user) {
      throw new Error("User can't be found.")
    }
    
    await this.usersCollection.doc(userCredentials.user.uid).set({
      name: userData.name,
      email: userData.email
    })

    await userCredentials.user.updateProfile({
      displayName: userData.name
    })
  }
}
