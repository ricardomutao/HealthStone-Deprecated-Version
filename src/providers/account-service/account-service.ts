import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import firebase from 'firebase';
import { User } from '../../models/user';

/*
  Generated class for the AccountServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AccountServiceProvider {

  constructor(public http: HttpClient) {
  }

  public logIn(email, senha): Promise<any> {
    return new Promise(resolve => {
      firebase.auth().signInWithEmailAndPassword((email.trim()), senha)
        .then(res => resolve(res))
    })
  }

  public register(email, senha): Promise<any> {
    return new Promise(resolve => {
      firebase.auth().createUserWithEmailAndPassword(email, senha)
        .then(res => resolve(res))
    })
  }

  public saveUser(email, user:User): Promise<any> {
    return new Promise(resolve => {
      firebase.database().ref(`usuarios/${btoa(email)}`).set(user)
        .then(res => resolve(res))
    })
  }

  public getUser(): Promise<any> {
    let authUser = firebase.auth().currentUser.email;
    return new Promise(resolve => {
      firebase.database().ref(`usuarios/${btoa(authUser)}`).once('value', (snapshot: any) => {
         resolve(snapshot.val());
      })
    })
  }

  public updateUser(user:User, obj): Promise<any> {
    return new Promise(resolve => {
      firebase.database().ref(`usuarios/${btoa(user.email)}`).update(obj)
        .then(res => resolve(res))
    })
  }

  public signOut(): Promise<any> {
    return new Promise(resolve => {
      firebase.auth().signOut()
        .then(res => resolve(res))
    })
  }

}
