import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import firebase from 'firebase';
import { RecompUser } from '../../models/recomp-user';

/*
  Generated class for the RewardServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RewardServiceProvider {

  constructor(public http: HttpClient) {
    
  }

  public getFiles(): Promise<any> {
    let auxList = [];
    let listFiles = [];
    return new Promise(function(resolve,reject) {
      firebase.database().ref(`recompensas`).once('value', (snapshot: any) => {
        snapshot.forEach( (childSnapshot: any) => {
          auxList.push(childSnapshot.val());
        });
        if(auxList != null && auxList.length <= 6){
          listFiles.push(auxList);
         }else{
          var contador = 6;
          let auxListFiles = [];
          for(let i = 0; i < auxList.length; i++){
            auxListFiles.push(auxList[i]);
            if(i >= (contador-1) || ((i+1) == auxList.length)){
              listFiles.push(auxListFiles);
              contador = contador + 6;
              auxListFiles = [];
            }
          }
         }
         resolve(listFiles);
      }).catch(err => reject(err))
    })
  }

  public saveReward(recompUser:RecompUser): Promise<any> {
    return new Promise(function(resolve,reject) {
      firebase.database().ref(`recomp-user/${btoa(recompUser.id)}`).set(recompUser)
        .then(res => resolve(res)).catch(err => reject(err))
    })
  }

  public removeReward(recompUser:RecompUser): Promise<any> {
    return new Promise(function(resolve,reject) {
      firebase.database().ref(`recomp-user/${btoa(recompUser.id)}/`).remove()
        .then(res => resolve(res)).catch(err => reject(err))
    })
  }

  public getRewards(): Promise<any> {
    return new Promise(function(resolve,reject) {
      let authUser = firebase.auth().currentUser.email;
      let listRewards = [];

      firebase.database().ref(`recomp-user`).once('value', (snapshot: any) => {
        snapshot.forEach((childSnapshot: any) => {
          if(childSnapshot.val().user == btoa(authUser)){
            listRewards.push(childSnapshot.val());
          }
        });
        resolve(listRewards);
      }).catch(err => reject(err))
    })
  }

}
