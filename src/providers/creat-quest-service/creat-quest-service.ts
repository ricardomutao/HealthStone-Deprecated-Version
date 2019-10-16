import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the CreatQuestServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CreatQuestServiceProvider {

  constructor(public http: HttpClient) {
  }

  getAlimentos(){
    return this.http.get('assets/api/food.json');
  }
}
