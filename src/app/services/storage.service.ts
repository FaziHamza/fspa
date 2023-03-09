import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  setData(key: string, value: string) {
    window.localStorage.setItem(key, value);
  }
  getData(key: string) {
   return window.localStorage.getItem(key);
  }
  
}
