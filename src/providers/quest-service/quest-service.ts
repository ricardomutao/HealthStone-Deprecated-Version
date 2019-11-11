import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Quest } from '../../models/quest';
import firebase from 'firebase';

/*
  Generated class for the CreatQuestServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class QuestServiceProvider {

  constructor(public http: HttpClient) {
  }

  getAlimentos(){
    return this.http.get('assets/api/food.json');
  }

  public saveQuest(id, quest:Quest): Promise<any> {
    return new Promise(function(resolve,reject) {
      firebase.database().ref(`quests/${btoa(id)}`).set(quest)
        .then(res => resolve(res)).catch(err => reject(err))
    })
  }

  public getQuest(): Promise<any> {
    let authUser = firebase.auth().currentUser.email;
    let quests = {
      listManha: [],
      listTarde: [],
      listNoite: [],
      listQuestDone: [],
      listQuestUndone: [],
      listQuestDoneFinished: []
    }
    return new Promise(function(resolve,reject) {
      firebase.database().ref(`quests`).once('value', (snapshot: any) => {
        snapshot.forEach((childSnapshot: any) => {
          if(childSnapshot.val().usuario == btoa(authUser)){
            if(childSnapshot.val().status == 0 || childSnapshot.val().status == 1){
              if(childSnapshot.val().periodo.toLowerCase() == 'manha'){
                quests.listManha.push(childSnapshot.val());
              }else if(childSnapshot.val().periodo.toLowerCase() == 'tarde'){
                quests.listTarde.push(childSnapshot.val());
              }else if(childSnapshot.val().periodo.toLowerCase() == 'noite'){
                quests.listNoite.push(childSnapshot.val());
              }
            }

            if(childSnapshot.val().status == 1){
              quests.listQuestDone.push(childSnapshot.val());
            }else if(childSnapshot.val().status == 2){
              quests.listQuestDoneFinished.push(childSnapshot.val());
            }else if(childSnapshot.val().status == 3){
              quests.listQuestUndone.push(childSnapshot.val());
            }

          }
        })
        resolve(quests);
      }).catch(err => reject(err))
    })
  }

  public removeQuest(quest:Quest): Promise<any> {
    return new Promise(function(resolve,reject) {
      firebase.database().ref(`quests/${btoa(quest.id)}/`).remove()
        .then(res => resolve(res)).catch(err => reject(err))
    })
  }

  public updateQuest(quest:Quest, obj): Promise<any> {
    return new Promise(function(resolve,reject) {
      firebase.database().ref(`quests/${btoa(quest.id)}`).update(obj)
        .then(res => resolve(res)).catch(err => reject(err))
    })
  }

}
