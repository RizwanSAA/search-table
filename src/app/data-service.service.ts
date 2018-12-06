import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { throwError, Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

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

  constructor(private _http: Http) { }

  pushData() {
    return this.data.slice(0)
  }

  getDatafromURL() {
    return this._http.get('https://jsonplaceholder.typicode.com/users').pipe(map((res: Response) => {
      return res.json()
    },
      (err) => console.log(err)
    )).pipe(catchError((error: Response) => {
        return throwError('Something wrong.....')
    })) 

  }
  
}
