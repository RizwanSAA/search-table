import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  data = [
    {
      id: 1,
      name: 'Murli',
      company: 'TCS',
      designation: 'UI Architect'
    },
    {
      id: 2,
      name: 'Siva',
      company: 'TCS',
      designation: 'Content Manager'
    }
  ]

  constructor() { }

  pushData() {
    return this.data.slice(0)
  }
}
