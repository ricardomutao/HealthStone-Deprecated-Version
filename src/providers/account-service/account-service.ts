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

  public login(email, senha): Promise<any> {
    return new Promise(function(resolve,reject) {
      firebase.auth().signInWithEmailAndPassword(email, senha)
        .then(res => resolve(res)).catch(err => reject(err))
    })
  }

  public register(email, senha): Promise<any> {
    return new Promise(function(resolve,reject) {
      firebase.auth().createUserWithEmailAndPassword(email, senha)
        .then(res => resolve(res)).catch(err => reject(err))
    })
  }

  public saveUser(email, user:User): Promise<any> {
    return new Promise(function(resolve,reject) {
      firebase.database().ref(`usuarios/${btoa(email)}`).set(user)
        .then(res => resolve(res)).catch(err => reject(err))
    })
  }

  public getUser(): Promise<any> {
    let authUser = firebase.auth().currentUser.email;
    return new Promise(function(resolve,reject) {
      firebase.database().ref(`usuarios/${btoa(authUser)}`).once('value', (snapshot: any) => {
         resolve(snapshot.val());
      }).catch(err => reject(err))
    })
  }

  public updateUser(user:User, obj): Promise<any> {
    return new Promise(function(resolve,reject) {
      firebase.database().ref(`usuarios/${btoa(user.email)}`).update(obj)
        .then(res => resolve(res)).catch(err => reject(err))
    })
  }

  public signOut(): Promise<any> {
    return new Promise(function(resolve,reject) {
      firebase.auth().signOut()
        .then(res => resolve(res)).catch(err => reject(err))
    })
  }

}
